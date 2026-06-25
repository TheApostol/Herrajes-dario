import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import ProductRowActions from "@/components/admin/ProductRowActions";
import ProductFilterForm from "@/components/admin/ProductFilterForm";
import { formatPrice } from "@/lib/utils";

const FILTERS: Record<string, { label: string; where: Prisma.ProductWhereInput }> = {
  activos: { label: "Activos", where: { active: true } },
  inactivos: { label: "Inactivos", where: { active: false } },
  "sin-stock": { label: "Sin stock", where: { stock: { lte: 0 } } },
  duplicadas: { label: "Imágenes duplicadas", where: { hasDuplicateImage: true } },
};

export default async function AdminProductosPage({
  searchParams,
}: {
  searchParams: { q?: string; filtro?: string; categoria?: string; marca?: string };
}) {
  const q = searchParams.q?.trim();
  const filtro = searchParams.filtro && FILTERS[searchParams.filtro] ? searchParams.filtro : undefined;
  const categoria = searchParams.categoria?.trim();
  const marca = searchParams.marca?.trim();

  const where: Prisma.ProductWhereInput = {
    ...(filtro ? FILTERS[filtro].where : {}),
    ...(categoria ? { category: { slug: categoria } } : {}),
    ...(marca ? { brand: { slug: marca } } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { sku: { contains: q, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const [products, categories, brands] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true, brand: true },
      orderBy: { createdAt: "desc" },
      take: 200,
    }),
    prisma.category.findMany({ orderBy: { name: "asc" }, select: { slug: true, name: true } }),
    prisma.brand.findMany({ orderBy: { name: "asc" }, select: { slug: true, name: true } }),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">Productos</h1>
        <Link href="/admin/productos/nuevo" className="btn-primary">
          Agregar producto
        </Link>
      </div>

      {filtro && (
        <div className="mt-4 flex items-center gap-2 text-sm">
          <span className="rounded-full bg-brand-green/10 px-3 py-1 font-medium text-brand-green">
            Filtro: {FILTERS[filtro].label}
          </span>
          <Link href="/admin/productos" className="text-gray-500 hover:underline">
            Quitar filtro
          </Link>
        </div>
      )}

      <ProductFilterForm
        categories={categories}
        brands={brands}
        filtro={filtro}
        initialQ={q}
        initialCategoria={categoria}
        initialMarca={marca}
      />

      <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="p-3">Producto</th>
              <th className="p-3">Categoría</th>
              <th className="p-3">Marca</th>
              <th className="p-3">Precio</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Estado</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-gray-100">
                <td className="max-w-xs p-3">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/productos/${p.id}/editar`} className="font-medium text-black hover:underline">
                      {p.name}
                    </Link>
                    {p.hasDuplicateImage && (
                      <span className="rounded bg-yellow-200 px-1.5 py-0.5 text-[10px] font-bold text-yellow-800">
                        Imagen duplicada
                      </span>
                    )}
                  </div>
                  {p.sku && <p className="text-xs text-gray-400">SKU: {p.sku}</p>}
                </td>
                <td className="p-3 text-gray-600">{p.category?.name ?? "-"}</td>
                <td className="p-3 text-gray-600">{p.brand?.name ?? "-"}</td>
                <td className="p-3 font-medium text-black">{formatPrice(Number(p.price))}</td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3">
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-semibold ${
                      p.active ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {p.active ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="p-3">
                  <ProductRowActions id={p.id} active={p.active} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="p-6 text-center text-sm text-gray-500">No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
}
