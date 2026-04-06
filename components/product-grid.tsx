import { getProducts } from '@/lib/api/products';
import { ProductCard } from './product-card';
import { ErrorBoundary } from './error-boundary';

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
          <div>
            No product found
          </div>
        </ErrorBoundary>
      );
    }

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
        </div>
      </ErrorBoundary>
    );
  } catch (error) {
    return (
      <ErrorBoundary>
        <div>
          Failed to load catalog
        </div>
      </ErrorBoundary>
    );
  }
}