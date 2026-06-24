import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [totalProducts, activeProducts, outOfStock, duplicateImages, totalOrders] =
    await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { active: true } }),
      prisma.product.count({ where: { stock: { lte: 0 } } }),
      prisma.product.count({ where: { hasDuplicateImage: true } }),
      prisma.order.count(),
    ]);

  const stats = [
    { label: "Productos totales", value: totalProducts },
    { label: "Productos activos", value: activeProducts },
    { label: "Sin stock", value: outOfStock },
    { label: "Imágenes duplicadas", value: duplicateImages },
    { label: "Pedidos", value: totalOrders },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-black">Dashboard</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-gray-200 bg-white p-5">
            <p className="text-2xl font-bold text-black">{stat.value}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/admin/productos" className="btn-primary">Ver productos</Link>
        <Link href="/admin/productos/nuevo" className="btn-secondary">Agregar producto</Link>
        <Link href="/admin/importar" className="btn-secondary">Importar CSV</Link>
      </div>
    </div>
  );
}
