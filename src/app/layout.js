"use client";
import "./globals.css";

const user = {
  name: "Emily Selman",
  email: "emily.selman@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

export default function RootLayout({ children }) {
  // get serversession

  return (
    <html className='h-full bg-white'>
      <body className='h-full'>{children}</body>
    </html>
  );
}
