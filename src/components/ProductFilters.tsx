"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Option {
  name: string;
  slug: string;
}

export default function ProductFilters({
  categories = [],
  brands,
  showCategories = true,
}: {
  categories?: Option[];
  brands: Option[];
  showCategories?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(searchParams.get("min") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max") ?? "");

  const activeCategory = searchParams.get("categoria") ?? "";
  const activeBrand = searchParams.get("marca") ?? "";

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  function applyPriceRange(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (minPrice) params.set("min", minPrice);
    else params.delete("min");
    if (maxPrice) params.set("max", maxPrice);
    else params.delete("max");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <aside className="w-full shrink-0 space-y-8 lg:w-64">
      {showCategories && (
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-black">Categoría</h3>
          <ul className="mt-3 space-y-2">
            <li>
              <button
                onClick={() => updateParam("categoria", null)}
                className={`text-sm ${!activeCategory ? "font-bold text-brand-green" : "text-gray-600 hover:text-black"}`}
              >
                Todas
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat.slug}>
                <button
                  onClick={() => updateParam("categoria", cat.slug)}
                  className={`text-sm ${activeCategory === cat.slug ? "font-bold text-brand-green" : "text-gray-600 hover:text-black"}`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wide text-black">Marca</h3>
        <select
          value={activeBrand}
          onChange={(e) => updateParam("marca", e.target.value || null)}
          className="mt-3 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
        >
          <option value="">Todas</option>
          {brands.map((brand) => (
            <option key={brand.slug} value={brand.slug}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wide text-black">Precio</h3>
        <form onSubmit={applyPriceRange} className="mt-3 flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
          />
          <button type="submit" className="rounded-md bg-black px-3 py-1.5 text-xs font-semibold text-white">
            Ir
          </button>
        </form>
      </div>
    </aside>
  );
}
