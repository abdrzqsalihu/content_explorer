# Checkit Content Explorer — Frontend Assessment

#### **Live Demo:** https://content-explorer-8ce.pages.dev/
---

A production-quality **Content Explorer web application** built for the Checkit Take-Home Technical Assessment.

This application fetches and displays product data from the **DummyJSON API**, providing a fast, searchable, and filterable interface built with modern **Next.js App Router architecture** and optimized for **Cloudflare Edge deployment**.

The focus of this project is not feature quantity, but strong engineering fundamentals:

* Clean architecture
* Performance optimization
* Thoughtful data fetching strategies
* Maintainable, scalable code

---

## Tech Stack

* **Framework:** Next.js 16 (App Router)
* **Runtime:** Cloudflare Workers (Edge)
* **Language:** TypeScript (Strict Mode)
* **Styling:** Tailwind CSS 4
* **Data Fetching:** Native `fetch` with Next.js caching
* **Testing:** Jest + React Testing Library

---

## Project Overview

The application is a **Content Explorer** that allows users to:

* Browse a paginated list of products
* Search and filter content dynamically
* View detailed product information
* Navigate seamlessly with URL-driven state

All core functionality is built with **server-first rendering** and optimized for performance and scalability.

---

## Features Implemented

### 1 — Listing Page

* Server-side rendered (SSR/ISR) product listing
* Responsive grid layout:

  * Mobile: 1 column
  * Tablet: 2 columns
  * Desktop: 3–4 columns
* Pagination (URL-driven)
* Product cards with:

  * Title
  * Image (with fallback)
  * Metadata (price, category, rating)

---

### 2 — Detail Page

* Dynamic route: `/product/[id]`
* Server Component data fetching
* SEO metadata (`title`, `description`, `og:image`)
* Breadcrumb navigation back to listing

---

### 3 — Search & Filtering

* URL-driven state via `useSearchParams`
* Debounced search input (500ms)
* Category filtering via API
* Fully shareable URLs with preserved state

---

### 4 — Loading, Error & Empty States

* Skeleton loaders via `loading.tsx`
* Error boundaries via `error.tsx`
* Dedicated empty state UI for no results

---

### 5 — Deployment

* Deployed on **Cloudflare Workers (Edge runtime)**
* Optimized using `@cloudflare/next-on-pages` (OpenNext-compatible)

---

## Architecture Overview

```
/app
  /product/[id]
/components
/lib
  /api
  /utils
/types
/hooks
```

### Key Design Decisions

#### Edge-first architecture

All routes use:

```ts
export const runtime = 'edge';
```

This ensures low-latency global responses on Cloudflare.

---

#### URL-driven state

Search, filters, and pagination are encoded in the URL:

* Enables shareable links
* Preserves browser navigation behavior
* Avoids hidden client state

---

#### Server-first data fetching

* Data is fetched in Server Components
* Minimizes client-side JavaScript
* Improves SEO and LCP performance

---

#### Clean API abstraction

* All API logic lives in `/lib/api`
* Components never call `fetch()` directly
* Improves maintainability and testability

---

#### Component architecture

Reusable, focused components:

* `ProductGrid`
* `ProductCard`
* `FilterSidebar`
* `ProductGallery`

---

## Performance Optimizations

### 1. Edge Runtime

Deployed globally via Cloudflare Workers for reduced latency.

---

### 2. React 18 Streaming (Suspense)

```tsx
<Suspense fallback={<ProductsSkeleton />}>
  <ProductGrid />
</Suspense>
```

* Immediate layout rendering
* Progressive data streaming
* Improved perceived performance

---

### 3. Caching Strategy

* Product listing:

```ts
cache: 'no-store'
```

* Product details & categories:

```ts
cache: 'force-cache'
```

**Why:**

* Listings stay fresh for search/filter interactions
* Static data benefits from caching

---

### 4. Font Optimization

* Implemented via `next/font`
* Reduces layout shift (CLS)
* Improves loading performance

---

### 5. Debounced Search

* 500ms debounce
* Prevents excessive API calls
* Improves responsiveness

---

### 6. Edge Cache Headers

Implemented via middleware:

```
Cache-Control: public, max-age=60, s-maxage=60
```

---

## Bonus Tasks Attempted

### 1 — Edge Caching (Cloudflare)

* Implemented caching headers via middleware
* Compatible with Cloudflare Edge caching
* Can be verified in DevTools (Network → Headers)

---

### 2 — React 18 Streaming with Suspense

* Server-side streaming implemented
* Skeleton UI used as fallback
* No client-side loading states for primary data

---

### 3 — Accessibility

* Lighthouse accessibility score ≥ 95
* Improvements include:

  * Semantic HTML
  * ARIA labels
  * Keyboard accessibility

---

## Trade-offs & Decisions

* Used **native `<img>` with lazy loading** instead of `next/image` to avoid remote loader complexity in Edge runtime
* Used **URL state instead of global state** for better UX and shareability
* Chose **pagination over infinite scroll** for clarity and simplicity

---

## Known Limitations

* No advanced edge caching layer (KV / Cache API) implemented
* Limited test coverage (focused on core UI components)
* Category fetching happens client-side (could be moved server-side)

---

## Testing

* Implemented using:

  * Jest
  * React Testing Library

* Focused on:

  * Component rendering
  * UI states

---

## Setup Instructions

```bash
# Clone repository
git clone https://github.com/abdrzqsalihu/content_explorer.git
cd content_explorer

# Install dependencies
pnpm install

# Setup environment
cp .env.example .env.local

# Run development server
pnpm dev
```

---

## Environment Variables

```
NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com
```

---

## Submission

* **Live URL:** https://content-explorer-8ce.pages.dev/

### What I would do next

With an additional 2 hours, I would:

* Implement full **Cloudflare edge caching with cache status headers (HIT/MISS)**
* Add **integration tests for search and filter URL synchronization**
* Introduce **route-level code splitting for heavy interactive components**

---

## Notes

* Built with production-grade practices and scalability in mind
* Focused on performance, clean architecture, and maintainability
* AI tools were used as assistants, not for full code generation
