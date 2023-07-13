"use client";
import { UserContext } from "@/context/userContext";
import getDownloadURLs from "@/utils/getDownloadURLs";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";

export default function Dashboard() {
  const user = useContext(UserContext);
  const [ogdURLS, setOgdURLS] = useState([]);

  useEffect(() => {
    if (user) {
      const directoryArray = user.puzzles.map((puzzle) => puzzle.directory);
      const namesArray = user.puzzles.map((puzzle) => puzzle.original);
      getDownloadURLs(directoryArray, namesArray).then((urls) => {
        setOgdURLS(urls);
      });

    }
  }, [user]);

  return (
    <div>
    <h1 className="text-2xl font-bold">Dashboard</h1>
    {user && (
      <div>
        <h2 className="text-xl font-bold mt-4">Welcome {user.name}</h2>
        <p className="text-lg mt-4">PUZZLES:</p>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {user.puzzles.map((puzzle, i) => {
            return (
              <div key={i} className="border rounded p-4">
                <Link href={`/app/play/${puzzle.id}`} className="block text-blue-600 font-bold mb-2">
                    {puzzle.title}
                <div className="w-40 h-40 mx-auto">
                  <Image
                    src={ogdURLS[i] || "/tail-spin.svg"}
                    width={160}
                    height={160}
                    alt={puzzle.title}
                    className="object-cover"
                  />
                </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    )}
  </div>
  );
}
