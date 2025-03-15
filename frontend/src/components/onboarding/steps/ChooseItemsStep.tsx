import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ItemsSection } from "./choose-items/ItemsSection";
import React from "react";

export interface QueryResult {
  query: string;
  images: {
    link: string;
    brand?: string;
  }[];
}

async function fetchItems(): Promise<QueryResult[]> {
  const apiUrl = process.env.NEXT_SERVER_API_URL || "";

  if (!apiUrl) {
    throw new Error("API URL is not defined");
  }

  const response = await fetch(apiUrl + "/fetch");
  const result = (await response.json()) as QueryResult[];
  return result;
}

function HeaderText() {
  return (
    <Card className="border-none bg-transparent shadow-none w-full">
      <CardHeader className="px-0 py-0">
        <CardTitle
          data-slot="page-title"
          className="text-4xl text-prim-darkest leading-tight"
        >
          Choose items
        </CardTitle>
        <CardTitle
          data-slot="page-subtitle"
          className="text-4xl text-prim-darkest leading-tight -mt-2"
        >
          from the <span className="text-prim-dark">brands</span>
        </CardTitle>
        <CardTitle
          data-slot="page-subtitle"
          className="text-4xl text-prim-darkest leading-tight -mt-2"
        >
          you <span className="text-prim-dark">love</span>.
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export default async function ChooseItemsStep() {
  const items = await fetchItems();

  return (
    <div className="px-6 mt-6"> 
      <HeaderText />
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <ItemsSection
            key={item.query}
            query={item.query}
            images={item.images}
          />
        ))}
      </div>
    </div>
  );
}
