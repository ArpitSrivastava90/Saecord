"use client";

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { EncryptionText } from "../_components/animated-text";
import { SigninForm } from "../_components/signin-form";
import SigninDeskForm from "../_components/desk-signin-form";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const Page = () => {
  return (
    <div className="w-full h-screen bg-black text-white flex flex-col items-center pt-8 space-y-6">
      <h1 className={cn("text-2xl sm:text-3xl md:text-5xl", font.className)}>
        Saecord
      </h1>

      <div className="animated-txt min-h-[2.5rem] sm:min-h-[2.8rem] md:min-h-[3.5rem] mt-4 text-lg sm:text-xl md:text-3xl text-gray-400 font-mono text-center px-4">
        <EncryptionText text="Welcome Back" />
      </div>

      <div className="flex flex-col items-center w-full flex-grow  overflow-hidden">
        <SigninForm />
        <SigninDeskForm />
      </div>
    </div>
  );
};

export default Page;
