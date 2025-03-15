import { BackButton } from "@/components/catalogue/BackButton";
import { CatalogueClient } from "@/components/catalogue/CatalogueClient";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export interface QueryResult {
  query: string;
  images: [
    {
      link: string;
      brand?: string;
    }
  ];
}

async function fetchItems(): Promise<QueryResult[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

  if (!apiUrl) {
    throw new Error("API URL is not defined");
  }

  const response = await fetch(apiUrl + "/fetch");
  const result = (await response.json()) as QueryResult[];
  return result;
}
export default async function CataloguePage() {
  const items = await fetchItems();

  return (
    <div className="flex flex-col min-h-screen bg-black text-white px-2 pt-2">
      <BackButton />

      <div className="flex flex-col gap-4 px-8">
        <Card className="border-none bg-transparent shadow-none p-0">
          <CardHeader className="p-0 gap-0">
            <CardTitle
              data-slot="page-title"
              className="text-3xl font-bold text-white leading-tight"
            >
              Choose items
            </CardTitle>
            <CardTitle
              data-slot="page-subtitle"
              className="text-3xl font-bold text-white leading-tight -mt-2"
            >
              from the brands
            </CardTitle>
            <CardTitle
              data-slot="page-subtitle"
              className="text-3xl font-bold text-white leading-tight -mt-2"
            >
              you{" "}
              <span className="text-yellow-200 transition-colors hover:text-yellow-300">
                love
              </span>
              .
            </CardTitle>
          </CardHeader>
        </Card>

        <CatalogueClient items={items} />
      </div>
    </div>
  );
}
