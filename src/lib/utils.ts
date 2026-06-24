export function formatPrice(value: number | string): string {
  const num = typeof value === "string" ? Number.parseFloat(value) : value;
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

export function whatsappLink(message: string, phone = "5491133504178"): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
