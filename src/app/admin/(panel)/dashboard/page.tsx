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
    { label: "Productos totales", value: totalProducts, href: "/admin/productos" },
    { label: "Productos activos", value: activeProducts, href: "/admin/productos?filtro=activos" },
    { label: "Sin stock", value: outOfStock, href: "/admin/productos?filtro=sin-stock" },
    { label: "Imágenes duplicadas", value: duplicateImages, href: "/admin/productos?filtro=duplicadas" },
    { label: "Pedidos", value: totalOrders, href: "/admin/pedidos" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-black">Dashboard</h1>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-lg border border-gray-200 bg-white p-4 transition hover:border-brand-green hover:shadow-sm sm:p-5"
          >
            <p className="text-xl font-bold text-black sm:text-2xl">{stat.value}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500">
              {stat.label}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/admin/productos" className="btn-primary">Ver productos</Link>
        <Link href="/admin/productos/nuevo" className="btn-secondary">Agregar producto</Link>
        <Link href="/admin/pedidos" className="btn-secondary">Ver pedidos</Link>
        <Link href="/admin/importar" className="btn-secondary">Importar CSV</Link>
      </div>
    </div>
  );
}
