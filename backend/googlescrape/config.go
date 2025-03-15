package googlescrape

// SearchConfig holds the configuration for Google Custom Search API
type SearchConfig struct {
	APIKey         string `json:"api_key"`
	SearchEngineID string `json:"search_engine_id"`
	BaseURL        string `json:"base_url"`
}

// DefaultConfig returns a default configuration with base URL
func DefaultConfig() SearchConfig {
	return SearchConfig{
		BaseURL: "https://www.googleapis.com/customsearch/v1",
	}
}
