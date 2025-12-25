import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    userId: string;
    backendToken: string;
  }

  interface User {
    id: string;
  }

  interface JWT {
    userId: string;
    backendToken: string;
  }
}
