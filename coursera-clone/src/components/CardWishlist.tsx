"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { TWishlist } from "@/types/wishlist.types";
import { TProduct } from "@/types/product.types";

export type CardWishlistProps = {
  item: TWishlist;
  onRemove: (id: string) => void;
};

export default function CardWishlist({ item, onRemove }: CardWishlistProps) {
  const [product, setProduct] = useState<TProduct | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      Swal.fire({
        title: "Loading product details...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const response = await fetch(`/api/products/${item.productId}`);
        if (response.ok) {
          const product: TProduct = await response.json();

          setProduct(product);

          Swal.close();
        } else {
          throw new Error("Failed to fetch product details");
        }
      } catch (error) {
        let errorMessage = "An unexpected error occurred";

        if (error instanceof Error) {
          errorMessage = error.message;
        }

        console.error(error);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
        });
      }
    }

    fetchProduct();
  }, [item.productId]);

  if (!product) {
    return <p>Loading product detail...</p>;
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-500">{product.excerpt}</p>
        </div>
        <button onClick={() => onRemove(item._id?.toString()!)} className="bg-red-600 text-white rounded px-3 py-1 hover:bg-red-700 ml-2">
          Remove
        </button>
      </div>
    </div>
  );
}
