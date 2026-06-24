import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://herrajesdario.com.ar";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Herrajes Darío | Herrajes y accesorios para muebles",
    template: "%s | Herrajes Darío",
  },
  description:
    "Herrajes Darío: más de 20 años de experiencia en herrajes y accesorios para muebles. Correderas, bisagras, manijas, iluminación LED y más.",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Herrajes Darío",
    description:
      "Herrajes y accesorios para muebles. Asesoramiento personalizado para carpinteros, fabricantes y profesionales.",
    images: ["/logo.png"],
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={inter.variable}>
      <body className="flex min-h-screen flex-col bg-white text-black antialiased">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
