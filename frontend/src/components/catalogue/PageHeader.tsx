import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export function PageHeader() {
  return (
    <Card className="border-none bg-transparent shadow-none p-0">
      <CardHeader className="p-0 gap-0">
        <CardTitle data-slot="page-title" className="text-3xl font-bold text-white tracking-wider leading-tight">Choose items</CardTitle>
        <CardTitle data-slot="page-subtitle" className="text-3xl font-bold text-white tracking-wider leading-tight -mt-2">from the brands</CardTitle>
        <CardTitle data-slot="page-subtitle" className="text-3xl font-bold text-white tracking-wider leading-tight -mt-2">
          you <span className="text-yellow-200 transition-colors hover:text-yellow-300">love</span>.
        </CardTitle>
      </CardHeader>
    </Card>
  );
}