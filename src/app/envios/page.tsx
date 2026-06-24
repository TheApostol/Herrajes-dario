import type { Metadata } from "next";
import { whatsappLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Envíos",
  description: "Conocé las opciones de envío de Herrajes Darío: retiro en el local, envíos locales y a todo el país.",
};

export default function EnviosPage() {
  return (
    <div className="container-hd py-10">
      <h1 className="section-title">Envíos</h1>
      <p className="mt-2 max-w-2xl text-sm text-gray-600">
        Ofrecemos distintas opciones de entrega para que recibas tus productos
        de la forma más conveniente.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-black">Retiro en el local</h2>
          <p className="mt-2 text-sm text-gray-600">
            Retirá tu pedido sin cargo en Juan XXIII 2096, Burzaco, Provincia de
            Buenos Aires. Lunes a Viernes de 9 a 17 hs.
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-black">Envío local</h2>
          <p className="mt-2 text-sm text-gray-600">
            Coordinamos envíos en la zona de Burzaco y alrededores. Costo y
            tiempo de entrega a coordinar por WhatsApp.
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-black">Envío a todo el país</h2>
          <p className="mt-2 text-sm text-gray-600">
            Realizamos envíos a todo el país. Cotizá tu envío por WhatsApp con
            tu código postal y los productos que necesitás.
          </p>
        </div>
      </div>

      <div className="mt-10 rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h2 className="text-lg font-bold text-black">Próximamente</h2>
        <p className="mt-2 text-sm text-gray-600">
          Estamos trabajando en integrar envíos automáticos con OCA y Andreani
          para que puedas cotizar y seguir tu pedido directamente desde la web.
        </p>
      </div>

      <div className="mt-10 rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-black">¿Necesitás coordinar un envío?</h2>
        <a
          href={whatsappLink("Hola! Quiero coordinar un envío.")}
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
