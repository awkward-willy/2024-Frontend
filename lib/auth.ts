import NextAuth, { type NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";

import { authConfig } from "@lib/auth.config";
import env from "@lib/env";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    GitHub({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: { scope: "public_repo" },
      },
      profile(profile) {
        return {
          accountName: profile.login,
          id: profile.id.toString(),
          username: profile.name,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
} satisfies NextAuthConfig);
