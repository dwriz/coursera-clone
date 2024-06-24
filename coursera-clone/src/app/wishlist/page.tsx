"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CardWishlist from "@/components/CardWishlist";
import { TWishlist } from "@/types/wishlist.types";
import { fetchWishlistItems, handleRemoveItem } from "@/actions";
import { useRouter } from "next/navigation";

export default function WishlistPage() {
  const [items, setItems] = useState<TWishlist[]>([]);

  const router = useRouter();

  useEffect(() => {
    fetchWishlist();
  }, []);

  async function fetchWishlist() {
    Swal.fire({
      title: "Loading wishlist...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const wishlistItems = await fetchWishlistItems();

      setItems(wishlistItems);

      Swal.close();
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error instanceof Error ? error.message : "An unexpected error occurred",
      }).then(() => {
        router.push("/products");
      });
    }
  };

  async function handleRemove(id: string) {
    Swal.fire({
      title: "Removing from wishlist...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const data = await handleRemoveItem(id);

      Swal.fire({
        icon: "success",
        title: "Removed",
        text: data.message,
      }).then(() => {
        fetchWishlist();
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error instanceof Error ? error.message : "An unexpected error occurred",
      });
    }
  };

  return (
    <div className="container mx-auto px-20 py-10">
      <div className="max-w-2xl mx-auto border border-gray-300 rounded-lg p-10">
        <h1 className="text-4xl font-bold mb-5 text-center">Your Wishlist</h1>
        <div className="flex justify-center">
          <div className="w-full">
            {items.length > 0 ? (
              items.map((item) => <CardWishlist key={item._id?.toString()} item={item} onRemove={handleRemove} />)
            ) : (
              <p className="text-center text-gray-500">Your wishlist is empty</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
