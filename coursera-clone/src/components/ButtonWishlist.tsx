import Link from "next/link";

export default function ButtonWishlist() {
  return (
    <>
      <Link href="/wishlist">
        <button className="ml-4 bg-transparent border border-blue-600 text-blue-600 font-bold px-4 py-2 rounded hover:bg-blue-100">Wishlist</button>
      </Link>
    </>
  );
}
