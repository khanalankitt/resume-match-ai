import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),

  session: { strategy: "jwt" },

  providers: [Google, GitHub],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  events: {
    async signIn({ user }) {
      if (!user.id) return;
      const client = await clientPromise;
      const db = client.db();
      await db.collection("users").updateOne(
        { _id: new ObjectId(user.id) },
        {
          $set: { lastLoginAt: new Date() },
          $setOnInsert: { createdAt: new Date() },
        },
      );
    },
  },
});
