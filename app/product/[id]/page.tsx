export const runtime = 'edge';

import { ProductGallery } from '@/components/ProductGallery';
import { getProductById } from '@/lib/api/products';
import { Star, ArrowLeft, Package, Truck } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';


export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(Number(id));

  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const product = await getProductById(Number(id));

    return (
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="border-b border-border bg-background">
          <div className="mx-auto max-w-7xl px-5 py-6 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft size={16} />
              Back to Products
            </Link>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">

            {/* Image Gallery */}
            <ProductGallery product={product} />

            {/* Product Info */}
            <div className="flex flex-col space-y-10">
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Star size={14} className="fill-[#FBFB04]" />
                    <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl lg:leading-[1.1]">
                    {product.title}
                  </h1>
                  <p className="text-xl font-medium text-foreground">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>

              <p className="text-base leading-relaxed text-muted-foreground max-w-prose">
                {product.description}
              </p>

              <div className="flex flex-col divide-y divide-border border-y border-border py-1">
                {product.brand && (
                  <div className="flex items-center justify-between py-3.5">
                    <span className="text-sm text-muted-foreground">Brand</span>
                    <span className="text-sm font-medium text-foreground">{product.brand}</span>
                  </div>
                )}
                {product.sku && (
                  <div className="flex items-center justify-between py-3.5">
                    <span className="text-sm text-muted-foreground">SKU</span>
                    <span className="text-sm font-medium text-foreground">{product.sku}</span>
                  </div>
                )}
                {product.stock !== undefined && (
                  <div className="flex items-center justify-between py-3.5">
                    <span className="text-sm text-muted-foreground">Availability</span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${product.stock > 0 ? 'bg-foreground' : 'bg-muted-foreground'
                          }`}
                      />
                      <span className="text-sm font-medium text-foreground">
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <button
                  className="w-full rounded-xl bg-primary py-3.5 text-base font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-5 cursor-pointer"
                  disabled={product.stock === 0}
                >
                  {product.stock !== undefined && product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button className="w-full rounded-xl border border-border bg-transparent py-3.5 text-base font-semibold text-foreground transition-colors duration-300 hover:border-foreground/40 hover:bg-secondary/10 cursor-pointer">
                  Save to Wishlist
                </button>
              </div>

              <div className="space-y-5 pt-2">
                <div className="flex items-start gap-4">
                  <Package size={20} className="mt-0.5 shrink-0 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">Free Standard Shipping</p>
                    <p className="text-sm text-muted-foreground">
                      Available on all orders over $50.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Truck size={20} className="mt-0.5 shrink-0 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">Express Delivery Option</p>
                    <p className="text-sm text-muted-foreground">
                      Get it in 2-3 business days at checkout.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    notFound();
  }
}