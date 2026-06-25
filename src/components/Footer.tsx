import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t-2 border-brand-green bg-black text-white">
      <div className="container-hd grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-lg font-bold">Herrajes Darío</h3>
          <p className="mt-3 text-sm text-gray-300">
            Más de 20 años de experiencia en herrajes y accesorios para muebles.
            Soluciones para carpinteros, fabricantes, arquitectos y diseñadores.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Navegación
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-300">
            <li><Link href="/productos" className="hover:text-white">Productos</Link></li>
            <li><Link href="/marcas" className="hover:text-white">Marcas</Link></li>
            <li><Link href="/medios-de-pago" className="hover:text-white">Medios de pago</Link></li>
            <li><Link href="/envios" className="hover:text-white">Envíos</Link></li>
            <li><Link href="/contacto" className="hover:text-white">Contacto</Link></li>
            <li><Link href="/politicas" className="hover:text-white">Política de ventas y garantías</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Contacto
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-300">
            <li>Juan XXIII 2096, Burzaco, Buenos Aires</li>
            <li>Tel / WhatsApp: 11 3350-4178</li>
            <li>Lunes a Viernes de 9 a 17 hs</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Seguinos
          </h4>
          <a
            href="https://instagram.com/herrajesdario"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white"
          >
            @herrajesdario
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Herrajes Darío. Todos los derechos reservados.
      </div>
    </footer>
  );
}
