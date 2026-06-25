"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductRowActions({ id, active }: { id: string; active: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggleActive() {
    setLoading(true);
    await fetch(`/api/admin/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !active }),
    });
    router.refresh();
    setLoading(false);
  }

  async function handleDelete() {
    if (!confirm("¿Eliminar este producto? Esta acción no se puede deshacer.")) return;
    setLoading(true);
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    router.refresh();
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <Link
        href={`/admin/productos/${id}/editar`}
        className="rounded-md border border-gray-300 px-2 py-1 text-xs font-medium hover:border-black"
      >
        Editar
      </Link>
      <button
        onClick={toggleActive}
        disabled={loading}
        className="rounded-md border border-gray-300 px-2 py-1 text-xs font-medium hover:border-black disabled:opacity-50"
      >
        {active ? "Desactivar" : "Activar"}
      </button>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="rounded-md border border-red-300 px-2 py-1 text-xs font-medium text-red-600 hover:border-red-600 disabled:opacity-50"
      >
        Eliminar
      </button>
    </div>
  );
}
