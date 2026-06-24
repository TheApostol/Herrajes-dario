import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditarProductoPage({ params }: { params: { id: string } }) {
  const [product, categories, brands] = await Promise.all([
    prisma.product.findUnique({
      where: { id: params.id },
      include: { category: true, brand: true },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!product) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-black">Editar producto</h1>
      <div className="mt-6">
        <ProductForm
          initialData={{
            id: product.id,
            name: product.name,
            slug: product.slug,
            description: product.description ?? undefined,
            price: Number(product.price),
            salePrice: product.salePrice ? Number(product.salePrice) : null,
            sku: product.sku ?? undefined,
            stock: product.stock,
            weight: product.weight ? Number(product.weight) : null,
            imageUrl: product.imageUrl ?? undefined,
            seoTitle: product.seoTitle ?? undefined,
            seoDescription: product.seoDescription ?? undefined,
            tags: product.tags ?? undefined,
            active: product.active,
            categoryName: product.category?.name,
            brandName: product.brand?.name,
          }}
          categories={categories.map((c) => c.name)}
          brands={brands.map((b) => b.name)}
        />
      </div>
    </div>
  );
}
