import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";

const productSchema = z.object({
  name: z.string().min(1),
  slug: z.string().optional(),
  description: z.string().optional().nullable(),
  price: z.number().nonnegative(),
  salePrice: z.number().nonnegative().nullable().optional(),
  sku: z.string().optional().nullable(),
  stock: z.number().int().nonnegative().default(0),
  weight: z.number().nonnegative().nullable().optional(),
  imageUrl: z.string().optional().nullable(),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  tags: z.string().optional().nullable(),
  active: z.boolean().default(true),
  categoryName: z.string().optional().nullable(),
  brandName: z.string().optional().nullable(),
});

export async function GET() {
  const products = await prisma.product.findMany({
    include: { category: true, brand: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ products });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = productSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }

  const data = parsed.data;
  const slug = slugify(data.slug || data.name);

  let categoryId: string | undefined;
  if (data.categoryName) {
    const category = await prisma.category.upsert({
      where: { name: data.categoryName },
      update: {},
      create: { name: data.categoryName, slug: slugify(data.categoryName) },
    });
    categoryId = category.id;
  }

  let brandId: string | undefined;
  if (data.brandName) {
    const brand = await prisma.brand.upsert({
      where: { name: data.brandName },
      update: {},
      create: { name: data.brandName, slug: slugify(data.brandName) },
    });
    brandId = brand.id;
  }

  const product = await prisma.product.create({
    data: {
      slug,
      name: data.name,
      description: data.description,
      price: data.price,
      salePrice: data.salePrice,
      sku: data.sku,
      stock: data.stock,
      weight: data.weight,
      imageUrl: data.imageUrl,
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      tags: data.tags,
      active: data.active,
      categoryId,
      brandId,
    },
  });

  return NextResponse.json({ product });
}
