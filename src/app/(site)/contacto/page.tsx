import type { Metadata } from "next";
import { whatsappLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contactate con Herrajes Darío. Juan XXIII 2096, Burzaco, Provincia de Buenos Aires.",
};

export default function ContactoPage() {
  return (
    <div className="container-hd py-10">
      <h1 className="section-title">Contacto</h1>
      <p className="mt-2 max-w-2xl text-sm text-gray-600">
        Estamos para ayudarte. Escribinos o visitanos en nuestro local.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500">Dirección</h2>
            <p className="mt-1 text-base text-black">Juan XXIII 2096, Burzaco, Provincia de Buenos Aires</p>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500">Teléfono / WhatsApp</h2>
            <p className="mt-1 text-base text-black">11 3350-4178</p>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500">Horarios</h2>
            <p className="mt-1 text-base text-black">Lunes a Viernes de 9 a 17 hs</p>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500">Instagram</h2>
            <a
              href="https://instagram.com/herrajesdario"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-base text-brand-green hover:underline"
            >
              @herrajesdario
            </a>
          </div>
          <a
            href={whatsappLink("Hola! Quiero hacer una consulta.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
          >
            Escribinos por WhatsApp
          </a>
        </div>

        <div className="h-80 w-full overflow-hidden rounded-lg border border-gray-200 lg:h-full">
          <iframe
            title="Ubicación Herrajes Darío"
            src="https://www.google.com/maps?q=Juan+XXIII+2096,+Burzaco,+Buenos+Aires&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
