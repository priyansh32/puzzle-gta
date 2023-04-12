"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function LoginButton() {
  let callbackUrl = usePathname();
  console.log(callbackUrl);
  if (callbackUrl === "/home") {
    callbackUrl = "/app";
  }
  return (
    <button
      onClick={() => {
        signIn("google", { callbackUrl: callbackUrl });
      }}
      className='inline-flex shadow items-center justify-center px-5 py-3 border border-transparent text-base bg-white text-black font-medium rounded-md'
    >
      <div className='mr-2'>
        <Image
          src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
          width={24}
          height={24}
          alt='Google logo'
        />
      </div>
      Login with Google
    </button>
  );
}
