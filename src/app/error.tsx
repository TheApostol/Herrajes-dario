"use client";

import Image from "next/image";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <Image src="/logo.png" alt="Herrajes Darío" width={64} height={64} />
      <h1 className="mt-6 text-2xl font-bold text-black">Algo salió mal</h1>
      <p className="mt-2 max-w-sm text-sm text-gray-500">
        Ocurrió un error inesperado. Probá de nuevo en unos segundos.
      </p>
      <button onClick={() => reset()} className="btn-primary mt-6">
        Reintentar
      </button>
    </div>
  );
}
