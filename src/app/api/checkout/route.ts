import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const checkoutSchema = z.object({
  buyerName: z.string().min(1),
  buyerEmail: z.string().email(),
  buyerPhone: z.string().min(1),
  paymentMethod: z.enum(["transferencia", "efectivo"]),
  items: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        price: z.number().positive(),
        quantity: z.number().int().positive(),
      })
    )
    .min(1),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = checkoutSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const { buyerName, buyerEmail, buyerPhone, paymentMethod, items } = parsed.data;
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order = await prisma.order.create({
    data: {
      status: "pending",
      totalAmount,
      buyerName,
      buyerEmail,
      buyerPhone,
      paymentMethod,
      items,
    },
  });

  return NextResponse.json({ orderId: order.id });
}
