package fetcher

import (
	"strings"
)

func FindBrand(url string) string {
	// Assume string contains brand name (URL)
	// Convert URL to lowercase for case-insensitive matching
	lowerURL := strings.ToLower(url)

	// Check for common brand names in URL
	if strings.Contains(lowerURL, "nike") {
		return "Nike"
	}
	if strings.Contains(lowerURL, "adidas") {
		return "Adidas"
	}
	if strings.Contains(lowerURL, "puma") {
		return "Puma"
	}
	if strings.Contains(lowerURL, "reebok") {
		return "Reebok"
	}
	if strings.Contains(lowerURL, "newbalance") || strings.Contains(lowerURL, "new-balance") {
		return "New Balance"
	}
	if strings.Contains(lowerURL, "underarmour") || strings.Contains(lowerURL, "under-armour") {
		return "Under Armour"
	}
	if strings.Contains(lowerURL, "asics") {
		return "ASICS"
	}

	if strings.Contains(lowerURL, "converse") {
		return "Converse"
	}
	if strings.Contains(lowerURL, "vans") {
		return "Vans"
	}

	if strings.Contains(lowerURL, "uniqlo") {
		return "Uniqlo"
	}
	if strings.Contains(lowerURL, "zara") {
		return "Zara"
	}

	// If no brand is found
	return ""
}
