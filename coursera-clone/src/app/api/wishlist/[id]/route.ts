import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDatabase } from "@/db/config";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const client = await getDatabase();

    const db = client.db("p3-gc02-ecommerce");

    const result = await db
      .collection("wishlist")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Wishlist item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Wishlist item removed successfully" });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to remove wishlist item" },
      { status: 500 }
    );
  }
}
