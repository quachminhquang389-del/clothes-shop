"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Product } from "@/lib/products";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { categories, allSizes, allColors } from "@/lib/products";
import { X, PlusCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const productFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long."),
  description: z.string().min(10, "Description must be at least 10 characters long."),
  price: z.coerce.number().positive("Price must be a positive number."),
  image: z.string().url("Please enter a valid image URL."),
  category: z.enum(['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Accessories', 'Shoes']),
  sizes: z.array(z.string()).min(1, "Please select at least one size."),
  colors: z.array(z.string()).min(1, "Please select at least one color."),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  product?: Product;
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues: Partial<ProductFormValues> = product ? {
    ...product,
    price: Number(product.price)
  } : {
    name: "",
    description: "",
    price: 0,
    image: "",
    sizes: [],
    colors: [],
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
    mode: "onChange",
  });
  
  const { fields: sizeFields, append: appendSize, remove: removeSize } = useFieldArray({
    control: form.control,
    name: "sizes"
  });

  const { fields: colorFields, append: appendColor, remove: removeColor } = useFieldArray({
    control: form.control,
    name: "colors"
  });


  const onSubmit = async (data: ProductFormValues) => {
    setIsLoading(true);
    try {
      const url = product ? `/api/products/${product.id}` : "/api/products";
      const method = product ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${product ? 'update' : 'create'} product`);
      }

      toast({
        title: `Product ${product ? 'Updated' : 'Created'}`,
        description: `The product "${data.name}" has been successfully ${product ? 'updated' : 'created'}.`,
      });

      router.push("/admin/products");
      router.refresh();

    } catch (error) {
      toast({
        title: "Error",
        description: `Could not ${product ? 'update' : 'create'} product. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddSize = (size: string) => {
    if (!form.getValues('sizes').includes(size)) {
      appendSize(size);
    }
  };

  const handleAddColor = (color: string) => {
    if (!form.getValues('colors').includes(color)) {
      appendColor(color);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Classic Crewneck Tee" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the product..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                    <Input type="number" step="0.01" placeholder="e.g., 45.00" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
             <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {categories.map(c => <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
             />
        </div>
         <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
            control={form.control}
            name="sizes"
            render={() => (
                <FormItem>
                <FormLabel>Sizes</FormLabel>
                <div className="flex items-center gap-2">
                    <Select onValueChange={handleAddSize}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Add a size" />
                        </SelectTrigger>
                        <SelectContent>
                           {allSizes.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                 <div className="flex flex-wrap gap-2 pt-2">
                    {sizeFields.map((field, index) => (
                      <Badge key={field.id} variant="secondary" className="flex items-center gap-1">
                        {form.getValues(`sizes.${index}`)}
                        <button type="button" onClick={() => removeSize(index)} className="rounded-full hover:bg-muted-foreground/20">
                            <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                <FormMessage />
                </FormItem>
            )}
        />
        
        <FormField
            control={form.control}
            name="colors"
            render={() => (
                <FormItem>
                <FormLabel>Colors</FormLabel>
                 <div className="flex items-center gap-2">
                     <Select onValueChange={handleAddColor}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Add a color" />
                        </SelectTrigger>
                        <SelectContent>
                           {allColors.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                 <div className="flex flex-wrap gap-2 pt-2">
                    {colorFields.map((field, index) => (
                      <Badge key={field.id} variant="secondary" className="flex items-center gap-1">
                        {form.getValues(`colors.${index}`)}
                        <button type="button" onClick={() => removeColor(index)} className="rounded-full hover:bg-muted-foreground/20">
                            <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                <FormMessage />
                </FormItem>
            )}
        />


        <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Product"}
            </Button>
        </div>
      </form>
    </Form>
  );
}
