import { signOut } from "next-auth/react";

export async function logout() {
  // Clear custom JWT cookie
  await fetch("/api/auth/logout", { method: "POST" });

  // Clear NextAuth session (Google)
  await signOut({ redirect: false });

  // Force navigation
  window.location.href = "/login";
}
