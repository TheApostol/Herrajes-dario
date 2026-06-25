import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import Pagination from "@/components/Pagination";
import { CATEGORY_ICONS } from "@/lib/categoryIcons";

const PAGE_SIZE = 24;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = await prisma.category.findUnique({ where: { slug: params.slug } });
  if (!category) return {};
  return {
    title: category.name,
    description: `Comprá ${category.name} en Herrajes Darío. Amplio stock y asesoramiento personalizado.`,
  };
}

export default async function CategoriaPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const category = await prisma.category.findUnique({ where: { slug: params.slug } });
  if (!category) notFound();
  const categorySlug = category.slug;
  const categoryName = category.name;

  const page = Math.max(1, Number.parseInt(searchParams.page ?? "1", 10) || 1);
  const marca = searchParams.marca;

  const where = {
    active: true,
    categoryId: category.id,
    ...(marca ? { brand: { slug: marca } } : {}),
  };

  const [products, total, categories, brands] = await Promise.all([
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
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function buildHref(targetPage: number) {
    const params2 = new URLSearchParams();
    if (marca) params2.set("marca", marca);
    if (targetPage > 1) params2.set("page", String(targetPage));
    const qs = params2.toString();
    return `/categoria/${categorySlug}${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="container-hd py-10">
      <div className="flex items-center gap-3">
        {CATEGORY_ICONS[categorySlug] && (
          <Image src={CATEGORY_ICONS[categorySlug]} alt="" width={36} height={36} />
        )}
        <h1 className="section-title">{categoryName}</h1>
      </div>
      <p className="mt-2 text-sm text-gray-500">{total} productos encontrados</p>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <ProductFilters categories={categories} brands={brands} />

        <div className="flex-1">
          {products.length === 0 ? (
            <p className="py-12 text-center text-gray-500">
              No hay productos disponibles en esta categoría todavía.
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
