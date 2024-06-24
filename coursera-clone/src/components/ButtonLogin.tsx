import Link from "next/link";

export default function ButtonLogin() {
  return (
    <>
      <Link href="/login" className="ml-4 text-blue-600 font-light hover:underline">
        Log In
      </Link>
    </>
  );
}
