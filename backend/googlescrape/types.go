package googlescrape

// SearchInformation represents metadata about the search results
type SearchInformation struct {
	SearchTime            float64 `json:"searchTime"`
	FormattedSearchTime   string  `json:"formattedSearchTime"`
	TotalResults          string  `json:"totalResults"`
	FormattedTotalResults string  `json:"formattedTotalResults"`
}

// SearchQuery represents information about the search query
type SearchQuery struct {
	Title        string `json:"title"`
	TotalResults string `json:"totalResults"`
	SearchTerms  string `json:"searchTerms"`
	Count        int    `json:"count"`
	StartIndex   int    `json:"startIndex"`
}

// SearchResult represents the search result structure
type SearchResult struct {
	Title   string `json:"title"`
	Link    string `json:"link"`
	Snippet string `json:"snippet"`
}

// SearchResponse represents the complete search response
type SearchResponse struct {
	SearchInformation SearchInformation `json:"searchInformation"`
	Queries           struct {
		Request  []SearchQuery `json:"request"`
		NextPage []SearchQuery `json:"nextPage,omitempty"`
	} `json:"queries"`
	Items []SearchResult
}
