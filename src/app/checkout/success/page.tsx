"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartContext";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="container-hd flex flex-col items-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green text-white">
        ✓
      </div>
      <h1 className="mt-6 section-title">¡Pago aprobado!</h1>
      <p className="mt-3 max-w-md text-sm text-gray-600">
        Gracias por tu compra. Te contactaremos a la brevedad para coordinar la
        entrega de tu pedido.
      </p>
      <Link href="/productos" className="btn-primary mt-8">
        Seguir comprando
      </Link>
    </div>
  );
}
