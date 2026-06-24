import type { Metadata } from "next";
import { whatsappLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Medios de pago",
  description: "Conocé los medios de pago disponibles en Herrajes Darío: Mercado Pago, transferencia bancaria y efectivo.",
};

export default function MediosDePagoPage() {
  return (
    <div className="container-hd py-10">
      <h1 className="section-title">Medios de pago</h1>
      <p className="mt-2 max-w-2xl text-sm text-gray-600">
        Elegí la forma de pago que más te convenga. Todas nuestras compras son
        seguras y respaldadas.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-black">Mercado Pago</h2>
          <p className="mt-2 text-sm text-gray-600">
            Pagá online de forma segura con tarjeta de crédito, débito o dinero
            en cuenta a través de Mercado Pago. Aceptamos todas las tarjetas y
            cuotas según promociones vigentes.
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-black">Transferencia bancaria</h2>
          <p className="mt-2 text-sm text-gray-600">
            CBU: A completar
            <br />
            Alias: A completar
            <br />
            Titular: Herrajes Darío
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Enviá el comprobante por WhatsApp para confirmar tu pedido.
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-black">Efectivo</h2>
          <p className="mt-2 text-sm text-gray-600">
            Pagá en efectivo al retirar tu pedido en nuestro local de Burzaco.
          </p>
        </div>
      </div>

      <div className="mt-10 rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h2 className="text-lg font-bold text-black">¿Tenés dudas sobre tu pago?</h2>
        <p className="mt-2 text-sm text-gray-600">
          Escribinos por WhatsApp y te ayudamos a confirmar tu pedido.
        </p>
        <a
          href={whatsappLink("Hola! Tengo una consulta sobre medios de pago.")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-4 inline-flex"
        >
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  );
}
