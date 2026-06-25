"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductFilterForm({
  categories,
  brands,
  filtro,
  initialQ,
  initialCategoria,
  initialMarca,
}: {
  categories: { slug: string; name: string }[];
  brands: { slug: string; name: string }[];
  filtro?: string;
  initialQ?: string;
  initialCategoria?: string;
  initialMarca?: string;
}) {
  const router = useRouter();
  const [q, setQ] = useState(initialQ ?? "");

  function navigate(overrides: { q?: string; categoria?: string; marca?: string }) {
    const params = new URLSearchParams();
    const categoria = overrides.categoria !== undefined ? overrides.categoria : initialCategoria;
    const marca = overrides.marca !== undefined ? overrides.marca : initialMarca;
    const qVal = overrides.q !== undefined ? overrides.q : q;
    if (filtro) params.set("filtro", filtro);
    if (qVal) params.set("q", qVal);
    if (categoria) params.set("categoria", categoria);
    if (marca) params.set("marca", marca);
    router.push(`/admin/productos${params.toString() ? `?${params}` : ""}`);
  }

  const hasActiveSearch = Boolean(initialQ || initialCategoria || initialMarca);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        navigate({});
      }}
      className="mt-6 flex flex-wrap items-end gap-3"
    >
      <div className="min-w-[200px] flex-1">
        <label className="block text-xs font-medium text-gray-500">Buscar</label>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nombre o SKU..."
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500">Categoría</label>
        <select
          value={initialCategoria ?? ""}
          onChange={(e) => navigate({ categoria: e.target.value })}
          className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">Todas</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500">Marca</label>
        <select
          value={initialMarca ?? ""}
          onChange={(e) => navigate({ marca: e.target.value })}
          className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">Todas</option>
          {brands.map((b) => (
            <option key={b.slug} value={b.slug}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn-secondary">
        Buscar
      </button>

      {hasActiveSearch && (
        <Link
          href={filtro ? `/admin/productos?filtro=${filtro}` : "/admin/productos"}
          className="text-sm text-gray-500 hover:underline"
        >
          Limpiar filtros
        </Link>
      )}
    </form>
  );
}
