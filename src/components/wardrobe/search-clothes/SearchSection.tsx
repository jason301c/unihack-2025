import { useState, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { ItemsSection } from "@/components/onboarding/steps/choose-items/ItemsSection";
import { QueryResult } from "@/components/onboarding/steps/ChooseItemsStep";

export function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [transformedResult, setTransformedResult] =
    useState<QueryResult | null>(null);

  const handleSearch = () => {
    const fetchItems = () => {
      return [
        {
          title:
            "High Rise Barrel Leg Jeans - Dark denim blue - Ladies | H&M US",
          link: "https://image.hm.com/assets/hm/3b/22/3b2200a3c71a58971ff21f33a2fb9ca1ac8b0ee9.jpg?imwidth=2160",
          snippet:
            "High Rise Barrel Leg Jeans - Dark denim blue - Ladies | H&M US",
        },
        {
          title: "Houston Loose Jeans - Light denim blue - Men | H&M US",
          link: "https://image.hm.com/assets/hm/59/d7/59d75e489c8b4c2986d1a49595583d292576d7f5.jpg?imwidth=2160",
          snippet: "Houston Loose Jeans - Light denim blue - Men | H&M US",
        },
        {
          title: "Houston Loose Jeans - Dark denim blue - Men | H&M US",
          link: "https://image.hm.com/assets/hm/7f/f5/7ff54747c2d02cd4c72142c7ceaa3d15b6549213.jpg?imwidth=2160",
          snippet: "Houston Loose Jeans - Dark denim blue - Men | H&M US",
        },
        {
          title: "Fairfax Baggy Jeans - Denim blue - Men | H&M US",
          link: "https://image.hm.com/assets/hm/3e/ec/3eecfdb15fad13c51182236deb61a17578fa9f4d.jpg?imwidth=2160",
          snippet: "Fairfax Baggy Jeans - Denim blue - Men | H&M US",
        },
        {
          title: "Straight Regular Jeans - Light denim blue - Men | H&M US",
          link: "https://image.hm.com/assets/hm/11/f1/11f1da0f4ffb3bda9564e09473484288ffbe29c5.jpg?imwidth=2160",
          snippet: "Straight Regular Jeans - Light denim blue - Men | H&M US",
        },
        {
          title: "Straight High Jeans - Light denim blue - Ladies | H&M US",
          link: "https://image.hm.com/assets/hm/78/53/785385e297429dc2903611604e369b7ae4357ada.jpg?imwidth=2160",
          snippet: "Straight High Jeans - Light denim blue - Ladies | H&M US",
        },
        {
          title: "Houston Loose Jeans - Denim gray - Men | H&M US",
          link: "https://image.hm.com/assets/hm/41/d4/41d4333d220a88fa7c8bdab5e543b977771266f9.jpg?imwidth=768",
          snippet: "Houston Loose Jeans - Denim gray - Men | H&M US",
        },
        {
          title:
            "High Rise Barrel Leg Jeans - Dark denim blue - Ladies | H&M US",
          link: "https://image.hm.com/assets/hm/3b/22/3b2200a3c71a58971ff21f33a2fb9ca1ac8b0ee9.jpg",
          snippet:
            "High Rise Barrel Leg Jeans - Dark denim blue - Ladies | H&M US",
        },
        {
          title:
            "Harper High Rise Wide Leg Jeans - Denim blue - Ladies | H&M US",
          link: "https://image.hm.com/assets/hm/64/9b/649b29e72af82e9757f31825c2c474b5c89d119c.jpg?imwidth=2160",
          snippet:
            "Harper High Rise Wide Leg Jeans - Denim blue - Ladies | H&M US",
        },
        {
          title: "Straight Regular Jeans - Dark denim blue - Men | H&M US",
          link: "https://image.hm.com/assets/hm/a6/a2/a6a2dd95717b3b3dd47aee25f3c284a307a65be0.jpg?imwidth=2160",
          snippet: "Straight Regular Jeans - Dark denim blue - Men | H&M US",
        },
      ];
    };

    const results = fetchItems();

    // Transform search results to match QueryResult format
    const transformed: QueryResult = {
      query: searchQuery,
      images: results.map((item) => ({
        link: item.link,
        brand: "Placeholder brand",
      })),
    };
    setTransformedResult(transformed);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

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
