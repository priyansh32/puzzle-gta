"use client";
import { UserContext } from "@/context/userContext";
import { useContext } from "react";

export default function Dashboard() {
  const user = useContext(UserContext);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{user.email}</p>
    </div>
  );
}
