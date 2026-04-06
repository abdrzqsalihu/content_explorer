'use client';

import { useState } from 'react';
import { Product } from '@/types/product';

interface ProductGalleryProps {
    product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
    const allImages = product.images && product.images.length > 0
        ? product.images
        : [product.thumbnail];

    const [activeImage, setActiveImage] = useState(allImages[0]);

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="group relative w-full overflow-hidden rounded-2xl border border-border bg-secondary/20 aspect-square">
                <img
                    src={activeImage}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                    {allImages.slice(0, 4).map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveImage(image)}
                            className={`relative aspect-square cursor-pointer overflow-hidden rounded-xl border transition-all duration-300 hover:border-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${activeImage === image
                                    ? 'border-foreground/60 opacity-100 ring-2 ring-foreground/10'
                                    : 'border-border bg-secondary/20 opacity-60 hover:opacity-100'
                                }`}
                        >
                            <img
                                src={image}
                                alt={`${product.title} gallery thumbnail ${index + 1}`}
                                className="h-full w-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}