import Papa from "papaparse";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";

export interface CsvRow {
  "Identificador de URL": string;
  Nombre: string;
  Categorías: string;
  Precio: string;
  "Precio promocional": string;
  "Peso (kg)": string;
  Stock: string;
  SKU: string;
  "Mostrar en tienda": string;
  Descripción: string;
  Tags: string;
  "Título para SEO": string;
  "Descripción para SEO": string;
  Marca: string;
  Imagen: string;
}

export interface ImportSummary {
  inserted: number;
  updated: number;
  errors: { row: number; message: string }[];
  duplicateImageGroups: number;
}

function parseNumber(value: string | undefined | null): number | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const normalized = trimmed.replace(",", ".");
  const num = Number.parseFloat(normalized);
  return Number.isFinite(num) ? num : null;
}

export async function importProductsFromCsv(csvText: string): Promise<ImportSummary> {
  const cleanText = csvText.charCodeAt(0) === 0xfeff ? csvText.slice(1) : csvText;
  const parsed = Papa.parse<CsvRow>(cleanText, {
    header: true,
    delimiter: ";",
    skipEmptyLines: true,
  });

  const rows = parsed.data;
  const summary: ImportSummary = {
    inserted: 0,
    updated: 0,
    errors: [],
    duplicateImageGroups: 0,
  };

  const imageCounts = new Map<string, number>();
  for (const row of rows) {
    const img = row["Imagen"]?.trim();
    if (img) imageCounts.set(img, (imageCounts.get(img) ?? 0) + 1);
  }
  summary.duplicateImageGroups = Array.from(imageCounts.values()).filter((c) => c > 1).length;

  const categoryCache = new Map<string, string>();
  const brandCache = new Map<string, string>();

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowNum = i + 2;

    try {
      const rawSlug = row["Identificador de URL"]?.trim();
      const name = row["Nombre"]?.trim();
      if (!rawSlug || !name) {
        summary.errors.push({ row: rowNum, message: "Falta slug o nombre" });
        continue;
      }
      const slug = slugify(rawSlug);

      const price = parseNumber(row["Precio"]) ?? 0;
      const salePrice = parseNumber(row["Precio promocional"]);
      const weight = parseNumber(row["Peso (kg)"]);
      const stock = parseNumber(row["Stock"]) ?? 10;
      const active = row["Mostrar en tienda"]?.trim().toUpperCase() === "SI";
      const imageUrl = row["Imagen"]?.trim() || null;
      const hasDuplicateImage = imageUrl ? (imageCounts.get(imageUrl) ?? 0) > 1 : false;

      const categoryName = row["Categorías"]?.trim();
      let categoryId: string | undefined;
      if (categoryName) {
        if (categoryCache.has(categoryName)) {
          categoryId = categoryCache.get(categoryName);
        } else {
          const categorySlug = slugify(categoryName);
          const category = await prisma.category.upsert({
            where: { name: categoryName },
            update: {},
            create: { name: categoryName, slug: categorySlug },
          });
          categoryCache.set(categoryName, category.id);
          categoryId = category.id;
        }
      }

      const brandName = row["Marca"]?.trim();
      let brandId: string | undefined;
      if (brandName) {
        if (brandCache.has(brandName)) {
          brandId = brandCache.get(brandName);
        } else {
          const brandSlug = slugify(brandName);
          const brand = await prisma.brand.upsert({
            where: { name: brandName },
            update: {},
            create: { name: brandName, slug: brandSlug },
          });
          brandCache.set(brandName, brand.id);
          brandId = brand.id;
        }
      }

      const existing = await prisma.product.findUnique({ where: { slug } });

      const data = {
        slug,
        name,
        description: row["Descripción"]?.trim() || null,
        price,
        salePrice,
        sku: row["SKU"]?.trim() || null,
        stock,
        weight,
        imageUrl,
        seoTitle: row["Título para SEO"]?.trim() || null,
        seoDescription: row["Descripción para SEO"]?.trim() || null,
        tags: row["Tags"]?.trim() || null,
        active,
        hasDuplicateImage,
        categoryId,
        brandId,
      };

      if (existing) {
        await prisma.product.update({ where: { slug }, data });
        summary.updated++;
      } else {
        await prisma.product.create({ data });
        summary.inserted++;
      }
    } catch (err) {
      summary.errors.push({
        row: rowNum,
        message: err instanceof Error ? err.message : "Error desconocido",
      });
    }
  }

  return summary;
}
