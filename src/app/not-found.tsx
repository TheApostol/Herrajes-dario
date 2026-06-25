import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <Image src="/logo.png" alt="Herrajes Darío" width={64} height={64} />
      <h1 className="mt-6 text-4xl font-bold text-black">404</h1>
      <p className="mt-2 text-lg font-medium text-gray-700">No encontramos esta página.</p>
      <p className="mt-1 max-w-sm text-sm text-gray-500">
        Puede que el enlace esté roto o que el producto ya no esté disponible.
      </p>
      <Link href="/" className="btn-primary mt-6">
        Volver al inicio
      </Link>
    </div>
  );
}
