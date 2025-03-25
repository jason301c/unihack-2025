import { useState, KeyboardEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { ItemsSection } from "@/components/onboarding/steps/choose-items/ItemsSection";
import { QueryResult } from "@/components/onboarding/steps/ChooseItemsStep";
import { getAccessToken } from "@auth0/nextjs-auth0";

interface SearchQueryResult {
  title: string;
  link: string;
  snippet: string;
}

export function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchQueryResult[]>([]);
  const [transformedResult, setTransformedResult] =
    useState<QueryResult | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
    if (!apiUrl) {
      throw new Error("API URL is not defined");
    }

    try {
      const token = await getAccessToken();
      const response = await fetch(
        `${apiUrl}/search?q=${encodeURIComponent(searchQuery)}`,
        {
          headers: {
        Authorization: `Bearer ${token}`,
          },
        }
      );
      const results = (await response.json()) as SearchQueryResult[];
      setSearchResults(results);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (searchResults.length > 0) {
      setTransformedResult({
        query: searchQuery,
        images: searchResults.map((result) => ({
          link: result.link,
        })),
      });
    } else {
      setTransformedResult(null);
    }
  }, [searchResults, searchQuery]);

  return (
    <div>
      <h3 className="text-2xl text-bold text-prim-darkest mb-1">Browse</h3>
      <Input
        placeholder="Search the catalogue..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full mb-4"
      />
      {transformedResult && (
        <ItemsSection
          query={transformedResult.query}
          images={transformedResult.images}
        />
      )}
    </div>
  );
}
