import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { QueryResult } from "@/components/onboarding/steps/ChooseItemsStep";
import { ItemsSection } from "@/components/onboarding/steps/choose-items/ItemsSection";
import { useEffect, useState } from "react";
import { SearchSection } from "./SearchSection";

interface SearchSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

async function fetchRecommended(): Promise<QueryResult[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

  if (!apiUrl) {
    throw new Error("API URL is not defined");
  }

  const response = await fetch(apiUrl + "/fetch");
  const result = (await response.json()) as QueryResult[];
  return result;
}

export default function SearchSheet({
  isOpen,
  onOpenChange,
}: SearchSheetProps) {
  const [recommendedItems, setRecommendedItems] = useState<QueryResult[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const items = await fetchRecommended();
      setRecommendedItems(items);
    }
    fetchData();
  }, [refresh]);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-2/3 rounded-t-xl px-6 overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle className="text-xl text-center text-prim-darkest">
            Catalogue
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6">
          {/* Search Section */}
          <SearchSection />

          {/* Recommended Section */}
          <div>
            <div className="flex items-center justify-between mb-2 text-prim-darkest border-b-2 border-prim-darkest">
              <h3 className="text-2xl text-bold text-prim-darkest">
                Recommended
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setRefresh(!refresh)}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-col gap-4">
              {recommendedItems.map((item) => (
                <ItemsSection
                  key={item.query}
                  query={item.query}
                  images={item.images}
                />
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
