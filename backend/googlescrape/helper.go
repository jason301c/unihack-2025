package googlescrape

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"time"

	"unihack-2025/backend/db"
)

// Search performs a Google Custom Search using the provided configuration
func Search(query string, config SearchConfig) ([]SearchResult, error) {
	// Build the search URL with parameters
	params := url.Values{}
	params.Add("key", config.APIKey)
	params.Add("cx", config.SearchEngineID)
	params.Add("q", query)

	// Hardcoded params
	params.Add("searchType", "image")

	searchURL := fmt.Sprintf("%s?%s", config.BaseURL, params.Encode())

	// Make the HTTP request
	resp, err := http.Get(searchURL)
	if err != nil {
		return nil, fmt.Errorf("failed to make request: %v", err)
	}
	defer resp.Body.Close()

	// Read the response body
	body, err := io.ReadAll(resp.Body)

	if err != nil {
		return nil, fmt.Errorf("failed to read response: %v", err)
	}

	// Parse the JSON response
	var response SearchResponse
	if err := json.Unmarshal(body, &response); err != nil {
		return nil, fmt.Errorf("failed to parse response: %v", err)
	}

	return response.Items, nil
}

// SaveSearchResults stores search results directly in MongoDB without creating a SearchRecord
// Each search result is inserted as a separate document
func SaveSearchResults(query string, results []SearchResult) error {
	if db.Database == nil {
		return nil // Skip if database is not connected
	}

	// Get the collection
	collection := db.Database.Collection("search_results")

	// Loop through each result and insert individually
	for _, result := range results {
		// Create a context for each insertion
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		// Create a document for the individual result
		// Include the query to maintain relationship with the search
		document := map[string]interface{}{
			"query":       query,
			"title":       result.Title,
			"link":        result.Link,
			"snippet":     result.Snippet,
			"inserted_at": time.Now(),
		}

		// Insert the individual result
		_, err := collection.InsertOne(ctx, document)
		if err != nil {
			return err // Return on first error
		}
	}

	return nil
}
