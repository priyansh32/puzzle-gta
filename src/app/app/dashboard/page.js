"use client";
import { UserContext } from "@/context/userContext";
import Link from "next/link";
import { useContext } from "react";

export default function Dashboard() {
  const user = useContext(UserContext);
  return (
    <div>
      <h1>Dashboard</h1>
      {user && (
        <div>
          <h2>Welcome {user.name}</h2>
          <p>PUZZLES:</p>
          {user.puzzles.map((puzzle, i) => {
            return (
              <Link key={i} href={`app/play/${puzzle.id}`}>
                {puzzle.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
