import type { Metadata } from "next";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import Pagination from "@/components/Pagination";

export const metadata: Metadata = {
  title: "Catálogo de productos",
  description: "Explorá el catálogo completo de herrajes y accesorios para muebles de Herrajes Darío.",
};

const PAGE_SIZE = 24;

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const page = Math.max(1, Number.parseInt(searchParams.page ?? "1", 10) || 1);
  const q = searchParams.q?.trim();
  const categoria = searchParams.categoria;
  const marca = searchParams.marca;
  const min = searchParams.min ? Number.parseFloat(searchParams.min) : undefined;
  const max = searchParams.max ? Number.parseFloat(searchParams.max) : undefined;

  const where: Prisma.ProductWhereInput = {
    active: true,
    ...(q ? { name: { contains: q, mode: "insensitive" } } : {}),
    ...(categoria ? { category: { slug: categoria } } : {}),
    ...(marca ? { brand: { slug: marca } } : {}),
    ...(min !== undefined || max !== undefined
      ? { price: { ...(min !== undefined ? { gte: min } : {}), ...(max !== undefined ? { lte: max } : {}) } }
      : {}),
  };

  const showPromos = page === 1 && !q && !categoria && !marca && min === undefined && max === undefined;

  const [products, total, categories, brands, promoProducts] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { brand: true },
      orderBy: { name: "asc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.product.count({ where }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
    showPromos
      ? prisma.product.findMany({
          where: { active: true, salePrice: { not: null } },
          include: { brand: true },
          orderBy: { updatedAt: "desc" },
          take: 4,
        })
      : Promise.resolve([]),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function buildHref(targetPage: number) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (categoria) params.set("categoria", categoria);
    if (marca) params.set("marca", marca);
    if (searchParams.min) params.set("min", searchParams.min);
    if (searchParams.max) params.set("max", searchParams.max);
    if (targetPage > 1) params.set("page", String(targetPage));
    const qs = params.toString();
    return `/productos${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="container-hd py-10">
      <h1 className="section-title">Catálogo de productos</h1>
      <p className="mt-2 text-sm text-gray-500">{total} productos encontrados</p>

      {promoProducts.length > 0 && (
        <section className="mt-8 rounded-lg border border-brand-green/30 bg-brand-green/5 p-6">
          <h2 className="text-lg font-bold text-black">🔥 Promociones</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {promoProducts.map((p) => (
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

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <ProductFilters categories={categories} brands={brands} />

        <div className="flex-1">
          {products.length === 0 ? (
            <p className="py-12 text-center text-gray-500">
              No se encontraron productos con esos filtros.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {products.map((p) => (
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
          )}

          <Pagination currentPage={page} totalPages={totalPages} buildHref={buildHref} />
        </div>
      </div>
    </div>
  );
}
