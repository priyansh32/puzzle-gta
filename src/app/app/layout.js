"use client";
import AppLayout from "@/components/AppLayout";
import { SessionProvider } from "next-auth/react";
import UserContextProvider from "@/context/userContext";

export default function Layout({ children, session }) {
  return (
    <SessionProvider session={session}>
      <UserContextProvider>
        <AppLayout>{children}</AppLayout>
      </UserContextProvider>
    </SessionProvider>
  );
}
