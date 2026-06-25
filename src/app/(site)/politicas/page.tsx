import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de ventas y garantías",
  description:
    "Política de ventas, garantías, reclamos y responsabilidad de Herrajes Darío.",
};

export default function PoliticasPage() {
  return (
    <div className="container-hd py-10">
      <h1 className="section-title">
        Política de ventas, garantías, reclamos y responsabilidad
      </h1>
      <p className="mt-1 text-sm text-gray-500">Herrajes Darío — Última actualización: Junio 2026</p>

      <div className="prose-policy mt-8 max-w-3xl space-y-8 text-sm leading-relaxed text-gray-700">
        <section>
          <h2 className="text-base font-bold text-black">1. Aceptación de las condiciones</h2>
          <p className="mt-2">
            Toda compra realizada en Herrajes Darío implica la aceptación plena de las presentes
            condiciones de venta, garantías, reclamos, limitaciones de responsabilidad y demás
            términos comerciales.
          </p>
          <p className="mt-2">
            La realización de un pedido, la emisión de una factura o la recepción de la mercadería
            constituyen aceptación expresa de estas condiciones.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black">2. Productos y especificaciones</h2>
          <p className="mt-2">
            Las fotografías, imágenes, renders, catálogos, muestras y descripciones tienen carácter
            ilustrativo.
          </p>
          <p className="mt-2">
            Los productos pueden presentar leves diferencias de color, terminación, textura,
            embalaje o detalles de fabricación propios de los procesos industriales, sin que ello
            constituya un defecto.
          </p>
          <p className="mt-2">
            Las medidas, especificaciones técnicas, compatibilidades y aplicaciones deberán ser
            verificadas por el comprador antes de realizar la compra y antes de la instalación.
          </p>
          <p className="mt-2">
            Herrajes Darío no garantiza la compatibilidad de los productos con aplicaciones,
            muebles, puertas, estructuras o proyectos específicos que no hayan sido expresamente
            evaluados por la empresa.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black">3. Política de reclamos y devoluciones</h2>
          <p className="mt-2">
            Herrajes Darío no acepta devoluciones por arrepentimiento, cambio de decisión, error de
            compra, incompatibilidad, equivocación en medidas, modelos, terminaciones, colores o
            cualquier otra circunstancia ajena a un defecto del producto.
          </p>
          <p className="mt-2">No se aceptarán devoluciones de mercadería por decisión unilateral del cliente.</p>
          <p className="mt-2">Únicamente podrán realizarse reclamos cuando exista alguna de las siguientes situaciones:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Defecto de fabricación.</li>
            <li>Producto dañado al momento de la entrega.</li>
            <li>Faltante de piezas o componentes.</li>
            <li>Error comprobable en el despacho o entrega.</li>
            <li>Producto distinto al efectivamente adquirido.</li>
          </ul>
          <p className="mt-2">El cliente deberá inspeccionar la mercadería al momento de la recepción.</p>
          <p className="mt-2">
            Todo reclamo deberá realizarse dentro de las cuarenta y ocho (48) horas de recibida la
            mercadería.
          </p>
          <p className="mt-2">Para su evaluación podrán solicitarse:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Factura o comprobante de compra.</li>
            <li>Fotografías.</li>
            <li>Videos.</li>
            <li>Número de lote.</li>
            <li>Devolución del producto.</li>
            <li>Inspección técnica.</li>
          </ul>
          <p className="mt-2">La aceptación del reclamo quedará sujeta a la verificación por parte de Herrajes Darío.</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black">4. Exclusiones de reclamos</h2>
          <p className="mt-2">No se aceptarán reclamos respecto de productos:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Instalados.</li>
            <li>Utilizados.</li>
            <li>Cortados.</li>
            <li>Perforados.</li>
            <li>Modificados.</li>
            <li>Pintados.</li>
            <li>Desarmados.</li>
            <li>Golpeados.</li>
            <li>Dañados por terceros.</li>
            <li>Utilizados incorrectamente.</li>
            <li>Expuestos a humedad, agentes químicos o ambientes inadecuados.</li>
          </ul>
          <p className="mt-2">
            Tampoco se aceptarán reclamos derivados de errores de medición, cálculo o selección
            realizados por el cliente, instalador, arquitecto, diseñador, carpintero o tercero
            interviniente.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black">5. Garantía</h2>
          <p className="mt-2">La garantía cubre exclusivamente defectos de fabricación.</p>
          <p className="mt-2">La responsabilidad de Herrajes Darío se limitará, a su exclusivo criterio, a:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Reparar el producto.</li>
            <li>Sustituirlo por otro igual o equivalente.</li>
            <li>Entregar piezas faltantes.</li>
            <li>Emitir nota de crédito.</li>
            <li>Reintegrar el valor abonado.</li>
          </ul>
          <p className="mt-2">La garantía no incluye:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Mano de obra.</li>
            <li>Instalación.</li>
            <li>Desinstalación.</li>
            <li>Traslados.</li>
            <li>Lucro cesante.</li>
            <li>Daños indirectos.</li>
            <li>Pérdidas comerciales.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-black">6. Instalación</h2>
          <p className="mt-2">Los productos deberán ser instalados por personal idóneo y capacitado.</p>
          <p className="mt-2">Herrajes Darío no será responsable por:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Errores de instalación.</li>
            <li>Instalaciones defectuosas.</li>
            <li>Daños en muebles.</li>
            <li>Daños en puertas.</li>
            <li>Daños estructurales.</li>
            <li>Costos de mano de obra.</li>
            <li>Desmontajes.</li>
            <li>Reinstalaciones.</li>
          </ul>
          <p className="mt-2">
            Toda recomendación técnica brindada por la empresa tendrá carácter orientativo y no
            sustituirá la evaluación profesional del instalador.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black">7. Envíos y recepción</h2>
          <p className="mt-2">La mercadería deberá ser revisada al momento de la entrega.</p>
          <p className="mt-2">
            Toda observación relacionada con daños visibles del transporte deberá dejarse asentada
            al recibir el pedido.
          </p>
          <p className="mt-2">
            Una vez entregada la mercadería al transporte o al comprador, los riesgos derivados del
            traslado se considerarán transferidos al destinatario, salvo pacto expreso en
            contrario.
          </p>
          <p className="mt-2">
            Los plazos de entrega son estimativos y podrán variar por razones logísticas,
            climáticas, operativas o de fuerza mayor.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black">8. Stock y precios</h2>
          <p className="mt-2">La disponibilidad de productos se encuentra sujeta al stock existente.</p>
          <p className="mt-2">
            Los precios, promociones, descuentos y condiciones comerciales podrán modificarse sin
            previo aviso.
          </p>
          <p className="mt-2">
            Las cotizaciones y presupuestos tendrán la vigencia indicada en cada propuesta.
          </p>
          <p className="mt-2">
            Herrajes Darío podrá cancelar operaciones originadas por errores de publicación,
            errores de sistemas, faltantes de stock o circunstancias ajenas a la empresa.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black">9. Limitación de responsabilidad</h2>
          <p className="mt-2">
            La responsabilidad total de Herrajes Darío, cualquiera sea su causa, quedará limitada al
            importe efectivamente abonado por el producto involucrado.
          </p>
          <p className="mt-2">En ningún caso la empresa será responsable por:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Lucro cesante.</li>
            <li>Pérdida de producción.</li>
            <li>Daños indirectos.</li>
            <li>Pérdida de ganancias.</li>
            <li>Daños a terceros.</li>
            <li>Costos de obra.</li>
            <li>Retrasos de obra.</li>
            <li>Perjuicios comerciales.</li>
            <li>Daños consecuenciales.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-black">10. Defensa del consumidor</h2>
          <p className="mt-2">
            Las presentes condiciones se interpretarán de conformidad con la legislación vigente de
            la República Argentina, incluyendo:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Ley 24.240 de Defensa del Consumidor.</li>
            <li>Código Civil y Comercial de la Nación.</li>
            <li>Normativa complementaria aplicable.</li>
          </ul>
          <p className="mt-2">
            Cuando la normativa de orden público establezca derechos irrenunciables para el
            consumidor, éstos prevalecerán sobre cualquier disposición en contrario.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-black">11. Jurisdicción</h2>
          <p className="mt-2">
            Toda controversia derivada de la relación comercial será sometida a la jurisdicción de
            los tribunales competentes de la República Argentina, conforme la legislación vigente.
          </p>
        </section>

        <section className="rounded-lg border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-base font-bold text-black">Datos de contacto</h2>
          <dl className="mt-3 space-y-1">
            <div>
              <dt className="inline font-semibold text-black">Dirección: </dt>
              <dd className="inline">Juan XXIII 2096, Burzaco, Provincia de Buenos Aires</dd>
            </div>
            <div>
              <dt className="inline font-semibold text-black">Teléfono / WhatsApp: </dt>
              <dd className="inline">11 3350-4178</dd>
            </div>
            <div>
              <dt className="inline font-semibold text-black">Horario de atención: </dt>
              <dd className="inline">Lunes a Viernes de 9 a 17 hs</dd>
            </div>
          </dl>
        </section>

        <p className="text-xs text-gray-400">© 2026 Herrajes Darío. Todos los derechos reservados.</p>
      </div>
    </div>
  );
}
