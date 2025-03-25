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

function fetchItems(): QueryResult[] {
  return [
    {
      query: "pajamas",
      images: [
        {
          link: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/441307002/item/goods_41_441307002_3x4.jpg?width=494",
          brand: "Uniqlo",
        },
        {
          link: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/460277/item/goods_17_460277_3x4.jpg?width=494",
          brand: "Uniqlo",
        },
        {
          link: "https://image.uniqlo.com/UQ/ST3/au/imagesgoods/450170/item/augoods_61_450170_3x4.jpg?width=494",
          brand: "Uniqlo",
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
    {
      query: "test",
      images: [
        {
          link: "https://image.hm.com/assets/hm/69/24/6924fc6ac7ca64d502435f555d237b154e7046e7.jpg?imwidth=1536",
          brand: "",
        },
        {
          link: "https://lp2.hm.com/hmgoepprod?set=width[562],quality[80],options[limit]\u0026source=url[https://www2.hm.com/content/dam/HM%20Club/DK/s.7/w14/DK07D39.jpg]\u0026scale=width[global.width],height[15000],options[global.options]\u0026sink=format[jpg],quality[global.quality]",
          brand: "",
        },
        {
          link: "https://image.hm.com/assets/hm/b5/5b/b55b5a63179d302e921a1353cee682d073299b12.jpg?imwidth=1536",
          brand: "",
        },
      ],
    },
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
  ];
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
  const items = fetchItems();

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
