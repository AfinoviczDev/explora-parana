import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // credenciais seguras definidas em variáveis de ambiente
  const validUser = process.env.ADMIN_USER || "admin";
  const validPass = process.env.ADMIN_PASS || "123456";

  if (username === validUser && password === validPass) {
    const res = NextResponse.json({ success: true });
    res.cookies.set("isAdminAuthenticated", "true", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 dia
    });
    return res;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
