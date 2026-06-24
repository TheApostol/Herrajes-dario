import Link from "next/link";

export default function CheckoutPendingPage() {
  return (
    <div className="container-hd flex flex-col items-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold text-white">
        ⏳
      </div>
      <h1 className="mt-6 section-title">Pago pendiente</h1>
      <p className="mt-3 max-w-md text-sm text-gray-600">
        Tu pago está siendo procesado. Te notificaremos cuando se confirme.
      </p>
      <Link href="/productos" className="btn-primary mt-8">
        Volver al catálogo
      </Link>
    </div>
  );
}
