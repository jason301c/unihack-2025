package fetcher

import (
	"context"
	"log"
	"math/rand"
	"net/http"
	"time"

	"unihack-2025/backend/db"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

// The purpose of this fetcher is to fetch from the mongodb/unihack/search_results
// Fetch like 20 clothes randomly and return the URLs back to the client

// QueryResult represents a query and its associated images
type QueryResult struct {
	Query  string   `json:"query"`
	Images []string `json:"images"`
}

// FetchRandomClothes fetches random clothing images from the database
func FetchRandomClothes() ([]QueryResult, error) {
	if db.Database == nil {
		return nil, nil // Skip if database is not connected
	}

	// Get the collection
	collection := db.Database.Collection("search_results")

	// Get distinct queries
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Find distinct query values
	distinctQueries, err := collection.Distinct(ctx, "query", bson.M{})
	if err != nil {
		return nil, err
	}

	// Convert to string slice
	queries := make([]string, 0, len(distinctQueries))
	for _, q := range distinctQueries {
		if qStr, ok := q.(string); ok {
			queries = append(queries, qStr)
		}
	}

	// Randomize the order of queries
	rand.Shuffle(len(queries), func(i, j int) {
		queries[i], queries[j] = queries[j], queries[i]
	})

	// Select up to 4 random queries
	queryCount := 4
	if len(queries) < queryCount {
		queryCount = len(queries)
	}
	selectedQueries := queries[:queryCount]

	// For each selected query, get 3 random images
	results := make([]QueryResult, 0, queryCount)
	for _, query := range selectedQueries {
		// Find all images for this query
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		cursor, err := collection.Find(ctx, bson.M{"query": query})
		if err != nil {
			return nil, err
		}
		defer cursor.Close(ctx)

		// Extract all image links for this query
		var documents []bson.M
		if err := cursor.All(ctx, &documents); err != nil {
			return nil, err
		}

		// Randomize the order of documents
		rand.Shuffle(len(documents), func(i, j int) {
			documents[i], documents[j] = documents[j], documents[i]
		})

		// Select up to 3 random images
		imageCount := 3
		if len(documents) < imageCount {
			imageCount = len(documents)
		}

		// Extract image links
		images := make([]string, 0, imageCount)
		for i := 0; i < imageCount; i++ {
			if link, ok := documents[i]["link"].(string); ok {
				// Find brands of the image
				brand := FindBrand(link)
				images = append(images, link, brand)
			}
		}

		// Add to results
		results = append(results, QueryResult{
			Query:  query,
			Images: images,
		})
	}

	return results, nil
}

// HandleFetch handles the API request to fetch random clothing images
func HandleFetch(c *gin.Context) {
	// Fetch random clothes
	results, err := FetchRandomClothes()
	if err != nil {
		log.Printf("Error fetching random clothes: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch random clothes"})
		return
	}

	// Return the results
	c.JSON(http.StatusOK, results)
}
