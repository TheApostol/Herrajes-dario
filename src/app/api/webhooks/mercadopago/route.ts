import { NextRequest, NextResponse } from "next/server";
import { Payment } from "mercadopago";
import { prisma } from "@/lib/prisma";
import { getMpClient } from "@/lib/mercadopago";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const paymentId = body?.data?.id ?? request.nextUrl.searchParams.get("data.id");
  const type = body?.type ?? request.nextUrl.searchParams.get("type");

  if (type !== "payment" || !paymentId) {
    return NextResponse.json({ received: true });
  }

  try {
    const payment = await new Payment(getMpClient()).get({ id: paymentId });
    const orderId = payment.external_reference;

    if (orderId) {
      const statusMap: Record<string, string> = {
        approved: "paid",
        pending: "pending",
        in_process: "pending",
        rejected: "failed",
        cancelled: "cancelled",
        refunded: "refunded",
      };

      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: statusMap[payment.status ?? ""] ?? "pending",
          mpPaymentId: String(payment.id),
        },
      });
    }
  } catch (err) {
    console.error("Error procesando webhook de Mercado Pago", err);
  }

  return NextResponse.json({ received: true });
}
