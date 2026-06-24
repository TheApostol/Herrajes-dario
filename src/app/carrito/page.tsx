"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-hd py-16 text-center">
        <h1 className="section-title">Tu carrito está vacío</h1>
        <p className="mt-3 text-sm text-gray-600">
          Explorá nuestro catálogo y agregá productos a tu carrito.
        </p>
        <Link href="/productos" className="btn-primary mt-6 inline-flex">
          Ver catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="container-hd py-10">
      <h1 className="section-title">Carrito de compras</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-lg border border-gray-200 p-4"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded bg-gray-50">
                {item.imageUrl ? (
                  <Image src={item.imageUrl} alt={item.name} fill className="object-contain p-1" />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-gray-400">
                    Sin imagen
                  </div>
                )}
              </div>
              <div className="flex-1">
                <Link href={`/productos/${item.slug}`} className="text-sm font-medium text-black hover:underline">
                  {item.name}
                </Link>
                <p className="mt-1 text-sm text-gray-500">{formatPrice(item.price)}</p>
              </div>
              <div className="flex items-center rounded-md border border-gray-300">
                <button
                  type="button"
                  className="px-2 py-1 text-lg"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label="Restar cantidad"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                <button
                  type="button"
                  className="px-2 py-1 text-lg"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label="Sumar cantidad"
                >
                  +
                </button>
              </div>
              <span className="w-24 text-right text-sm font-bold text-black">
                {formatPrice(item.price * item.quantity)}
              </span>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                aria-label="Quitar producto"
                className="p-2 text-gray-400 hover:text-red-600"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-black">Resumen</h2>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold text-black">{formatPrice(totalPrice)}</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            El costo de envío se coordina por WhatsApp luego de la compra.
          </p>
          <Link href="/checkout" className="btn-primary mt-6 w-full">
            Continuar a checkout
          </Link>
          <Link href="/productos" className="btn-secondary mt-3 w-full">
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
