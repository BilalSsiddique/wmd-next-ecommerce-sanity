import Link from "next/link";
import { TbError404 } from "react-icons/tb";

export default function NotFound() {
  return (
    <section className="flex h-full shadow-inner rounded-md items-center bg-gray-100 text-black sm:px-16 sm:py-4">
      <div className="container mx-auto my-8 flex flex-col items-center justify-center space-y-8 px-5 text-center sm:max-w-md">
        <TbError404 size={45}/>
        <p className="text-3xl">Sorry, we couldn&#39;t find this page.</p>

        <Link
          rel="noopener noreferrer"
          href="/"
          className="rounded bg-[#212121] px-8 py-3 font-semibold text-white"
        >
          Back to homepage
        </Link>
      </div>
    </section>
  );
}
