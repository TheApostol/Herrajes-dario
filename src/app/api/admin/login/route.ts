import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const session = await getSession();
    session.isLoggedIn = true;
    session.username = username;
    await session.save();
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Usuario o contraseña incorrectos" }, { status: 401 });
}
