import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import { whatsappLink } from "@/lib/utils";

export const revalidate = 300;

export default async function HomePage() {
  const [categories, brands, featuredProducts] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
    prisma.product.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
      take: 8,
      include: { brand: true },
    }),
  ]);

  return (
    <div>
      <section className="border-b border-gray-200 bg-black text-white">
        <div className="container-hd grid items-center gap-8 py-16 sm:py-24 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
              Más de 20 años de experiencia
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Herrajes y accesorios para muebles de calidad
            </h1>
            <p className="mt-5 max-w-md text-base text-gray-300">
              Soluciones para carpinteros, fabricantes de muebles, arquitectos y
              diseñadores. Amplio stock, asesoramiento personalizado y primeras
              marcas.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/productos" className="btn-primary bg-white text-black hover:bg-brand-green hover:text-white">
                Ver catálogo
              </Link>
              <a
                href={whatsappLink("Hola! Quiero más información sobre sus productos.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-white px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
              >
                Consultar por WhatsApp
              </a>
            </div>
          </div>
          <div className="hidden justify-center lg:flex">
            <Image src="/logo.png" alt="Herrajes Darío" width={320} height={320} priority className="invert" />
          </div>
        </div>
      </section>

      <section className="container-hd py-12 sm:py-16">
        <h2 className="section-title">Categorías</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categoria/${cat.slug}`}
              className="flex h-28 flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-4 text-center transition hover:border-brand-green hover:bg-white"
            >
              <span className="text-sm font-semibold text-black">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="container-hd py-12 sm:py-16">
          <div className="flex items-center justify-between">
            <h2 className="section-title">Productos destacados</h2>
            <Link href="/productos" className="text-sm font-semibold text-brand-green hover:underline">
              Ver todos →
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={{
                  id: p.id,
                  slug: p.slug,
                  name: p.name,
                  price: Number(p.price),
                  salePrice: p.salePrice ? Number(p.salePrice) : null,
                  imageUrl: p.imageUrl,
                  brand: p.brand,
                  stock: p.stock,
                }}
              />
            ))}
          </div>
        </section>
      )}

      <section className="border-y border-gray-200 bg-gray-50 py-12">
        <div className="container-hd">
          <h2 className="section-title">Nuestras marcas</h2>
          <div className="mt-6 flex flex-wrap gap-4">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                href={`/marcas#${brand.slug}`}
                className="rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-black transition hover:border-black"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-hd grid gap-6 py-12 sm:py-16 lg:grid-cols-3">
        <div className="rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold">Medios de pago</h3>
          <p className="mt-2 text-sm text-gray-600">
            Mercado Pago, transferencia bancaria y efectivo en el local.
          </p>
          <Link href="/medios-de-pago" className="mt-3 inline-block text-sm font-semibold text-brand-green hover:underline">
            Ver más →
          </Link>
        </div>
        <div className="rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold">Envíos</h3>
          <p className="mt-2 text-sm text-gray-600">
            Retiro en el local, envíos locales y a todo el país coordinados por WhatsApp.
          </p>
          <Link href="/envios" className="mt-3 inline-block text-sm font-semibold text-brand-green hover:underline">
            Ver más →
          </Link>
        </div>
        <div className="rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold">Visitanos</h3>
          <p className="mt-2 text-sm text-gray-600">
            Juan XXIII 2096, Burzaco, Provincia de Buenos Aires.
            <br />
            Lunes a Viernes de 9 a 17 hs.
          </p>
          <Link href="/contacto" className="mt-3 inline-block text-sm font-semibold text-brand-green hover:underline">
            Cómo llegar →
          </Link>
        </div>
      </section>
    </div>
  );
}
