import { Product } from "@/db/models/product.model";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const search = searchParams.get("search") || "";

    const page = parseInt(searchParams.get("page") || "1", 10);

    const limit = parseInt(searchParams.get("limit") || "6", 10);

    const products = await Product.findAll(search, page, limit);

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);

    return NextResponse.error();
  }
}
