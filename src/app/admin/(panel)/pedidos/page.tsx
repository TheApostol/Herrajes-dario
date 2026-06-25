import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { ORDER_STATUSES, orderStatusLabel } from "@/lib/orderStatus";

export default async function AdminPedidosPage({
  searchParams,
}: {
  searchParams: { estado?: string };
}) {
  const estado = searchParams.estado && searchParams.estado in ORDER_STATUSES ? searchParams.estado : undefined;

  const orders = await prisma.order.findMany({
    where: estado ? { status: estado } : undefined,
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-black">Pedidos</h1>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <Link
          href="/admin/pedidos"
          className={`rounded-full px-3 py-1 font-medium ${!estado ? "bg-black text-white" : "bg-gray-100 text-gray-600"}`}
        >
          Todos
        </Link>
        {Object.entries(ORDER_STATUSES).map(([value, { label }]) => (
          <Link
            key={value}
            href={`/admin/pedidos?estado=${value}`}
            className={`rounded-full px-3 py-1 font-medium ${estado === value ? "bg-black text-white" : "bg-gray-100 text-gray-600"}`}
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="p-3">Pedido</th>
              <th className="p-3">Fecha</th>
              <th className="p-3">Cliente</th>
              <th className="p-3">Pago</th>
              <th className="p-3">Total</th>
              <th className="p-3">Estado</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-gray-100">
                <td className="p-3 font-medium text-black">#{order.id.slice(-6).toUpperCase()}</td>
                <td className="p-3 text-gray-600">{order.createdAt.toLocaleDateString("es-AR")}</td>
                <td className="p-3 text-gray-600">
                  {order.buyerName ?? "-"}
                  {order.buyerPhone && <p className="text-xs text-gray-400">{order.buyerPhone}</p>}
                </td>
                <td className="p-3 text-gray-600">
                  {order.paymentMethod === "transferencia" ? "Transferencia" : "Efectivo"}
                </td>
                <td className="p-3 font-medium text-black">{formatPrice(Number(order.totalAmount))}</td>
                <td className="p-3">{orderStatusLabel(order.status)}</td>
                <td className="p-3 text-right">
                  <Link href={`/admin/pedidos/${order.id}`} className="text-xs font-medium text-brand-green hover:underline">
                    Ver detalle
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <p className="p-6 text-center text-sm text-gray-500">No se encontraron pedidos.</p>
        )}
      </div>
    </div>
  );
}
