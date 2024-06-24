"use client";

import React, { FormEvent } from "react";
import Swal from "sweetalert2";

type ButtonAddToWishlistProps = {
  productId: string;
};

export default function ButtonAddToWishlist({ productId }: ButtonAddToWishlistProps) {
  async function handleAddToWishlist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch("/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    const data = await response.json();

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: data.message,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: data.error,
      });
    }
  }

  return (
    <form onSubmit={handleAddToWishlist}>
      <input type="hidden" name="productId" value={productId} />
      <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700">
        Add to Wishlist
      </button>
    </form>
  );
}
