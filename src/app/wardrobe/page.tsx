import React, { Suspense } from "react";
import {
  ClothingItem,
  WardrobeClient,
} from "@/components/wardrobe/WardrobeClient";
import WardrobeSkeleton from "@/components/wardrobe/WardrobeSkeleton";

// Simulated data fetch
function fetchWardrobeItems(): ClothingItem[] {
  const data = [
    {
      url: "https://dest-img-unihack.s3.ap-southeast-2.amazonaws.com/bottom/1742044882647489285-pt.jpg",
    },
    {
      url: "https://dest-img-unihack.s3.ap-southeast-2.amazonaws.com/bottom/1742045178732056086-anything-dress-pant-slim-back-flat-lay-black_1080x.jpg",
    },
    {
      url: "https://dest-img-unihack.s3.ap-southeast-2.amazonaws.com/bottom/1742045268879593656-dickiesduckpantforestgreenstonewashed_1024x1024.jpg",
    },
    {
      url: "https://dest-img-unihack.s3.ap-southeast-2.amazonaws.com/bottom/1742048090237595802-den.jpg",
    },
    {
      url: "https://dest-img-unihack.s3.ap-southeast-2.amazonaws.com/bottom/1742048291073425535-car.jpg",
    },
    {
      url: "https://dest-img-unihack.s3.ap-southeast-2.amazonaws.com/top/1742048809100869663-jack.jpg",
    },
    {
      url: "https://dest-img-unihack.s3.ap-southeast-2.amazonaws.com/top/1742076898357935531-whithst.jpg",
    },
    {
      url: "https://dest-img-unihack.s3.ap-southeast-2.amazonaws.com/top/1742077201303421813-di.jpg",
    },
    {
      url: "https://dest-img-unihack.s3.ap-southeast-2.amazonaws.com/top/1742078473582765459-images.jpg",
    },
    {
      url: "https://dest-img-unihack.s3.ap-southeast-2.amazonaws.com/top/1742083753196660720-d.jpg",
    },
    {
      url: "https://dest-img-unihack.s3.ap-southeast-2.amazonaws.com/top/1742106197052165651-tsh.jpg",
    },
    {
      url: "https://dest-img-unihack.s3.ap-southeast-2.amazonaws.com/top/1742205384682294513-IMG_9971.jpeg",
    },
    {
      url: "https://dest-img-unihack.s3.ap-southeast-2.amazonaws.com/top/1742205389293289028-IMG_9972.jpeg",
    },
    {
      url: "https://dest-img-unihack.s3.ap-southeast-2.amazonaws.com/top/1742287961682766643-testshirt.jpg",
    },
    {
      url: "https://dest-img-unihack.s3.ap-southeast-2.amazonaws.com/top/il_570xN.628322829.jpg",
    },
    {
      url: "https://dest-img-unihack.s3.ap-southeast-2.amazonaws.com/top/jacketsss.jpg",
    },
    {
      url: "https://dest-img-unihack.s3.ap-southeast-2.amazonaws.com/top/muscle-removebg-preview.png",
    },
  ];
  return data.map((img: { url: string }, index: number) => ({
    id: index.toString(),
    name: `Item ${index + 1}`,
    imageUrl: img.url,
  }));
}

// Wardrobe content with data fetching
async function WardrobeContent() {
  const items = fetchWardrobeItems();

  return <WardrobeClient initialItems={items} />;
}

export default function Wardrobe() {
  return (
    <main className="min-h-screen min-v-screen text-white px-8 py-6 flex flex-col">
      <Suspense fallback={<WardrobeSkeleton />}>
        <WardrobeContent />
      </Suspense>
    </main>
  );
}
