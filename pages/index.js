import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col bg-white relative overflow-hidden">
      <Link
        className="flex items-center justify-center text-center mt-6 bg-violet-100 px-12 py-4 hover:bg-violet-200"
        href="/profile"
      >
        Existing Customer
      </Link>
      <Link
        className="flex items-center justify-center text-center mt-6 bg-violet-100 px-12 py-4 hover:bg-violet-200"
        href="/registration"
      >
        New Customer
      </Link>
    </div>
  );
}
