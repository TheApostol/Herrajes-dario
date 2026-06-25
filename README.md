# Herrajes Darío — Tienda online

Tienda online para Herrajes Darío, construida con Next.js 14 (App Router),
TypeScript, Tailwind CSS y Prisma.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- PostgreSQL + Prisma ORM
- iron-session (auth de administrador basada en cookies, sin JWT)
- papaparse para la importación de productos desde CSV

## Requisitos

- Node.js 18+
- Una base de datos PostgreSQL (local, Railway o Supabase)

## Configuración local

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Copiar el archivo de variables de entorno y completarlo:

   ```bash
   cp .env.example .env
   ```

   Variables:
   - `DATABASE_URL`: connection string de PostgreSQL.
   - `ADMIN_USERNAME` / `ADMIN_PASSWORD`: credenciales del panel de administración (por defecto `HD` / `herrajeshd`).
   - `SESSION_SECRET`: string aleatorio de al menos 32 caracteres para firmar la cookie de sesión.
   - `NEXT_PUBLIC_SITE_URL`: URL pública del sitio (usada en metadata y sitemap).

3. Crear las tablas en la base de datos:

   ```bash
   npx prisma migrate dev --name init
   ```

4. Importar los 428 productos desde el CSV incluido (`prisma/productos.csv`):

   ```bash
   npm run seed
   ```

5. Iniciar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   La tienda queda disponible en `http://localhost:3000` y el panel de
   administración en `http://localhost:3000/admin`.

## Panel de administración

- URL: `/admin`
- Usuario: `HD`
- Contraseña: `herrajeshd`

Desde el panel se puede:
- Ver, crear, editar y eliminar productos.
- Activar/desactivar productos en la tienda.
- Importar o re-importar el catálogo desde un archivo CSV (`/admin/importar`).
- Ver productos con imágenes duplicadas (badge amarillo) para actualizarlas manualmente.

La importación de CSV crea automáticamente las categorías y marcas que no
existan, y actualiza los productos existentes según su slug (columna
"Identificador de URL").

## Checkout

El checkout es 100% por WhatsApp, sin pasarela de pago online:

1. El comprador completa nombre, teléfono y email (opcional) y elige forma
   de pago (transferencia bancaria o efectivo en el local). No se requiere
   cuenta.
2. Si elige transferencia, puede ver los datos de la cuenta y subir el
   comprobante desde un modal.
3. Al confirmar, se guarda el pedido en la base de datos (`Order`) y se abre
   WhatsApp con el detalle completo del pedido para coordinar con un
   operador.

## Deploy

### Base de datos (Railway o Supabase)

1. Crear un proyecto de PostgreSQL en Railway o Supabase.
2. Copiar el `DATABASE_URL` provisto.
3. Ejecutar las migraciones contra la base de producción:

   ```bash
   npx prisma migrate deploy
   ```

4. Correr el seed una sola vez para cargar el catálogo inicial:

   ```bash
   npm run seed
   ```

### Frontend + API (Vercel)

1. Importar el repositorio en Vercel.
2. Configurar las variables de entorno del `.env.example` en el proyecto de Vercel.
3. El build command ya está definido en `vercel.json` (`prisma generate && next build`).
4. Deploy.

## Estructura del proyecto

```
prisma/
  schema.prisma       Modelos de datos (Product, Category, Brand, Order)
  seed.ts              Script de importación inicial del CSV
  productos.csv        Catálogo de 428 productos
src/
  app/                 Rutas (App Router): tienda, checkout, admin, API
  components/          Componentes de la tienda y del panel de admin
  lib/                 Prisma client, sesión, utilidades, importador CSV
  types/               Tipos compartidos (carrito)
```

## Notas

- El carrito se persiste en `localStorage`, no requiere base de datos.
- Las imágenes de producto se sirven directamente desde Google Drive
  (`drive.google.com/uc?export=view&id=...`), sin necesidad de migrarlas.
- Desde el panel de admin también se puede subir una imagen directamente
  (JPG/PNG/WEBP/GIF, hasta 5MB) en lugar de pegar una URL. Esto usa
  [Vercel Blob](https://vercel.com/docs/storage/vercel-blob): hay que
  activar un "Blob store" desde el dashboard de Vercel y conectarlo al
  proyecto (esto agrega automáticamente la variable `BLOB_READ_WRITE_TOKEN`).
  Sin esa variable configurada, la opción "Subir imagen" no funciona pero
  la opción "URL" sigue funcionando igual que antes.
- Los productos con la misma URL de imagen quedan marcados con
  `hasDuplicateImage: true` para que el dueño de la tienda pueda
  reemplazarlas más adelante.
