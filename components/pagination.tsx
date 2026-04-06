'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { useTransition } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const goToPage = (page: number) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set('page', page.toString());
      router.push(`?${params.toString()}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-2">
      {/* Previous Button */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1 || isPending}
        aria-label="Previous page"
        className="flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-transparent text-foreground transition-all duration-300 hover:border-foreground/40 hover:bg-secondary/10 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
      >
        <ChevronLeft size={18} strokeWidth={2.5} />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => {
        if (page === '...') {
          return (
            <div
              key={`ellipsis-${index}`}
              className="flex h-8 w-8 items-center justify-center text-muted-foreground cursor-pointer"
            >
              <MoreHorizontal size={16} />
            </div>
          );
        }

        const isCurrent = page === currentPage;

        return (
          <button
            key={index}
            onClick={() => typeof page === 'number' && goToPage(page)}
            disabled={isPending || isCurrent}
            aria-current={isCurrent ? 'page' : undefined}
            className={`flex h-8 min-w-10 items-center justify-center rounded-xl px-2 text-sm font-medium transition-all duration-300 disabled:pointer-events-none cursor-pointer ${isCurrent
              ? 'bg-primary text-primary-foreground'
              : 'border border-border bg-transparent text-foreground hover:border-foreground/40 hover:bg-secondary/10'
              }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages || isPending}
        aria-label="Next page"
        className="flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-transparent text-foreground transition-all duration-300 hover:border-foreground/40 hover:bg-secondary/10 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
      >
        <ChevronRight size={18} strokeWidth={2.5} />
      </button>
    </nav>
  );
}