import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    userId: string;
  }

  interface User {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
  }
}
