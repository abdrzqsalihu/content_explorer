import { getProducts } from '@/lib/api/products';
import { ProductCard } from './product-card';
import { Pagination } from './pagination';
import { ErrorBoundary } from './error-boundary';
import Link from 'next/link';
import { AlertCircle, SearchX } from 'lucide-react';
import { EmptyState } from './EmptyState';

interface ProductGridProps {
  search?: string;
  category?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  skip?: number;
}

export async function ProductGrid({
  search,
  category,
  sort,
  order = 'asc',
  skip = 0,
}: ProductGridProps) {
  try {
    const data = await getProducts({
      skip,
      limit: 12,
      search,
      category,
      sortBy: sort,
      order,
    });
    if (!data.products || data.products.length === 0) {
      return (
        <ErrorBoundary>
          <EmptyState
            icon={<SearchX size={28} strokeWidth={2} />}
            title="No products found"
            description="We couldn't find anything matching your current filters. Try adjusting your search or clearing them to see more."
            action={
              <Link
                href="/"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-transparent px-5 text-sm font-medium text-foreground transition-all duration-300 hover:border-foreground/40 hover:bg-secondary/10"
              >
                Clear all filters
              </Link>
            }
          />
        </ErrorBoundary>
      );
    }

    const totalPages = Math.ceil(data.total / 12);
    const currentPage = Math.floor(skip / 12) + 1;

    return (
      <ErrorBoundary>
        <div className="space-y-8">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{data.products.length}</span> of{' '}
              <span className="font-semibold text-foreground">{data.total}</span> products
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      </ErrorBoundary>
    );
  } catch (error) {
    return (
      <ErrorBoundary>
        <EmptyState
          icon={<AlertCircle size={28} strokeWidth={2} />}
          title="Failed to load catalog"
          description="There was an unexpected issue loading the products. Please try refreshing the page."
          action={
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary/90"
            >
              Reload Page
            </Link>
          }
        />
      </ErrorBoundary>
    );
  }
}

