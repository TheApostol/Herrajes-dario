# Herrajes Darío — Entrega del sitio web

## Resumen

Se desarrolló la tienda online de Herrajes Darío: catálogo de productos
organizado por categorías y marcas, carrito de compras, y un checkout
100% coordinado por WhatsApp (sin pasarela de pago online). También se
construyó un panel de administración privado para gestionar el catálogo
sin necesidad de tocar código.

## Dominio personalizado

El sitio ya está funcionando en una URL provisoria de Vercel. El dominio
**herrajesdario.com.ar** (ya pagado) va a quedar conectado al sitio
dentro de las próximas 48 horas, una vez que se complete la delegación
de DNS hacia Vercel. Cuando esto termine, el sitio va a responder
directamente en `https://herrajesdario.com.ar` sin pasos adicionales de
tu parte.

## Cómo funciona el catálogo

- **Categorías** (Bisagras, Correderas, Manijas y Tiradores, Accesorios
  de Cocina, Accesorios de Placard, Hogar y Obra, Iluminación LED,
  Pistones a Gas): se crean automáticamente cuando se importa el CSV o
  cuando se agrega un producto nuevo con una categoría que todavía no
  existe.
- **Marcas**: funcionan igual que las categorías, se crean solas al
  escribir un nombre nuevo en el formulario de producto.
- **Productos sin foto**: si un producto no tiene imagen cargada, el
  sitio muestra automáticamente el logo de Herrajes Darío como imagen
  de reemplazo (en la grilla de productos y en la página de detalle),
  para que nunca se vea un espacio vacío o roto.

## Panel de administración

### Cómo entrar

1. Ir a `/admin` (por ejemplo `https://herrajesdario.com.ar/admin`).
2. Ingresar usuario y contraseña.
   - Usuario por defecto: `HD`
   - Contraseña por defecto: `herrajeshd`
   - **Importante**: estas son las credenciales de fábrica. Te
     recomiendo pedirme que las cambiemos por unas propias antes de
     compartir el panel con más gente, ya que estas quedaron
     documentadas durante el desarrollo.
3. Si se ingresa mal la contraseña 5 veces, el sistema bloquea los
   intentos durante 15 minutos como medida de seguridad.

### Dashboard (pantalla principal)

Muestra de un vistazo: productos totales, productos activos, productos
sin stock, productos con imagen duplicada, y cantidad de pedidos
recibidos. Desde ahí hay accesos directos a "Ver productos", "Agregar
producto" e "Importar CSV".

### Ver y buscar productos

En "Productos" aparece el listado completo con nombre, categoría,
marca, precio, stock y estado (Activo/Inactivo). Se puede buscar por
nombre o SKU con el buscador de arriba.

- **Activar/Desactivar**: un producto inactivo deja de mostrarse en la
  tienda, pero no se borra (útil para productos de temporada o sin
  stock por un tiempo).
- **Eliminar**: borra el producto definitivamente. Pide confirmación
  antes de borrar.

### Agregar o editar un producto

Desde "Agregar producto" o haciendo clic en el nombre de un producto
existente, se abre un formulario con:

- Nombre, precio, precio promocional (opcional), SKU, stock.
- Categoría y Marca: son campos de texto con autocompletado. Si
  escribís un nombre que ya existe, lo asocia. Si escribís un nombre
  nuevo, lo crea automáticamente — no hace falta crear categorías o
  marcas en otro lado.
- Imagen del producto, con dos opciones:
  - **URL**: pegar un link de imagen (por ejemplo de Google Drive).
  - **Subir imagen**: subir un archivo JPG, PNG, WEBP o GIF directo
    desde la computadora o el celular (hasta 5MB). Se sube
    automáticamente y se ve una vista previa.
- Descripción, título y descripción para SEO (lo que se muestra en
  buscadores como Google), peso y tags.
- Casillero "Mostrar en tienda": equivale a Activar/Desactivar.

### Importar productos desde CSV

En "Importar CSV" se puede subir un archivo CSV exportado de Tienda
Nube (separado por punto y coma). El sistema:
- Crea los productos nuevos.
- Actualiza los productos existentes (los identifica por su slug /
  identificador de URL), sin duplicar.
- Crea automáticamente las categorías y marcas que aparezcan en el
  archivo y todavía no existan.
- Al final muestra un resumen: cuántos se insertaron, cuántos se
  actualizaron, y si hubo errores en alguna fila.

Esta es la forma más rápida de cargar o actualizar muchos productos a
la vez, en lugar de hacerlo uno por uno.

### Pedidos

Los pedidos no se pagan en el sitio: el cliente completa sus datos en
el checkout, elige transferencia o efectivo, y al confirmar se abre
WhatsApp con el detalle completo del pedido para coordinar con un
operador. El dashboard del admin muestra cuántos pedidos se generaron,
pero la gestión y el seguimiento de cada pedido (confirmar pago,
coordinar envío, etc.) se hace directamente por WhatsApp, como ya se
viene trabajando.

## Recomendaciones

- Cambiar la contraseña de administrador por una propia.
- Revisar de tanto en tanto los productos marcados con "Imagen
  duplicada" (aparecen con una etiqueta amarilla en el listado) para
  reemplazar esas fotos cuando se pueda.
- Cualquier cambio de textos, secciones o funcionalidad del sitio se
  puede seguir pidiendo y se implementa sin tocar la base de datos ni
  el catálogo cargado.
