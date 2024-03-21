import type { NextAuthConfig } from "next-auth";
import type { User } from "@/types/User";
import { AdapterUser } from "next-auth/adapters";

export const authConfig = {
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.user = user as User;
        token.id = user.id ?? "";
      }
      if (account) {
        token.access_token = account.access_token;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user as AdapterUser & User;
      session.access_token = token.access_token;
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
