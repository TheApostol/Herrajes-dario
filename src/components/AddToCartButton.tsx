"use client";

import { useState } from "react";
import { useCart } from "@/components/CartContext";

export default function AddToCartButton({
  id,
  slug,
  name,
  price,
  imageUrl,
  disabled,
}: {
  id: string;
  slug: string;
  name: string;
  price: number;
  imageUrl: string | null;
  disabled?: boolean;
}) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({ id, slug, name, price, imageUrl }, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-md border border-gray-300">
        <button
          type="button"
          className="px-3 py-2 text-lg"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          aria-label="Restar cantidad"
        >
          −
        </button>
        <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
        <button
          type="button"
          className="px-3 py-2 text-lg"
          onClick={() => setQuantity((q) => q + 1)}
          aria-label="Sumar cantidad"
        >
          +
        </button>
      </div>
      <button
        type="button"
        onClick={handleAdd}
        disabled={disabled}
        className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
      >
        {disabled ? "Sin stock" : added ? "¡Agregado!" : "Agregar al carrito"}
      </button>
    </div>
  );
}
