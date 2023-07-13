import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { firestore } from "@/lib/firebase-server";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await GET(req, res);
    case "POST":
      return await POST(req, res);
    default:
      return NextResponse.notFound();
  }
}

async function POST(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const { title, images, directory, original } = req.body;

    const newPuzzleRef = firestore.collection("puzzles").doc();

    const data = {
      title,
      images,
      directory,
      original,
      userId: session.user.id,
      createdAt: new Date(),
    };

    console.log(data);
    const newPuzzle = await newPuzzleRef.set(data).then(async () => {
      return newPuzzleRef.get().then((doc) => {
        return { id: doc.id, ...doc.data() };
      });
    });

    return res.json({ status: "success", puzzle: newPuzzle });
  } else {
    return res.json({ status: "error", message: "Not logged in" });
  }
}

async function GET(req, res) {
  const id = req.query.id;
  const puzzleRef = firestore.collection("puzzles").doc(id);
  const puzzle = await puzzleRef.get().then((doc) => doc.data());
  return res.json({ status: "success", puzzle });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};
