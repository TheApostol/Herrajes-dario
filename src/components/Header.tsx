import { prisma } from "@/lib/prisma";
import HeaderClient from "@/components/HeaderClient";

export default async function Header() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    select: { name: true, slug: true },
  });

  return <HeaderClient categories={categories} />;
}
