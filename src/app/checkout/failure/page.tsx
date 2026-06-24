import Link from "next/link";
import { whatsappLink } from "@/lib/utils";

export default function CheckoutFailurePage() {
  return (
    <div className="container-hd flex flex-col items-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white">
        ✕
      </div>
      <h1 className="mt-6 section-title">El pago no pudo procesarse</h1>
      <p className="mt-3 max-w-md text-sm text-gray-600">
        Ocurrió un problema al procesar tu pago. Podés intentar nuevamente o
        contactarnos por WhatsApp.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/checkout" className="btn-primary">
          Intentar nuevamente
        </Link>
        <a
          href={whatsappLink("Hola! Tuve un problema al pagar mi pedido.")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          Contactar por WhatsApp
        </a>
      </div>
    </div>
  );
}
