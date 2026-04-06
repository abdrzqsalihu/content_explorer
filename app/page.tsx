export const runtime = 'edge';

import { Suspense } from 'react';
import { SearchBar } from '@/components/search-bar';
import { ProductGrid } from '@/components/product-grid';
import { FilterSidebar } from '@/components/filter-sidebar';
import { ProductsSkeleton } from '@/components/products-skeleton';

interface SearchParams {
  search?: string;
  category?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  page?: string;
}

export default async function Home({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);
  const skip = (page - 1) * 12;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-foreground">
                Content Explorer
              </h1>
            </div>
            <SearchBar />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <FilterSidebar currentCategory={params.category} currentSort={params.sort} />
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <Suspense fallback={<ProductsSkeleton />}>
              <ProductGrid
                search={params.search}
                category={params.category}
                sort={params.sort}
                order={params.order as 'asc' | 'desc' | undefined}
                skip={skip}
              />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
