package googlescrape

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func HandleSearch(c *gin.Context) {
	// Get query parameter
	query := c.Query("q")
	if query == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Query parameter 'q' is required"})
		return
	}

	// Initialize search config from environment variables
	config := DefaultConfig()
	config.APIKey = os.Getenv("GOOGLE_API_KEY")
	config.SearchEngineID = os.Getenv("GOOGLE_SEARCH_ENGINE_ID")

	if config.APIKey == "" || config.SearchEngineID == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Search service configuration is incomplete"})
		return
	}

	// Perform the search
	results, err := Search(query, config)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error performing search: %v", err)})
		return
	}

	// Save search results to MongoDB
	if err := SaveSearchResults(query, results); err != nil {
		// Log the error but don't fail the request
		log.Printf("Warning: Failed to save search results to MongoDB: %v", err)
	}

	c.JSON(http.StatusOK, results)
}
