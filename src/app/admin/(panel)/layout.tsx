import Link from "next/link";
import Image from "next/image";
import LogoutButton from "@/components/admin/LogoutButton";

const NAV_LINKS = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/productos", label: "Productos" },
  { href: "/admin/pedidos", label: "Pedidos" },
  { href: "/admin/importar", label: "Importar CSV" },
];

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-black text-white">
        <div className="container-hd flex h-14 items-center justify-between gap-4">
          <Link href="/admin/dashboard" className="flex shrink-0 items-center gap-2">
            <Image src="/logo.png" alt="Herrajes Darío" width={26} height={26} className="invert" />
            <span className="text-sm font-bold">Admin</span>
          </Link>
          <LogoutButton />
        </div>
        <nav className="container-hd flex gap-5 overflow-x-auto border-t border-white/10 py-2.5 text-sm">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="shrink-0 whitespace-nowrap hover:text-brand-gold">
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="container-hd py-8">{children}</main>
    </div>
  );
}
