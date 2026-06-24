"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export interface ProductFormData {
  id?: string;
  name: string;
  slug?: string;
  description?: string;
  price: number;
  salePrice?: number | null;
  sku?: string;
  stock: number;
  weight?: number | null;
  imageUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  tags?: string;
  active: boolean;
  categoryName?: string;
  brandName?: string;
}

export default function ProductForm({
  initialData,
  categories,
  brands,
}: {
  initialData?: ProductFormData;
  categories: string[];
  brands: string[];
}) {
  const router = useRouter();
  const [form, setForm] = useState<ProductFormData>(
    initialData ?? {
      name: "",
      price: 0,
      stock: 10,
      active: true,
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const url = initialData?.id ? `/api/admin/products/${initialData.id}` : "/api/admin/products";
    const method = initialData?.id ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/admin/productos");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "Error al guardar el producto");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <div>
        <label className="text-sm font-semibold text-black">Nombre *</label>
        <input
          required
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-black">Slug (opcional)</label>
        <input
          type="text"
          value={form.slug ?? ""}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          placeholder="Se genera automáticamente si se deja vacío"
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold text-black">Precio *</label>
          <input
            required
            type="number"
            step="0.01"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number.parseFloat(e.target.value) || 0 })}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-black">Precio promocional</label>
          <input
            type="number"
            step="0.01"
            value={form.salePrice ?? ""}
            onChange={(e) =>
              setForm({ ...form, salePrice: e.target.value ? Number.parseFloat(e.target.value) : null })
            }
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold text-black">SKU</label>
          <input
            type="text"
            value={form.sku ?? ""}
            onChange={(e) => setForm({ ...form, sku: e.target.value })}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-black">Stock</label>
          <input
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: Number.parseInt(e.target.value, 10) || 0 })}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold text-black">Categoría</label>
          <input
            type="text"
            list="category-list"
            value={form.categoryName ?? ""}
            onChange={(e) => setForm({ ...form, categoryName: e.target.value })}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
          <datalist id="category-list">
            {categories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </div>
        <div>
          <label className="text-sm font-semibold text-black">Marca</label>
          <input
            type="text"
            list="brand-list"
            value={form.brandName ?? ""}
            onChange={(e) => setForm({ ...form, brandName: e.target.value })}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
          <datalist id="brand-list">
            {brands.map((b) => (
              <option key={b} value={b} />
            ))}
          </datalist>
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-black">URL de imagen</label>
        <input
          type="text"
          value={form.imageUrl ?? ""}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-black">Descripción</label>
        <textarea
          value={form.description ?? ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={4}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold text-black">Título SEO</label>
          <input
            type="text"
            value={form.seoTitle ?? ""}
            onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-black">Peso (kg)</label>
          <input
            type="number"
            step="0.001"
            value={form.weight ?? ""}
            onChange={(e) =>
              setForm({ ...form, weight: e.target.value ? Number.parseFloat(e.target.value) : null })
            }
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-black">Descripción SEO</label>
        <textarea
          value={form.seoDescription ?? ""}
          onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
          rows={2}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-black">Tags</label>
        <input
          type="text"
          value={form.tags ?? ""}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-black">
        <input
          type="checkbox"
          checked={form.active}
          onChange={(e) => setForm({ ...form, active: e.target.checked })}
        />
        Mostrar en tienda
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
        {loading ? "Guardando..." : "Guardar producto"}
      </button>
    </form>
  );
}
