import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shirt, LayoutDashboard } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-4 md:p-8">
       <div className="flex items-center gap-2 mb-8">
          <LayoutDashboard className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-headline">Admin Dashboard</h1>
        </div>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Welcome, Admin!</CardTitle>
            <CardDescription>
              This is your central hub for managing the StyleGenius application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>From here, you can manage products, view analytics (coming soon!), and configure site settings.</p>
          </CardContent>
        </Card>
        
        <Card className="flex flex-col md:flex-row items-center justify-between p-6">
            <div className='flex items-center gap-4'>
                <div className="bg-primary/10 p-4 rounded-lg">
                    <Shirt className="h-8 w-8 text-primary" />
                </div>
                <div>
                    <h3 className="text-xl font-headline">Product Management</h3>
                    <p className="text-muted-foreground">Add, edit, and delete products in your store.</p>
                </div>
            </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link href="/admin/products">Manage Products</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
