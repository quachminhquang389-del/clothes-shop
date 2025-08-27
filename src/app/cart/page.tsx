import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-20 text-center">
        <ShoppingCart className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h1 className="text-3xl font-headline tracking-tight">Shopping Cart</h1>
        <p className="mt-2 text-muted-foreground max-w-md">
          This is where the shopping cart from a third-party e-commerce
          application would be integrated.
        </p>
        <Button asChild className="mt-6 bg-accent hover:bg-accent/90">
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
