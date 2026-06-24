import { NextRequest, NextResponse } from "next/server";
import { importProductsFromCsv } from "@/lib/csvImport";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No se recibió ningún archivo" }, { status: 400 });
  }

  const csvText = await file.text();

  try {
    const summary = await importProductsFromCsv(csvText);
    return NextResponse.json({ summary });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error al procesar el archivo" },
      { status: 500 }
    );
  }
}
