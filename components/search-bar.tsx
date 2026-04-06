'use client';

import { useTransition, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const currentSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(currentSearch);

  useEffect(() => {
    setSearchTerm(currentSearch);
  }, [currentSearch]);

  // Debounced search logic
  useEffect(() => {
    // Skip if search term hasn't changed from current URL param
    if (searchTerm === currentSearch) return;

    const delayDebounceFn = setTimeout(() => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams);
        if (searchTerm) {
          params.set('search', searchTerm);
          params.delete('page');
        } else {
          params.delete('search');
        }
        router.push(`?${params.toString()}`);
      });
    }, 500); // 500ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, currentSearch, router, searchParams]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.delete('search');
      params.delete('page');
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="group relative w-full">
      <div className="relative flex h-10 w-full items-center overflow-hidden rounded-lg border border-border bg-secondary/20 transition-colors duration-300 focus-within:border-foreground/40 focus-within:bg-background">
        <Search
          size={18}
          className="absolute left-4 text-muted-foreground transition-colors duration-300 group-focus-within:text-foreground"
        />

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="h-full w-full bg-transparent pl-11 pr-12 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />

        {currentSearch && (
          <button
            onClick={handleClear}
            disabled={isPending}
            aria-label="Clear search"
            className="absolute right-3 flex h-6 w-6 items-center justify-center rounded-full bg-secondary/40 text-muted-foreground transition-all duration-300 hover:bg-foreground hover:text-background disabled:pointer-events-none disabled:opacity-50"
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  );
}