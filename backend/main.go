package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"time"

	"unihack-2025/backend/db"
	"unihack-2025/backend/fetcher"
	"unihack-2025/backend/googlescrape"
	"unihack-2025/backend/s3"
	
	"github.com/gin-gonic/gin"
)

// Request payload structure for first generation
type GenerationRequest struct {
	ModelImage   string `json:"model_image"`
	GarmentImage string `json:"garment_image"`
	Category     string `json:"category"`
}

// Request payload structure for the full outfit (including pants)
type FullOutfitRequest struct {
	ModelImage   string `json:"model_image"`
	GarmentImage string `json:"garment_image"`
	PantsImage   string `json:"pants_image"`
	Category     string `json:"category"`
}

// Response structure for the initial request
type RunResponse struct {
	ID     string `json:"id"`
	Status string `json:"status"`
}

// Response structure for status checks
type StatusResponse struct {
	Status string      `json:"status"`
	Output interface{} `json:"output"`
	Error  string      `json:"error,omitempty"`
}

// FashionClient handles API requests to the fashion service
type FashionClient struct {
	ApiKey  string
	BaseURL string
	Client  *http.Client
}

// NewFashionClient creates a new client for the fashion API
func NewFashionClient() (*FashionClient, error) {
	apiKey := os.Getenv("FASHN_API_KEY")
	if apiKey == "" {
		return nil, fmt.Errorf("FASHN_API_KEY environment variable not set")
	}

	return &FashionClient{
		ApiKey:  apiKey,
		BaseURL: "https://api.fashn.ai/v1",
		Client:  &http.Client{Timeout: 10 * time.Second},
	}, nil
}

// StartGeneration initiates a new generation job
func (fc *FashionClient) StartGeneration(modelImage, garmentImage, category string) (string, error) {
	requestData := GenerationRequest{
		ModelImage:   modelImage,
		GarmentImage: garmentImage,
		Category:     category,
	}

	requestBody, err := json.Marshal(requestData)
	if err != nil {
		return "", fmt.Errorf("error marshalling request: %v", err)
	}

	req, err := http.NewRequest("POST", fc.BaseURL+"/run", bytes.NewBuffer(requestBody))
	if err != nil {
		return "", fmt.Errorf("error creating request: %v", err)
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+fc.ApiKey)

	resp, err := fc.Client.Do(req)
	if err != nil {
		return "", fmt.Errorf("error making request: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		bodyBytes, _ := io.ReadAll(resp.Body)
		return "", fmt.Errorf("API returned error status: %d - %s", resp.StatusCode, string(bodyBytes))
	}

	var runResponse RunResponse
	if err := json.NewDecoder(resp.Body).Decode(&runResponse); err != nil {
		return "", fmt.Errorf("error decoding response: %v", err)
	}

	return runResponse.ID, nil
}

// CheckStatus checks the status of a generation job
func (fc *FashionClient) CheckStatus(predictionID string) (*StatusResponse, error) {
	req, err := http.NewRequest("GET", fmt.Sprintf("%s/status/%s", fc.BaseURL, predictionID), nil)
	if err != nil {
		return nil, fmt.Errorf("error creating status request: %v", err)
	}

	req.Header.Set("Authorization", "Bearer "+fc.ApiKey)

	resp, err := fc.Client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("error making status request: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		bodyBytes, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("API returned error status: %d - %s", resp.StatusCode, string(bodyBytes))
	}

	var statusResponse StatusResponse
	if err := json.NewDecoder(resp.Body).Decode(&statusResponse); err != nil {
		return nil, fmt.Errorf("error decoding status response: %v", err)
	}

	return &statusResponse, nil
}

// ExtractImageURL extracts the first image URL from the output
func ExtractImageURL(output interface{}) (string, error) {
	// Try to parse as an array first
	if outputArray, ok := output.([]interface{}); ok && len(outputArray) > 0 {
		// If it's an array, try to get the first item
		if urlStr, ok := outputArray[0].(string); ok {
			return urlStr, nil
		}
	}
	
	// Try to parse as a map
	if outputMap, ok := output.(map[string]interface{}); ok {
		// Check if there's a direct URL field
		if urlStr, ok := outputMap["url"].(string); ok {
			return urlStr, nil
		}
		
		// Check for images array
		if images, ok := outputMap["images"].([]interface{}); ok && len(images) > 0 {
			if urlStr, ok := images[0].(string); ok {
				return urlStr, nil
			}
		}
	}
	
	// Convert the entire output to a string as a fallback
	outputBytes, err := json.Marshal(output)
	if err != nil {
		return "", fmt.Errorf("failed to extract image URL from output: %v", err)
	}
	
	return string(outputBytes), fmt.Errorf("couldn't extract a direct URL from output, returning raw data")
}

// HandleGeneration handles the /generation endpoint
func HandleFullOutfitGeneration(c *gin.Context) {
	var req FullOutfitRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request format"})
		return
	}

	// Validate required fields
	if req.ModelImage == "" || req.GarmentImage == "" || req.PantsImage == "" || req.Category == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing required fields"})
		return
	}

	// Create fashion client
	client, err := NewFashionClient()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// First API call - Generate top
	log.Printf("Starting first generation with top: %s", req.GarmentImage)
	topPredictionID, err := client.StartGeneration(req.ModelImage, req.PantsImage, req.Category)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Top generation failed: %v", err)})
		return
	}

	// Poll for top generation status
	var topResult *StatusResponse
	maxAttempts := 20
	for i := 0; i < maxAttempts; i++ {
		status, err := client.CheckStatus(topPredictionID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error checking top status: %v", err)})
			return
		}

		if status.Status == "completed" {
			topResult = status
			break
		} else if status.Status == "failed" {
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Top generation failed: %s", status.Error)})
			return
		}

		log.Printf("Top generation status: %s", status.Status)
		time.Sleep(3 * time.Second)
	}

	if topResult == nil {
		c.JSON(http.StatusRequestTimeout, gin.H{"error": "Top generation timed out"})
		return
	}

	// Extract the image URL from the first result
	modelWithTopURL, err := ExtractImageURL(topResult.Output)
	if err != nil {
		log.Printf("Warning when extracting image URL: %v", err)
	}
	log.Printf("Top generation completed, model with top image: %s", modelWithTopURL)

	// Second API call - Add pants to the model with top
	pantsPredictionID, err := client.StartGeneration(modelWithTopURL, req.GarmentImage, "tops")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": fmt.Sprintf("Pants generation failed: %v", err),
			"top_result": topResult.Output, // Return the top result anyway
		})
		return
	}

	// Poll for pants generation status
	var pantsResult *StatusResponse
	for i := 0; i < maxAttempts; i++ {
		status, err := client.CheckStatus(pantsPredictionID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": fmt.Sprintf("Error checking pants status: %v", err),
				"top_result": topResult.Output, // Return the top result anyway
			})
			return
		}

		if status.Status == "completed" {
			pantsResult = status
			break
		} else if status.Status == "failed" {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": fmt.Sprintf("Pants generation failed: %s", status.Error),
				"top_result": topResult.Output, // Return the top result anyway
			})
			return
		}

		log.Printf("Pants generation status: %s", status.Status)
		time.Sleep(3 * time.Second)
	}

	if pantsResult == nil {
		c.JSON(http.StatusRequestTimeout, gin.H{
			"error": "Pants generation timed out",
			"top_result": topResult.Output, // Return the top result anyway
		})
		return
	}

	// Return both results
	c.JSON(http.StatusOK, gin.H{
		"top_generation": gin.H{
			"id":     topPredictionID,
			"status": "completed",
			"output": topResult.Output,
		},
		"full_outfit_generation": gin.H{
			"id":     pantsPredictionID,
			"status": "completed",
			"output": pantsResult.Output,
		},
	})
}

func main() {
	// Initialize MongoDB connection
	if err := db.Connect(); err != nil {
		log.Printf("Warning: Failed to connect to MongoDB: %v", err)
	} else {
		defer db.Disconnect()
	}
	
	r := gin.Default()
	
	// CORS middleware
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		c.Next()
	})
	
	// Hello endpoint
	r.GET("/hello", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello from Unihack 2025 Backend!",
		})
	})
	
	// Search endpoint
	r.GET("/search", googlescrape.HandleSearch)
	
	// Fetch random clothes endpoint
	r.GET("/fetch", fetcher.HandleFetch)
	
	// New endpoint to fetch all S3 images
	r.GET("/api/images", s3.ListS3ImagesHandler)
	
	// New endpoint for uploading files to S3
	r.POST("/api/upload", s3.UploadFileHandler)
	
	// New endpoint for full outfit generation (top + pants)
	r.POST("/generation", HandleFullOutfitGeneration)
	
	// Start the server
	r.Run(":8080")
}