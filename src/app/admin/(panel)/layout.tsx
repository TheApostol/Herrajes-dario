import Link from "next/link";
import Image from "next/image";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-black text-white">
        <div className="container-hd flex h-16 items-center gap-6">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Herrajes Darío" width={32} height={32} className="invert" />
            <span className="text-sm font-bold">Admin</span>
          </Link>
          <nav className="flex flex-1 gap-5 text-sm">
            <Link href="/admin/dashboard" className="hover:text-brand-gold">Dashboard</Link>
            <Link href="/admin/productos" className="hover:text-brand-gold">Productos</Link>
            <Link href="/admin/importar" className="hover:text-brand-gold">Importar CSV</Link>
          </nav>
          <LogoutButton />
        </div>
      </header>
      <main className="container-hd py-8">{children}</main>
    </div>
  );
}
