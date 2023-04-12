import { firestore } from "@/lib/firebase-server";
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
  // return id along with user session
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
