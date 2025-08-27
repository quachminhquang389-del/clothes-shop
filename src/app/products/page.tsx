"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { ProductFilters } from "@/components/product-filters";
import { products, allSizes, allColors } from "@/lib/products";
import type { Product } from "@/lib/products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

function ProductGrid() {
  const searchParams = useSearchParams();

  const [sortOption, setSortOption] = useState("featured");
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "all",
    sizes: [] as string[],
    colors: [] as string[],
    priceRange: [0, 500] as [number, number],
  });

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const categoryMatch =
        filters.category === "all" || product.category === filters.category;
      const sizeMatch =
        filters.sizes.length === 0 ||
        filters.sizes.some((size) => product.sizes.includes(size));
      const colorMatch =
        filters.colors.length === 0 ||
        filters.colors.some((color) => product.colors.includes(color));
      const priceMatch =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];
      return categoryMatch && sizeMatch && colorMatch && priceMatch;
    });

    switch (sortOption) {
      case "price-asc":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-desc":
        return filtered.sort((a, b) => b.price - a.price);
      case "name-asc":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered;
    }
  }, [filters, sortOption]);

  const handleClearFilters = () => {
    setFilters({
      category: "all",
      sizes: [],
      colors: [],
      priceRange: [0, 500],
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-headline tracking-tight">Our Collection</h1>
        <p className="mt-2 text-muted-foreground">
          Browse our curated selection of high-quality apparel and accessories.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <ProductFilters
            sizes={allSizes}
            colors={allColors}
            filters={filters}
            setFilters={setFilters}
            onClear={handleClearFilters}
          />
        </aside>

        <main className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredAndSortedProducts.length} of {products.length} products
            </p>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Alphabetically, A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredAndSortedProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-20 text-center">
              <h3 className="text-2xl font-headline">No Products Found</h3>
              <p className="mt-2 text-muted-foreground">
                Try adjusting your filters to find what you're looking for.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-4 text-primary underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-4 w-1/2 mt-4" />
      </header>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <Skeleton className="h-[600px] w-full" />
        </aside>
        <main className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-10 w-[180px]" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i}>
                <Skeleton className="h-80 w-full" />
                <Skeleton className="h-6 w-3/4 mt-4" />
                <Skeleton className="h-5 w-1/4 mt-2" />
                <Skeleton className="h-10 w-full mt-4" />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ProductGrid />
    </Suspense>
  );
}
