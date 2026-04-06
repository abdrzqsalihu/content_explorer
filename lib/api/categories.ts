import { Category } from '@/types/category';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/products/categories`, {
    cache: 'force-cache',
  });

  if (!res.ok) throw new Error('Failed to fetch categories');

  return res.json();
}