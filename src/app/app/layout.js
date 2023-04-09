"use client";
import AppLayout from "@/components/AppLayout";
import { SessionProvider } from "next-auth/react";

export default function Layout({ children, session }) {
  return (
    <SessionProvider session={session}>
      <AppLayout>{children}</AppLayout>
    </SessionProvider>
  );
}
