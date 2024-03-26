import NextAuth from "next-auth";
import type { Adapter } from "next-auth/adapters";

import type { User } from "@types/User";

declare module "next-auth" {
  interface Session {
    access_token: string;
    user: User;
  }

  interface Account {
    access_token: string;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    access_token: string;
    user: User;
  }
}
