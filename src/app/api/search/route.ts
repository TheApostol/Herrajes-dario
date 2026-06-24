import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim();
  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const results = await prisma.product.findMany({
    where: {
      active: true,
      name: { contains: q, mode: "insensitive" },
    },
    select: { id: true, slug: true, name: true, imageUrl: true },
    take: 8,
  });

  return NextResponse.json({ results });
}
