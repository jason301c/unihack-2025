"use client";

import React from "react";
import { Look } from "@/app/lookbook/page";
import LookCarousel from "./LookCarousel"; // adjust the import path as needed

type LookBookDetailProps = {
  looks: Look[];
  initialIndex: number;
};

export default function LookBookDetail({
  looks,
  initialIndex,
}: LookBookDetailProps) {

  return (
    <div className="min-h-screen bg-white text-black p-6">

      <LookCarousel looks={looks} initialIndex={initialIndex} />
    </div>
  );
}
