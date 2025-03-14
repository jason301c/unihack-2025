package main

import (
	"log"
	"net/http"

	"unihack-2025/backend/db"
	"unihack-2025/backend/fetcher"
	"unihack-2025/backend/googlescrape"

	"github.com/gin-gonic/gin"
)

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

	r.Run(":8080")
}
