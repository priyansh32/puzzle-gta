import { firestore } from "@/lib/firestore";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import NextAuth from "next-auth/next";
import GoogleProvier from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvier({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    }),
  ],
  adapter: FirestoreAdapter(firestore),
});
