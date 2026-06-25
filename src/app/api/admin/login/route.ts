import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { isRateLimited, recordFailedAttempt, clearAttempts } from "@/lib/rateLimit";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Demasiados intentos. Probá de nuevo en unos minutos." },
      { status: 429 }
    );
  }

  const { username, password } = await request.json();

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    clearAttempts(ip);
    const session = await getSession();
    session.isLoggedIn = true;
    session.username = username;
    await session.save();
    return NextResponse.json({ ok: true });
  }

  recordFailedAttempt(ip);
  return NextResponse.json({ error: "Usuario o contraseña incorrectos" }, { status: 401 });
}
