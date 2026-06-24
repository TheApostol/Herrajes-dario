export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
}
