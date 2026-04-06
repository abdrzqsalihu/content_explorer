import { ProductsResponse, Product } from '@/types/product';
import { buildProductsQuery } from '../utils/build-query';


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function getProducts(params = {}): Promise<ProductsResponse> {
  try {
    const { endpoint, query } = buildProductsQuery(params);

    const res = await fetch(`${BASE_URL}${endpoint}?${query}`, {
      next: {
        revalidate: 60, 
      },
    });

    if (!res.ok) throw new Error('Failed to fetch products');

    return res.json();
  } catch (error) {
    console.error('getProducts error:', error);
    throw error;
  }
}


export async function getProductById(id: number): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    next: {
      revalidate: 3600, 
    },
  });

  if (!res.ok) throw new Error('Failed to fetch product');

  return res.json();
}