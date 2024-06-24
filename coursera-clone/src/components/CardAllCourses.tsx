import { TProduct } from "@/types/product.types";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";

export type CardAllCoursesProps = {
  product: TProduct;
};

export default function CardAllCourses({ product }: CardAllCoursesProps) {
  const router = useRouter();
  
  async function handleAddToWishlist(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    Swal.fire({
      title: "Adding to wishlist...",
      text: "Please wait while we add the product to your wishlist",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product._id }),
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
          text: data.error || "Please sign up / login first to add this to your wishlist",
        }).then(() => {
          router.push("/login");
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Unexpected Error",
        text: "An unexpected error occurred",
      });
    }
  }

  return (
    <div className="rounded-lg border border-gray-200">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="bg-white rounded-lg h-80 flex flex-col justify-between">
          <div className="p-3 rounded-lg overflow-hidden">
            <img src={product.thumbnail} className="w-full h-30 object-cover rounded-lg" alt={product.name} />
          </div>
          <div className="flex-grow px-3">
            <h3 className="text-sm font-bold mb-2">{product.name}</h3>
            <p className="text-xs font-extralight text-gray-600 mb-4">{product.excerpt}</p>
          </div>
          <div className="text-center mb-3">
            <button onClick={handleAddToWishlist} className="bg-blue-600 text-white text-xs rounded px-3 py-1 hover:bg-blue-700">
              Add to Wishlist
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
