"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
  const [imageTab, setImageTab] = useState<"url" | "upload">("url");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileUpload(file: File) {
    setUploading(true);
    setUploadError(null);

    const body = new FormData();
    body.append("file", file);

    const res = await fetch("/api/admin/upload", { method: "POST", body });
    const data = await res.json();

    if (res.ok) {
      setForm((f) => ({ ...f, imageUrl: data.url }));
    } else {
      setUploadError(data.error ?? "Error al subir la imagen");
    }
    setUploading(false);
  }

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
        <label className="text-sm font-semibold text-black">Imagen del producto</label>
        <div className="mt-1 flex gap-2">
          <button
            type="button"
            onClick={() => setImageTab("url")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${
              imageTab === "url" ? "bg-black text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            URL
          </button>
          <button
            type="button"
            onClick={() => setImageTab("upload")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${
              imageTab === "upload" ? "bg-black text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            Subir imagen
          </button>
        </div>

        {imageTab === "url" ? (
          <input
            type="text"
            value={form.imageUrl ?? ""}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        ) : (
          <div className="mt-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
              className="block w-full text-sm text-gray-600 file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-black hover:file:bg-gray-200"
            />
            {uploading && <p className="mt-1 text-xs text-gray-500">Subiendo imagen...</p>}
            {uploadError && <p className="mt-1 text-xs text-red-600">{uploadError}</p>}
          </div>
        )}

        {form.imageUrl && (
          <div className="relative mt-3 h-32 w-32 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
            <Image src={form.imageUrl} alt="Vista previa" fill className="object-contain p-2" />
          </div>
        )}
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
