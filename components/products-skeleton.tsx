export function ProductsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="h-4 w-48 rounded bg-secondary animate-pulse" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="h-full rounded-lg border border-border bg-card overflow-hidden"
          >
            {/* Image skeleton */}
            <div className="h-48 w-full bg-secondary animate-pulse" />

            {/* Content skeleton */}
            <div className="flex flex-col gap-3 p-4">
              <div className="flex flex-col gap-1">
                {/* Category */}
                <div className="h-3 w-20 rounded bg-secondary animate-pulse" />
                {/* Title */}
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-secondary animate-pulse" />
                  <div className="h-4 w-2/3 rounded bg-secondary animate-pulse" />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <div className="h-3 w-full rounded bg-secondary animate-pulse" />
                <div className="h-3 w-4/5 rounded bg-secondary animate-pulse" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <div
                      key={j}
                      className="h-3 w-3 rounded-full bg-secondary animate-pulse"
                    />
                  ))}
                </div>
                <div className="h-3 w-6 rounded bg-secondary animate-pulse" />
              </div>

              {/* Stock Status */}
              <div className="h-3 w-24 rounded bg-secondary animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
