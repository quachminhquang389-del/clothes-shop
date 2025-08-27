import { firestoreAdmin } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";
import { z } from 'zod';

const productsCollection = firestoreAdmin.collection("products");

const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be a positive number"),
  image: z.string().url("Image must be a valid URL"),
  category: z.enum(['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Accessories', 'Shoes']),
  sizes: z.array(z.string()).min(1, "At least one size is required"),
  colors: z.array(z.string()).min(1, "At least one color is required"),
});

// Get all products
export async function GET() {
  try {
    const snapshot = await productsCollection.get();
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// Create a new product
export async function POST(req: Request) {
  try {
    const productData = await req.json();
    
    const validation = ProductSchema.safeParse(productData);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    const docRef = await productsCollection.add(validation.data);
    return NextResponse.json({ id: docRef.id, ...validation.data }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
