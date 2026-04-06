'use client';

import { useTransition, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getCategories } from '@/lib/api/categories';
import { useEffect } from 'react';
import { Loader2, X, ChevronDown } from 'lucide-react';

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
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<'categories' | 'sort' | null>('categories');

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
    // Close mobile drawer after selection on mobile
    if (window.innerWidth < 768) {
      setIsMobileOpen(false);
    }
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
    if (window.innerWidth < 768) {
      setIsMobileOpen(false);
    }
  };

  const hasActiveFilters = currentCategory || currentSort;

  const FilterContent = () => (
    <>
      {/* Categories Section */}
      <div>
        <button
          onClick={() => setExpandedSection(expandedSection === 'categories' ? null : 'categories')}
          className="md:pointer-events-none flex w-full items-center justify-between md:cursor-default md:mb-4 md:block"
        >
          <h3 className="font-semibold text-foreground">Categories</h3>
          <ChevronDown
            size={18}
            className={`md:hidden transition-transform ${expandedSection === 'categories' ? 'rotate-180' : ''}`}
          />
        </button>

        <div
          className={`space-y-2 overflow-hidden transition-all duration-300 md:max-h-none ${expandedSection === 'categories' ? 'max-h-96 md:max-h-none' : 'max-h-0 md:max-h-none'
            }`}
        >
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

      {/* Divider */}
      <div className={`border-t border-border ${expandedSection === 'categories' ? '' : 'hidden'} md:block`} />

      {/* Sort Section */}
      <div className={`${expandedSection === 'categories' ? 'pt-6' : ''} md:pt-6 md:border-t md:border-border`}>
        <button
          onClick={() => setExpandedSection(expandedSection === 'sort' ? null : 'sort')}
          className="md:pointer-events-none flex w-full items-center justify-between md:cursor-default md:mb-4 md:block"
        >
          <h3 className="font-semibold text-foreground">Sort By</h3>
          <ChevronDown
            size={18}
            className={`md:hidden transition-transform ${expandedSection === 'sort' ? 'rotate-180' : ''}`}
          />
        </button>

        <div
          className={`space-y-2 overflow-hidden transition-all duration-300 md:max-h-none ${expandedSection === 'sort' ? 'max-h-96 md:max-h-none' : 'max-h-0 md:max-h-none'
            }`}
        >
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

      {/* Clear Filters Button */}
      <button
        onClick={handleClearFilters}
        disabled={isPending || !hasActiveFilters}
        className={`w-full border border-border rounded px-3 py-2 text-center text-sm transition-all duration-200 cursor-pointer ${hasActiveFilters
          ? 'hover:bg-destructive hover:text-destructive-foreground hover:border-destructive'
          : 'opacity-50 cursor-not-allowed'
          }`}
      >
        Clear All Filters
      </button>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="sticky top-24 hidden space-y-6 rounded-lg border border-border bg-card p-6 md:block">
        <FilterContent />
      </div>

      {/* Mobile Filter Button */}
      <div className="sticky top-20 z-30 flex gap-3 bg-background p-4 md:hidden border-b border-border">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground py-2 px-4 font-medium transition-colors hover:opacity-90 text-sm cursor-pointer"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
          Filters
          {hasActiveFilters && (
            <span className="ml-1 inline-flex items-center justify-center h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs font-bold">
              {(currentCategory ? 1 : 0) + (currentSort ? 1 : 0)}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl border-t border-border bg-card p-6 transition-transform duration-300 ease-out md:hidden max-h-[90vh] overflow-y-auto ${isMobileOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-2 hover:bg-secondary rounded-lg transition-colors cursor-pointer"
          >
            <X size={20} className="text-foreground" />
          </button>
        </div>

        <div className="space-y-4">
          <FilterContent />
        </div>
      </div>
    </>
  );
}