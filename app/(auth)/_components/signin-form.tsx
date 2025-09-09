"use client";

import { SigninSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { z } from "zod";
import Link from "next/link";

type SigninFormData = z.infer<typeof SigninSchema>;

export const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SigninFormData>({
    resolver: zodResolver(SigninSchema),
    mode: "onBlur",
  });

  const onSubmit = (data: SigninFormData) => {
    console.log("Sign In Submitted ✅", data);
    reset();
  };

  return (
    <div className="w-full md:hidden max-w-sm mt-20 border  border-gray-800 rounded-xl p-6 flex flex-col items-center bg-black/40 backdrop-blur">
      <h1 className="text-2xl md:text-4xl font-bold text-white tracking-wide">
        Welcome Back
      </h1>
      <p className="text-gray-400 text-sm mt-1">Sign in to continue</p>
      <div className="w-full flex justify-center gap-4 mt-6">
        <button className="flex items-center justify-center gap-2 w-1/2 h-10 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition">
          <FaGoogle className="text-red-500" />
          <span className="text-sm font-medium">Google</span>
        </button>

        <button className="flex items-center justify-center gap-2 w-1/2 h-10 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition">
          <FiGithub className="text-xl" />
          <span className="text-sm font-medium">GitHub</span>
        </button>
      </div>

      <div className="w-full flex items-center my-5">
        <hr className="flex-grow border-gray-700" />
        <span className="px-3 text-gray-500 text-sm">OR</span>
        <hr className="flex-grow border-gray-700" />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col space-y-4"
      >
        <div>
          <input
            {...register("email")}
            type="email"
            placeholder="E-mail"
            className="w-full h-11 bg-gray-900 outline-none px-3 text-white rounded-md border border-gray-700 focus:border-cyan-500 transition"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full h-11 bg-gray-900 outline-none px-3 text-white rounded-md border border-gray-700 focus:border-cyan-500 transition"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 bg-cyan-600 text-white rounded-md font-medium hover:bg-cyan-700 transition disabled:opacity-50"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="text-gray-400 text-sm mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-cyan-400 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};
