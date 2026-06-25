"use client";

import { useState } from "react";
import { BANK_INFO } from "@/lib/bankInfo";

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable, ignore
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 border-b border-gray-100 py-2 last:border-0">
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-semibold text-black">{value}</p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="shrink-0 rounded-md border border-gray-300 px-3 py-1 text-xs font-semibold text-gray-700 hover:border-brand-green hover:text-brand-green"
      >
        {copied ? "¡Copiado!" : "Copiar"}
      </button>
    </div>
  );
}

export default function BankTransferModal({
  onClose,
  onReceiptSelected,
  receiptName,
}: {
  onClose: () => void;
  onReceiptSelected: (file: File | null) => void;
  receiptName: string | null;
}) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-black">Transferencia bancaria</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="p-1 text-gray-400 hover:text-black"
          >
            ✕
          </button>
        </div>

        <p className="mt-2 text-sm text-gray-600">Cuenta Corriente</p>
        <div className="mt-2">
          <CopyRow label="Titular" value={BANK_INFO.titular} />
          <CopyRow label="CUIL" value={BANK_INFO.cuil} />
          <CopyRow label="CBU" value={BANK_INFO.cbu} />
          <CopyRow label="Alias" value={BANK_INFO.alias} />
        </div>

        <div className="mt-5 rounded-md bg-gray-50 p-4">
          <p className="text-sm font-semibold text-black">Subí el comprobante</p>
          <p className="mt-1 text-xs text-gray-500">
            Adjuntalo acá y volvé a enviarlo en el chat de WhatsApp para que
            podamos confirmar tu pago más rápido.
          </p>
          <label className="mt-3 flex cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 hover:border-brand-green hover:text-brand-green">
            {receiptName ? "Cambiar comprobante" : "Subir comprobante"}
            <input
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={(e) => onReceiptSelected(e.target.files?.[0] ?? null)}
            />
          </label>
          {receiptName && (
            <p className="mt-2 truncate text-xs text-brand-green">✓ {receiptName}</p>
          )}
        </div>

        <button type="button" onClick={onClose} className="btn-primary mt-5 w-full">
          Listo
        </button>
      </div>
    </div>
  );
}
