import { NextResponse } from "next/server";
import { verifyToken } from "@/helpers/utils";
import { Wishlist } from "@/db/models/wishlist.model";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import { TWishlist } from "@/types/wishlist.types";

export async function POST(request: Request) {
  try {
    const { productId } = await request.json();

    const cookiesStore = cookies();

    const token = cookiesStore.get("Authorization")?.value?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Please sign up / login first to add this to your wishlist" }, { status: 401 });
    }

    const decodedToken = await verifyToken(token);

    const userId = decodedToken._id;

    const newWishlistItem: TWishlist = {
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await Wishlist.create(newWishlistItem);

    return NextResponse.json({ message: "Product added to wishlist" });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "An error occurred" }, { status: 400 });
  }
}
