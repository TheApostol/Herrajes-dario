"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { formatPrice, whatsappLink } from "@/lib/utils";
import BankTransferModal from "@/components/BankTransferModal";

type Step = "form" | "connecting" | "done";
type PaymentMethod = "transferencia" | "efectivo";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState({ buyerName: "", buyerPhone: "", buyerEmail: "" });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("transferencia");
  const [showBankModal, setShowBankModal] = useState(false);
  const [receiptName, setReceiptName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  if (items.length === 0 && step === "form") {
    return (
      <div className="container-hd py-16 text-center">
        <h1 className="section-title">No hay productos en tu carrito</h1>
        <Link href="/productos" className="btn-primary mt-6 inline-flex">
          Ver catálogo
        </Link>
      </div>
    );
  }

  function buildOrderMessage(orderId: string) {
    const lines = [
      "¡Hola! Quiero confirmar mi pedido en Herrajes Darío.",
      "",
      `Pedido #${orderId.slice(-6).toUpperCase()}`,
      ...items.map((i) => `• ${i.name} x${i.quantity} — ${formatPrice(i.price * i.quantity)}`),
      "",
      `Total: ${formatPrice(totalPrice)}`,
      `Pago: ${paymentMethod === "transferencia" ? "Transferencia bancaria" : "Efectivo en el local"}`,
      "",
      `Nombre: ${form.buyerName}`,
      `Teléfono: ${form.buyerPhone}`,
      form.buyerEmail ? `Email: ${form.buyerEmail}` : null,
      paymentMethod === "transferencia" && receiptName
        ? "Ya tengo el comprobante de transferencia listo para enviar."
        : null,
    ].filter(Boolean);
    return lines.join("\n");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          paymentMethod,
          items: items.map((i) => ({
            id: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "No se pudo enviar tu pedido.");
        setLoading(false);
        return;
      }

      const url = whatsappLink(buildOrderMessage(data.orderId));
      setWhatsappUrl(url);
      setStep("connecting");
      setLoading(false);

      setTimeout(() => {
        setStep("done");
        clearCart();
        window.open(url, "_blank", "noopener,noreferrer");
      }, 1800);
    } catch {
      setError("Ocurrió un error al procesar tu pedido.");
      setLoading(false);
    }
  }

  if (step === "connecting") {
    return (
      <div className="container-hd flex flex-col items-center py-24 text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-brand-green" />
        <h1 className="mt-6 section-title">Contactando a un operador...</h1>
        <p className="mt-3 max-w-md text-sm text-gray-600">
          Estamos preparando tu pedido para enviártelo por WhatsApp.
        </p>
      </div>
    );
  }

  if (step === "done") {
    return (
      <div className="container-hd flex flex-col items-center py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green text-white">
          ✓
        </div>
        <h1 className="mt-6 section-title">¡Pedido enviado!</h1>
        <p className="mt-3 max-w-md text-sm text-gray-600">
          Se abrió WhatsApp con el detalle de tu pedido. Si no se abrió
          automáticamente, tocá el botón de abajo para continuar la
          conversación con un operador.
        </p>
        <a
          href={whatsappUrl ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-8"
        >
          Abrir WhatsApp
        </a>
        <Link href="/productos" className="btn-secondary mt-3">
          Seguir comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="container-hd py-10">
      <h1 className="section-title">Checkout</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="space-y-5 lg:col-span-2">
          <div>
            <label className="text-sm font-semibold text-black">Nombre y apellido</label>
            <input
              required
              type="text"
              value={form.buyerName}
              onChange={(e) => setForm({ ...form, buyerName: e.target.value })}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-black">Teléfono</label>
            <input
              required
              type="tel"
              value={form.buyerPhone}
              onChange={(e) => setForm({ ...form, buyerPhone: e.target.value })}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-black">Email (opcional)</label>
            <input
              type="email"
              value={form.buyerEmail}
              onChange={(e) => setForm({ ...form, buyerEmail: e.target.value })}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-black">Forma de pago</p>
            <div className="mt-2 space-y-2">
              <label className="flex items-center gap-2 rounded-md border border-gray-300 p-3 text-sm has-[:checked]:border-brand-green has-[:checked]:bg-brand-green/5">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "transferencia"}
                  onChange={() => setPaymentMethod("transferencia")}
                />
                Pagar por transferencia
              </label>
              {paymentMethod === "transferencia" && (
                <button
                  type="button"
                  onClick={() => setShowBankModal(true)}
                  className="text-sm font-semibold text-brand-green hover:underline"
                >
                  Ver datos bancarios y subir comprobante →
                </button>
              )}
              <label className="flex items-center gap-2 rounded-md border border-gray-300 p-3 text-sm has-[:checked]:border-brand-green has-[:checked]:bg-brand-green/5">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "efectivo"}
                  onChange={() => setPaymentMethod("efectivo")}
                />
                Efectivo en el local
              </label>
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
            {loading ? "Enviando..." : "Enviar pedido por WhatsApp"}
          </button>
          <p className="text-center text-xs text-gray-500">
            Coordinamos la entrega y confirmamos el pago por WhatsApp. No se
            requiere cuenta para comprar.
          </p>
        </form>

        <div className="h-fit rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-black">Resumen del pedido</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between text-gray-600">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span className="font-medium text-black">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-base font-bold text-black">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </div>

      {showBankModal && (
        <BankTransferModal
          onClose={() => setShowBankModal(false)}
          onReceiptSelected={(file) => setReceiptName(file?.name ?? null)}
          receiptName={receiptName}
        />
      )}
    </div>
  );
}
