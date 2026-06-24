import fs from "fs";
import path from "path";
import { importProductsFromCsv } from "../src/lib/csvImport";
import { prisma } from "../src/lib/prisma";

async function main() {
  const csvPath = path.join(__dirname, "productos.csv");
  const csvText = fs.readFileSync(csvPath, "utf-8");
  const summary = await importProductsFromCsv(csvText);

  console.log(`Importación completa:`);
  console.log(`  Insertados: ${summary.inserted}`);
  console.log(`  Actualizados: ${summary.updated}`);
  console.log(`  Grupos de imágenes duplicadas: ${summary.duplicateImageGroups}`);
  if (summary.errors.length) {
    console.log(`  Errores: ${summary.errors.length}`);
    summary.errors.forEach((e) => console.log(`    Fila ${e.row}: ${e.message}`));
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
