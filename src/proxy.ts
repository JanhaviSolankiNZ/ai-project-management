// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { signToken, verifyToken } from "./lib/jwt";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
    const response = NextResponse.next();

  // 1️⃣ Check backend JWT cookie
  const backendToken = req.cookies.get("token")?.value;

  if (backendToken) {
    const user = verifyToken(backendToken);
    if (user) return response;
  }

  // 2️⃣ If backend token missing, check NextAuth session
  const nextAuthToken = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!nextAuthToken?.userId) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 3️⃣ Create backend JWT from NextAuth session
  const newBackendToken = signToken({
    userId: nextAuthToken.userId as string,
  });

  response.cookies.set("token", newBackendToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/projects/:path*", "/tasks/:path*"],
};
