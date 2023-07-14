import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { firestore, storage } from "@/lib/firebase-server";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await GET(req, res);
    case "POST":
      return await POST(req, res);
    case "DELETE":
      return await DELETE(req, res);
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

async function DELETE(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const id = req.query.id;
    const puzzleRef = firestore.collection("puzzles").doc(id);
    const puzzle = await puzzleRef.get().then((doc) => doc.data());
    if (puzzle.userId === session.user.id) {

      // Delete all files in the specified directory
      const [files] = await storage.bucket().getFiles({ prefix: puzzle.directory });
      const deletePromises = files.map((file) => file.delete());
      await Promise.all(deletePromises);

      // Remove the directory itself if it is empty
      const directoryRef = storage.bucket().file(puzzle.directory);
      try {
        await directoryRef.delete();
      } catch (error) {
        console.log("Directory is not empty. Skipping deletion.");
      }

      // Delete the puzzle from the database
      await puzzleRef.delete();

      return res.json({ status: "success" });
    } else {
      return res.json({ status: "error", message: "Not authorized" });
    }
  } else {
    return res.json({ status: "error", message: "Not logged in" });
  }
}
