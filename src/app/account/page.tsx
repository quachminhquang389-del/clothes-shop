import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-20 text-center">
        <User className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h1 className="text-3xl font-headline tracking-tight">My Account</h1>
        <p className="mt-2 text-muted-foreground max-w-md">
          This page would allow users to create an account, manage their
          profile, and view their order history and wishlist.
        </p>
        <Button asChild className="mt-6 bg-accent hover:bg-accent/90">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
