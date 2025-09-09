"use client";

import { cn } from "@/lib/utils";
import { SignupForm } from "../_components/signup-from";
import { Poppins } from "next/font/google";
import { EncryptionText } from "../_components/animated-text";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const Page = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col items-center py-8 space-y-6">
      <h1 className={cn("text-2xl sm:text-3xl md:text-5xl", font.className)}>
        Saecord
      </h1>

      <div className="animated-txt mt-4 text-lg sm:text-xl md:text-3xl text-gray-400 font-mono text-center px-4">
        <EncryptionText text="Welcome to my Project" />
      </div>

      <SignupForm />
    </div>
  );
};

export default Page;
