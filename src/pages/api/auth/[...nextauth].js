import { firestore } from "@/lib/firestore";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import NextAuth from "next-auth/next";
import GoogleProvier from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvier({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    }),
  ],
  adapter: FirestoreAdapter(firestore),
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
