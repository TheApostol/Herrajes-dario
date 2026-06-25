export const ORDER_STATUSES = {
  pending: { label: "Pendiente", className: "bg-yellow-100 text-yellow-700" },
  confirmed: { label: "Confirmado", className: "bg-blue-100 text-blue-700" },
  completed: { label: "Completado", className: "bg-green-100 text-green-700" },
  cancelled: { label: "Cancelado", className: "bg-gray-200 text-gray-600" },
} as const;

export type OrderStatus = keyof typeof ORDER_STATUSES;

export function orderStatusLabel(status: string): string {
  return ORDER_STATUSES[status as OrderStatus]?.label ?? status;
}
