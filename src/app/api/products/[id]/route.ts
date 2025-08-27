import { firestoreAdmin } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

const productsCollection = firestoreAdmin.collection("products");

// Get a single product
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;
    const productDoc = await productsCollection.doc(productId).get();

    if (!productDoc.exists) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ id: productDoc.id, ...productDoc.data() });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// Update a product
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;
    const productData = await req.json();

    await productsCollection.doc(productId).update(productData);

    return NextResponse.json({
      id: productId,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// Delete a product
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;
    await productsCollection.doc(productId).delete();

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
