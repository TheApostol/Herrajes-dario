import { whatsappLink } from "@/lib/utils";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink("Hola! Quiero consultar sobre un producto de Herrajes Darío.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M16.04 4C9.4 4 4 9.4 4 16.04c0 2.4.7 4.64 1.92 6.52L4.3 28l5.6-1.5a11.94 11.94 0 0 0 6.14 1.68C22.68 28.18 28 22.78 28 16.13 28 9.48 22.68 4 16.04 4Zm0 21.78a9.8 9.8 0 0 1-5-1.37l-.36-.2-3.32.9.9-3.23-.23-.37a9.74 9.74 0 0 1-1.49-5.27c0-5.4 4.4-9.78 9.8-9.78a9.78 9.78 0 0 1 0 19.32Zm5.36-7.32c-.3-.15-1.75-.86-2-.96-.27-.1-.47-.15-.66.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.75-1.63-2.05-.17-.3-.02-.46.13-.61.15-.15.3-.37.45-.56.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.65-1.56-.9-2.13-.23-.55-.47-.48-.65-.49h-.55c-.18 0-.47.07-.72.37-.25.3-.96.94-.96 2.28 0 1.35.98 2.65 1.12 2.84.15.2 1.9 2.9 4.62 3.96 2.72 1.07 2.72.7 3.2.66.5-.05 1.55-.63 1.77-1.24.22-.6.22-1.12.15-1.24-.07-.1-.27-.17-.57-.32Z" />
      </svg>
    </a>
  );
}
