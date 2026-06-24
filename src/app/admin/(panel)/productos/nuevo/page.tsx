import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";

export default async function NuevoProductoPage() {
  const [categories, brands] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-black">Agregar producto</h1>
      <div className="mt-6">
        <ProductForm
          categories={categories.map((c) => c.name)}
          brands={brands.map((b) => b.name)}
        />
      </div>
    </div>
  );
}
