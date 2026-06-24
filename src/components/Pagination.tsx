import Link from "next/link";

export default function Pagination({
  currentPage,
  totalPages,
  buildHref,
}: {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-10 flex items-center justify-center gap-2">
      {pages.map((page) => (
        <Link
          key={page}
          href={buildHref(page)}
          className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium ${
            page === currentPage
              ? "bg-black text-white"
              : "border border-gray-300 text-gray-700 hover:border-black"
          }`}
        >
          {page}
        </Link>
      ))}
    </nav>
  );
}
