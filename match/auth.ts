import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/db";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(clientPromise),
  trustHost: true,
  session: { strategy: "jwt" },
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
