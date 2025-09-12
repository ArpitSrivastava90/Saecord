"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { SignupSchema } from "@/lib/validations";
import { z } from "zod";
import Link from "next/link";
import { ButtonForm } from "./button-com";
import { api } from "@/lib/api";
import { InputField } from "./input-comp";
import { signIn } from "next-auth/react";

type SignupFormData = z.infer<typeof SignupSchema>;

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const res = await api.post("/signup", { ...data });
      console.log("Signup Response:", res.data);

      if (res.data.success) {
        const loginRes = await signIn("credentials", {
          email: data.email,
          password: data.password,
        });

        console.log("Login after signup:", loginRes);
      }

      reset();
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="w-full md:hidden max-w-sm mt-6 border border-gray-800 rounded-xl p-6 flex flex-col items-center bg-black/40 backdrop-blur">
      <h1 className="text-2xl md:text-4xl font-bold text-white tracking-wide">
        Create Account
      </h1>
      <p className="text-gray-400 text-sm mt-1">Sign up to get started</p>

      <div className="w-full flex justify-center gap-4 mt-6">
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex items-center justify-center gap-2 w-1/2 h-10 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
        >
          <FaGoogle className="text-red-500" />
          <span className="text-sm font-medium">Google</span>
        </button>

        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="flex items-center justify-center gap-2 w-1/2 h-10 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
        >
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
        <div className="flex space-x-2">
          <div className="w-1/2">
            <InputField
              name="firstname"
              placeholder="Firstname"
              register={register}
              type="text"
              error={errors.firstname}
              className="w-full h-11"
            />
          </div>

          <div className="w-1/2">
            <InputField
              name="lastname"
              placeholder="Lastname"
              register={register}
              type="text"
              error={errors.lastname}
              className="w-full h-11"
            />
          </div>
        </div>

        <div>
          <InputField
            name="email"
            placeholder="email"
            register={register}
            type="email"
            error={errors.email}
            className="w-full h-11"
          />
        </div>

        <div>
          <InputField
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors.password}
            className="w-full h-11"
          />
        </div>

        <ButtonForm type="submit" children="Sign Up" isLoading={isSubmitting} />
      </form>

      <p className="text-gray-400 text-sm mt-5">
        Already have an account?{" "}
        <Link href="/signin" className="text-cyan-400 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};
