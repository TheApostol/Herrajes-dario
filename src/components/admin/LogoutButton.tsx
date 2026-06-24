"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-md border border-white/30 px-3 py-1.5 text-sm font-medium hover:bg-white/10"
    >
      Cerrar sesión
    </button>
  );
}
