'use client';

import { useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getCategories } from '@/lib/api/categories';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface FilterSidebarProps {
  currentCategory?: string;
  currentSort?: string;
}

const SORT_OPTIONS = [
  { value: 'title', label: 'Name' },
  { value: 'price', label: 'Price' },
  { value: 'rating', label: 'Rating' },
];

export function FilterSidebar({ currentCategory, currentSort }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [categories, setCategories] = useState<Array<{ name: string; slug: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const cats = await getCategories();
        setCategories(cats);
      } catch (error) {
        console.error('Failed to load categories:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadCategories();
  }, []);

  const handleCategoryChange = (category: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (category === 'all') {
        params.delete('category');
      } else {
        params.set('category', category);
      }
      params.delete('page');
      router.push(`?${params.toString()}`);
    });
  };

  const handleSortChange = (sort: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (sort) {
        params.set('sort', sort);
      } else {
        params.delete('sort');
      }
      params.delete('page');
      router.push(`?${params.toString()}`);
    });
  };

  const handleClearFilters = () => {
    startTransition(() => {
      router.push('/');
    });
  };

  return (
    <div className="sticky top-24 space-y-6 rounded-lg border border-border bg-card p-6">
      <div>
        <h3 className="mb-4 font-semibold text-foreground">Categories</h3>
        <div className="space-y-2">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 size={20} className="animate-spin text-accent" />
            </div>
          ) : (
            <>
              <button
                onClick={() => handleCategoryChange('all')}
                disabled={isPending}
                className={`block w-full rounded px-3 py-2 text-left text-sm transition-colors cursor-pointer ${!currentCategory
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-secondary text-foreground'
                  }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => handleCategoryChange(category.slug)}
                  disabled={isPending}
                  className={`block w-full rounded px-3 py-2 text-left text-sm capitalize transition-colors cursor-pointer ${currentCategory === category.slug
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-secondary text-foreground'
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </>
          )}
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="mb-4 font-semibold text-foreground">Sort By</h3>
        <div className="space-y-2">
          <button
            onClick={() => handleSortChange('')}
            disabled={isPending}
            className={`block w-full rounded px-3 py-2 text-left text-sm transition-colors cursor-pointer ${!currentSort
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-secondary text-foreground'
              }`}
          >
            Relevance
          </button>
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              disabled={isPending}
              className={`block w-full rounded px-3 py-2 text-left text-sm transition-colors cursor-pointer ${currentSort === option.value
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-secondary text-foreground'
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleClearFilters}
        disabled={isPending || (!currentCategory && !currentSort)}
        className="w-full border border-border rounded px-3 py-2 text-cneter text-sm transition-colors cursor-pointer "
      >
        Clear All Filters
      </button>
    </div>
  );
}
