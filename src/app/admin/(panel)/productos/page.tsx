import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductRowActions from "@/components/admin/ProductRowActions";
import { formatPrice } from "@/lib/utils";

export default async function AdminProductosPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = searchParams.q?.trim();

  const products = await prisma.product.findMany({
    where: q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { sku: { contains: q, mode: "insensitive" } },
          ],
        }
      : undefined,
    include: { category: true, brand: true },
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">Productos</h1>
        <Link href="/admin/productos/nuevo" className="btn-primary">
          Agregar producto
        </Link>
      </div>

      <form className="mt-6">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Buscar por nombre o SKU..."
          className="w-full max-w-sm rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </form>

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
