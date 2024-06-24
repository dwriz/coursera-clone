"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Wishlist } from "@/db/models/wishlist.model";
import { verifyToken } from "@/helpers/utils";

export async function fetchWishlistItems() {
  const cookiesStore = cookies();

  const token = cookiesStore.get("Authorization")?.value?.split(" ")[1];

  if (!token) {
    redirect("/products");
  }

  const decodedToken = await verifyToken(token);

  const userId = decodedToken._id;

  const wishlistItems = await Wishlist.findByUserId(userId);

  return wishlistItems;
}

export async function handleRemoveItem(wishlistId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist/${wishlistId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.error || "Failed to remove item");
  }

  return await response.json();
}

export async function handleLogout() {
  const cookiesStore = cookies();

  cookiesStore.delete("Authorization");
  
  return { message: "Logged out successfully" };
}
