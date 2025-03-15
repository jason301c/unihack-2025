import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function WardrobeSkeleton() {
  return (
    <div className="min-h-screen min-v-screen text-white px-8 py-6 flex flex-col">
      {/* Header skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
      
      {/* Title skeleton */}
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-8 w-24 rounded-3xl" />
      </div>
      
      {/* Grid skeleton */}
      <div className="grid grid-cols-3 gap-4 justify-items-center">
        {Array(6).fill(0).map((_, i) => (
          <Skeleton key={i} className="w-26 h-26 rounded-md" />
        ))}
      </div>
    </div>
  );
}