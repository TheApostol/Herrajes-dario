"use client";

import { useState } from "react";
import type { ImportSummary } from "@/lib/csvImport";

export default function ImportarPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<ImportSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);
    setSummary(null);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/import", { method: "POST", body: formData });
    const data = await res.json();

    if (res.ok) {
      setSummary(data.summary);
    } else {
      setError(data.error ?? "Error al importar el archivo");
    }
    setLoading(false);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-black">Importar productos desde CSV</h1>
      <p className="mt-2 max-w-xl text-sm text-gray-600">
        Subí el archivo CSV exportado de Tienda Nube (separado por punto y
        coma). Los productos se actualizarán por slug si ya existen, o se
        crearán como nuevos.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 max-w-md space-y-4">
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="block w-full text-sm"
        />
        <button type="submit" disabled={!file || loading} className="btn-primary disabled:opacity-60">
          {loading ? "Importando..." : "Importar CSV"}
        </button>
      </form>

      {error && <p className="mt-6 text-sm text-red-600">{error}</p>}

      {summary && (
        <div className="mt-8 max-w-md rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-bold text-black">Resumen de la importación</h2>
          <ul className="mt-3 space-y-1 text-sm text-gray-700">
            <li>Productos insertados: <strong>{summary.inserted}</strong></li>
            <li>Productos actualizados: <strong>{summary.updated}</strong></li>
            <li>Grupos de imágenes duplicadas: <strong>{summary.duplicateImageGroups}</strong></li>
            <li>Errores: <strong>{summary.errors.length}</strong></li>
          </ul>
          {summary.errors.length > 0 && (
            <ul className="mt-3 max-h-48 space-y-1 overflow-y-auto text-xs text-red-600">
              {summary.errors.map((e, i) => (
                <li key={i}>Fila {e.row}: {e.message}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
