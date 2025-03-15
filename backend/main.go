package main

import (
	"log"
	"net/http"

	"unihack-2025/backend/db"
	"unihack-2025/backend/fashion"
	"unihack-2025/backend/fetcher"
	"unihack-2025/backend/googlescrape"
	"unihack-2025/backend/middleware"
	"unihack-2025/backend/s3"

	"github.com/gin-gonic/gin"
	adapter "github.com/gwatts/gin-adapter"
)

func main() {
	// Initialize MongoDB connection
	if err := db.Connect(); err != nil {
		log.Printf("Warning: Failed to connect to MongoDB: %v", err)
	} else {
		defer db.Disconnect()
	}

	// Initialize the Gin router
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

	// ROUTES
	// UNPROTECTED ROUTES:
	// Hello endpoint
	r.GET("/hello", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello from Unihack 2025 Backend!",
		})
	})

	// Fetch random clothes endpoint
	r.GET("/fetch", fetcher.HandleFetch)

	// New endpoint to fetch all S3 images
	r.GET("/api/images", s3.ListS3ImagesHandler)

	// PROTECTED ROUTES:
	// JWT middleware (PROTECTED ROUTES BEGIN BELOW)
	// r.Use(adapter.Wrap(middleware.EnsureValidToken())) 
	// Later we'll protect

	// Search endpoint
	r.GET("/search", googlescrape.HandleSearch)

	// New endpoint for uploading files to S3
	r.POST("/api/upload", s3.UploadFileHandler)

	// New endpoint for full outfit generation (top + pants)
	r.POST("/generation", fashion.HandleFullOutfitGeneration)

	// Start the server
	r.Run(":8080")
}
