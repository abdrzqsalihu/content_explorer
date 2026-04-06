'use client';

import Link from 'next/link';
import { Star } from 'lucide-react';
import { Product } from '@/types/product';


export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:scale-[1.01] hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="relative w-full overflow-hidden bg-secondary/50 aspect-square">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-4">
          <span className="truncate text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            {product.category}
          </span>
          <div className="flex shrink-0 items-center gap-1.5 text-muted-foreground">
            <Star size={12} className="fill-[#FBFB04]" />
            <span className="text-xs font-medium">{product.rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="mb-2 flex items-start justify-between gap-4">
          <h3 className="line-clamp-2 text-base font-semibold leading-tight text-foreground transition-colors group-hover:text-accent">
            {product.title}
          </h3>
          <span className="shrink-0 text-[13px] font-semibold text-foreground">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        <div className="mt-auto pt-4 border-t border-border">
          {product.stock !== undefined && (
            <div className="flex items-center gap-2">
              <span
                className={`h-1.5 w-1.5 rounded-full ${product.stock > 0 ? 'bg-foreground/80' : 'bg-muted-foreground/50'
                  }`}
              />
              <span className="text-xs font-medium text-muted-foreground">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}