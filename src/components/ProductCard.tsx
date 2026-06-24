import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export interface ProductCardData {
  id: string;
  slug: string;
  name: string;
  price: number;
  salePrice: number | null;
  imageUrl: string | null;
  brand: { name: string } | null;
  stock: number;
}

export default function ProductCard({ product }: { product: ProductCardData }) {
  const finalPrice = product.salePrice ?? product.price;
  const hasDiscount = product.salePrice != null && product.salePrice < product.price;

  return (
    <Link
      href={`/productos/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition hover:shadow-md"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-4 transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            Sin imagen
          </div>
        )}
        {product.stock <= 0 && (
          <span className="absolute left-2 top-2 rounded bg-black px-2 py-1 text-xs font-semibold text-white">
            Sin stock
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        {product.brand && (
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-green">
            {product.brand.name}
          </span>
        )}
        <h3 className="line-clamp-2 text-sm font-medium text-black">{product.name}</h3>
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="text-lg font-bold text-black">{formatPrice(finalPrice)}</span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
