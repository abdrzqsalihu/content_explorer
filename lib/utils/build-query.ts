export function buildProductsQuery(params: {
  skip?: number;
  limit?: number;
  search?: string;
  category?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}) {
  const {
    skip = 0,
    limit = 12,
    search,
    category,
    sortBy,
    order = 'asc',
  } = params;

  let endpoint = '/products';
  
  if (search) {
    endpoint = '/products/search';
  }

  if (category && category !== 'all') {
    endpoint = `/products/category/${category}`;
  }

  const query = new URLSearchParams({
    skip: skip.toString(),
    limit: limit.toString(),
    ...(search && { q: search }),
    ...(sortBy && { sortBy, order }),
  });

  return { endpoint, query };
}