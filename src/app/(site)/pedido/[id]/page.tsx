import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice, whatsappLink } from "@/lib/utils";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default async function PedidoPage({ params }: { params: { id: string } }) {
  const order = await prisma.order.findUnique({ where: { id: params.id } });
  if (!order) notFound();

  const items = order.items as unknown as OrderItem[];
  const total = Number(order.totalAmount);
  const shortId = order.id.slice(-6).toUpperCase();

  const message = [
    "¡Hola! Quiero confirmar mi pedido en Herrajes Darío.",
    "",
    `Pedido #${shortId}`,
    ...items.map((i) => `• ${i.name} x${i.quantity} — ${formatPrice(i.price * i.quantity)}`),
    "",
    `Total: ${formatPrice(total)}`,
    `Pago: ${order.paymentMethod === "transferencia" ? "Transferencia bancaria" : "Efectivo en el local"}`,
    "",
    `Nombre: ${order.buyerName ?? ""}`,
    `Teléfono: ${order.buyerPhone ?? ""}`,
  ].join("\n");

  return (
    <div className="container-hd flex flex-col items-center py-16 text-center">
      <h1 className="section-title">Pedido #{shortId}</h1>
      <p className="mt-2 text-sm text-gray-500">
        Realizado el {order.createdAt.toLocaleDateString("es-AR")}
      </p>

      <div className="mt-8 w-full max-w-md rounded-lg border border-gray-200 p-6 text-left">
        <ul className="space-y-2 text-sm">
          {items.map((item, i) => (
            <li key={i} className="flex justify-between">
              <span>
                {item.name} x{item.quantity}
              </span>
              <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-base font-bold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
        <p className="mt-3 text-sm text-gray-500">
          Pago: {order.paymentMethod === "transferencia" ? "Transferencia bancaria" : "Efectivo en el local"}
        </p>
      </div>

      <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8">
        Continuar por WhatsApp
      </a>
      <Link href="/productos" className="btn-secondary mt-3">
        Seguir comprando
      </Link>
    </div>
  );
}
