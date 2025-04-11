import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import client from "./lib/db-client";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      _id: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  session: { strategy: "jwt" },
  callbacks: {
    session({ session, token }) {
      session.user._id = token.sub!;
      return session;
    },
  },
  ...authConfig,
});
