import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice, whatsappLink } from "@/lib/utils";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default async function AdminPedidoDetailPage({ params }: { params: { id: string } }) {
  const order = await prisma.order.findUnique({ where: { id: params.id } });
  if (!order) notFound();

  const items = order.items as unknown as OrderItem[];
  const total = Number(order.totalAmount);
  const shortId = order.id.slice(-6).toUpperCase();

  const message = [
    `Hola ${order.buyerName ?? ""}, te escribo de Herrajes Darío por tu pedido #${shortId}.`,
  ].join("\n");

  return (
    <div>
      <Link href="/admin/pedidos" className="text-sm text-gray-500 hover:underline">
        ← Volver a pedidos
      </Link>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-black">Pedido #{shortId}</h1>
        <OrderStatusSelect id={order.id} status={order.status} />
      </div>
      <p className="mt-1 text-sm text-gray-500">
        Realizado el {order.createdAt.toLocaleDateString("es-AR")} a las{" "}
        {order.createdAt.toLocaleTimeString("es-AR")}
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-5 lg:col-span-2">
          <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500">Productos</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {items.map((item, i) => (
              <li key={i} className="flex justify-between border-b border-gray-100 pb-2">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span className="font-semibold text-black">{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between text-base font-bold text-black">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500">Cliente</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div>
              <dt className="text-gray-400">Nombre</dt>
              <dd className="font-medium text-black">{order.buyerName ?? "-"}</dd>
            </div>
            <div>
              <dt className="text-gray-400">Teléfono</dt>
              <dd className="font-medium text-black">{order.buyerPhone ?? "-"}</dd>
            </div>
            {order.buyerEmail && (
              <div>
                <dt className="text-gray-400">Email</dt>
                <dd className="font-medium text-black">{order.buyerEmail}</dd>
              </div>
            )}
            <div>
              <dt className="text-gray-400">Forma de pago</dt>
              <dd className="font-medium text-black">
                {order.paymentMethod === "transferencia" ? "Transferencia bancaria" : "Efectivo en el local"}
              </dd>
            </div>
          </dl>

          {order.buyerPhone && (
            <a
              href={whatsappLink(message, order.buyerPhone.replace(/\D/g, ""))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-5 block text-center"
            >
              Contactar por WhatsApp
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
