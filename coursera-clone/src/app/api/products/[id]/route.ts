import { NextResponse } from "next/server";
import { Product } from "@/db/models/product.model";
import { ObjectId } from "mongodb";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;
    
    if (!ObjectId.isValid(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(JSON.parse(JSON.stringify(product)));
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "An error occurred" }, { status: 400 });
  }
}
