import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { firestore } from "@/lib/firestore";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    // get user from firestore by userId
    /*
    const user = await firestore
      .collection("users")
      .doc(session.user.id)
      .get()
      .then((doc) => doc.data())
      .catch((error) => console.log(error));
      */

    const userRef = firestore.collection("users").doc(session.user.id);
    const updatedUser = await userRef
      .update({
        lastLogin: new Date(),
      })
      .then(async () => {
        return userRef.get().then((doc) => doc.data());
      });

    const puzzles = await firestore
      .collection("puzzles")
      .where("userId", "==", session.user.id)
      .select("title")
      .get()
      .then((querySnapshot) => {
        const puzzles = [];
        querySnapshot.forEach((doc) => {
          puzzles.push({ id: doc.id, ...doc.data() });
        });
        return puzzles;
      });

    return res.json({ id: session.user.id, ...updatedUser, puzzles });
  } else {
    return res.redirect(403, `${process.env.URL}/api/auth/signin`);
  }
}
