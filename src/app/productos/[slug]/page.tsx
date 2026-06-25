import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "@/components/AddToCartButton";
import { formatPrice, whatsappLink } from "@/lib/utils";

async function getProduct(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { brand: true, category: true },
  });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProduct(params.slug);
  if (!product) return {};

  return {
    title: product.seoTitle ?? product.name,
    description: product.seoDescription ?? product.description ?? undefined,
    openGraph: {
      title: product.seoTitle ?? product.name,
      description: product.seoDescription ?? product.description ?? undefined,
      images: product.imageUrl ? [product.imageUrl] : undefined,
    },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  if (!product || !product.active) notFound();

  const related = await prisma.product.findMany({
    where: {
      active: true,
      categoryId: product.categoryId,
      id: { not: product.id },
    },
    include: { brand: true },
    take: 4,
  });

  const finalPrice = product.salePrice ? Number(product.salePrice) : Number(product.price);
  const hasDiscount = product.salePrice != null && Number(product.salePrice) < Number(product.price);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://herrajesdario.com.ar";
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.seoDescription ?? product.description ?? undefined,
    sku: product.sku ?? undefined,
    image: product.imageUrl ?? undefined,
    brand: product.brand ? { "@type": "Brand", name: product.brand.name } : undefined,
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/productos/${product.slug}`,
      priceCurrency: "ARS",
      price: finalPrice,
      availability:
        product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="container-hd py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-black">Inicio</Link>
        <span className="mx-2">/</span>
        <Link href="/productos" className="hover:text-black">Productos</Link>
        {product.category && (
          <>
            <span className="mx-2">/</span>
            <Link href={`/categoria/${product.category.slug}`} className="hover:text-black">
              {product.category.name}
            </Link>
          </>
        )}
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-8"
              priority
            />
          ) : (
            <Image src="/logo.png" alt={product.name} fill className="object-contain p-16 opacity-25" />
          )}
        </div>

        <div>
          {product.brand && (
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-green">
              {product.brand.name}
            </span>
          )}
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-black sm:text-3xl">
            {product.name}
          </h1>
          {product.sku && <p className="mt-1 text-sm text-gray-500">SKU: {product.sku}</p>}

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-black">{formatPrice(finalPrice)}</span>
            {hasDiscount && (
              <span className="text-lg text-gray-400 line-through">
                {formatPrice(Number(product.price))}
              </span>
            )}
          </div>

          <p className="mt-2 text-sm font-medium text-gray-600">
            {product.stock > 0 ? "En stock" : "Sin stock"}
          </p>

          <div className="mt-6">
            <AddToCartButton
              id={product.id}
              slug={product.slug}
              name={product.name}
              price={finalPrice}
              imageUrl={product.imageUrl}
              disabled={product.stock <= 0}
            />
          </div>

          <a
            href={whatsappLink(`Hola! Quiero consultar sobre: ${product.name} (${product.sku ?? ""})`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:underline"
          >
            Consultar por WhatsApp →
          </a>

          {product.description && (
            <div
              className="prose prose-sm mt-8 max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="section-title">Productos relacionados</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
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
    </div>
  );
}
