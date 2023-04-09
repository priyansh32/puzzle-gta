"use client";
import { UserContext } from "@/context/userContext";
import { useContext } from "react";

export default function Dashboard() {
  const user = useContext(UserContext);

  return (
    <div>
      <h1>Dashboard</h1>
      {user && (
        <div>
          <h2>Welcome {user.name}</h2>
          <p>Here is your dashboard</p>
        </div>
      )}
    </div>
  );
}
