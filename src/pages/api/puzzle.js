import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { firestore } from "@/lib/firestore";

export default async function handler(req, res) {
  // call different function based on request method
  switch (req.method) {
    case "GET":
      return await GET(req, res);
    case "POST":
      return await POST(req, res);
    default:
      return NextResponse.notFound();
  }
}

// write a POST route that accepts a JSON body
async function POST(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    // req.body is a readable stream
    // convert it to a JSON object

    const { title, images, directory } = req.body;

    // create a new puzzle document in firestore
    const newPuzzleRef = firestore.collection("puzzles").doc();

    const data = {
      title,
      images,
      directory,
      userId: session.user.id,
      createdAt: new Date(),
    };

    console.log(data);
    const result = await newPuzzleRef.set(data).then(async () => {
      return newPuzzleRef.get().then((doc) => doc.data());
    });

    return res.json({ result });
  } else {
    return res.redirect(403, `${process.env.URL}/api/auth/signin`);
  }
}

async function GET(req, res) {
  // fetch puzzle with id from firestore
  const id = req.query.id;
  console.log(id);
  const puzzleRef = firestore.collection("puzzles").doc(id);
  const puzzle = await puzzleRef.get().then((doc) => doc.data());
  return res.json({ puzzle });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};
