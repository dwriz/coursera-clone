import ButtonLogin from "./ButtonLogin";
import ButtonLogout from "./ButtonLogout";
import Link from "next/link";
import ButtonRegister from "./ButtonRegister";
import ButtonWishlist from "./ButtonWishlist";
import { cookies } from "next/headers";

export default function Navbar() {
  const cookieStore = cookies();
  const authorization = cookieStore.get("Authorization");

  return (
    <div className="flex justify-between items-center py-4 px-20 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <img src="/coursera-logo.svg" alt="Coursera Logo" className="h-6" />
        </Link>
        <ul className="flex space-x-4">
          <Link href="/products" className="ml-4 bg-transparent border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-100">
            Explore
          </Link>
        </ul>
      </div>
      <div>
        {authorization?.value ? (
          <>
            <ButtonWishlist />
            <ButtonLogout />
          </>
        ) : (
          <>
            <ButtonLogin />
            <ButtonRegister />
          </>
        )}
      </div>
    </div>
  );
}
