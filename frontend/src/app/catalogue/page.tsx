import { BackButton } from '@/components/catalogue/BackButton';
import { PageHeader } from '@/components/catalogue/PageHeader';
import { CatalogueClient } from '@/components/catalogue/CatalogueClient';

export interface QueryResult {
    query: string;
    images: [{
        link: string;
        brand?: string;
    }]
}

async function fetchItems(): Promise<QueryResult[]>{
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''

    if (!apiUrl) {
        throw new Error('API URL is not defined');
    }

    const response = await fetch(apiUrl + '/fetch');
    const result = await response.json() as QueryResult[];
    return result;

}
export default async function CataloguePage() {
    const items = await fetchItems();

  return (
    <div className="flex flex-col min-h-screen bg-black text-white px-2 pt-2">
      <BackButton />

      <div className="flex flex-col gap-6 px-8">
        <PageHeader />
        <CatalogueClient items={items} />
      </div>
    </div>
  );
}