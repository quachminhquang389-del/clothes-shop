"use client";

import { useWishlist } from "@/hooks/use-wishlist";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const wishlistItems = products.filter((product) =>
    wishlist.includes(product.id)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-headline tracking-tight">My Wishlist</h1>
        <p className="mt-2 text-muted-foreground">
          Your favorite styles, all in one place.
        </p>
      </header>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-20 text-center">
          <Heart className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <h3 className="text-2xl font-headline">Your Wishlist is Empty</h3>
          <p className="mt-2 text-muted-foreground max-w-md">
            Looks like you haven't added any items yet. Start exploring our
            collection to find something you love!
          </p>
          <Button asChild className="mt-6 bg-accent hover:bg-accent/90">
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
