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

function fetchRecommended(): QueryResult[] {
  return [
    {
      query: "zara",
      images: [
        {
          link: "https://static.zara.net/assets/public/cbee/bee6/730540c78ef5/fe5fe8ae1f09/1679055787018/1679055787018.jpg?ts=1702299824105",
          brand: "Zara",
        },
        {
          link: "https://static.zara.net/assets/public/a893/852b/957e4e3ca322/7633a1e00a2b/03152710802-e1/03152710802-e1.jpg?ts=1723801291734",
          brand: "Zara",
        },
        {
          link: "https://static.zara.net/assets/public/7e0a/5372/418d4bdc9430/95c444a0272e/20120840999-e1/20120840999-e1.jpg?ts=1735562701563",
          brand: "Zara",
        },
      ],
    },
    {
      query: "jacket",
      images: [
        {
          link: "https://image.uniqlo.com/UQ/ST3/au/imagesgoods/476316/item/augoods_69_476316_3x4.jpg?width=494",
          brand: "Uniqlo",
        },
        {
          link: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/464998/item/goods_69_464998_3x4.jpg?width=494",
          brand: "Uniqlo",
        },
        {
          link: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/462770/sub/goods_462770_sub14_3x4.jpg?width=494",
          brand: "Uniqlo",
        },
      ],
    },
  ];
}

export default function SearchSheet({
  isOpen,
  onOpenChange,
}: SearchSheetProps) {
  const [recommendedItems, setRecommendedItems] = useState<QueryResult[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const items = fetchRecommended();
    setRecommendedItems(items);
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
