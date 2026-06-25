import type { Metadata } from "next";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import { BRAND_LOGOS } from "@/lib/brandLogos";

export const metadata: Metadata = {
  title: "Marcas",
  description: "Trabajamos con primeras marcas: Grupo Euro, BRONZEN, HAFELE y FARK.",
};

export default async function MarcasPage() {
  const brands = await prisma.brand.findMany({
    orderBy: { name: "asc" },
    include: {
      products: {
        where: { active: true },
        take: 4,
        include: { brand: true },
      },
    },
  });

  return (
    <div className="container-hd py-10">
      <h1 className="section-title">Nuestras marcas</h1>
      <p className="mt-2 max-w-2xl text-sm text-gray-600">
        Trabajamos con primeras marcas del mercado para ofrecerte calidad y
        durabilidad en cada proyecto.
      </p>

      <div className="mt-10 space-y-14">
        {brands.map((brand) => (
          <section key={brand.id} id={brand.slug}>
            {BRAND_LOGOS[brand.slug] ? (
              <div className="relative h-12 w-48">
                <Image
                  src={BRAND_LOGOS[brand.slug]}
                  alt={brand.name}
                  fill
                  className="object-contain object-left"
                />
              </div>
            ) : (
              <h2 className="text-xl font-bold text-black">{brand.name}</h2>
            )}
            {brand.products.length > 0 ? (
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {brand.products.map((p) => (
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
            ) : (
              <p className="mt-3 text-sm text-gray-500">Próximamente productos de esta marca.</p>
            )}
            <a
              href={`/productos?marca=${brand.slug}`}
              className="mt-4 inline-block text-sm font-semibold text-brand-green hover:underline"
            >
              Ver todos los productos de {brand.name} →
            </a>
          </section>
        ))}
      </div>
    </div>
  );
}
