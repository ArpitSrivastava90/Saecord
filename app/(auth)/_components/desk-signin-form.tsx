"use client";

import Link from "next/link";
import img1 from "../Images/gojo1.jpg";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGoogle } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { SigninSchema } from "@/lib/validations";
import { InputField } from "./input-comp";
import { ButtonForm } from "./button-com";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type SigninFormData = z.infer<typeof SigninSchema>;

const SigninDeskForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SigninFormData>({
    resolver: zodResolver(SigninSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: SigninFormData) => {
    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false, // prevent NextAuth auto redirect
      });

      console.log("SignIn Response:", res);

      if (res?.ok && !res.error) {
        router.push("/"); // ✅ redirect manually
      } else {
        console.error("Login failed:", res?.error);
      }
    } catch (err) {
      console.error("Error during login:", err);
    }
  };

  return (
    <div className="hidden md:flex w-full h-[600px] bg-black justify-start items-center px-26 gap relative">
      {/* Left side image */}
      <div
        className="w-[400px] h-[600px] rounded-l-xl shadow-lg bg-center bg-cover mb-72"
        style={{
          backgroundImage: `url(${img1.src})`,
        }}
      ></div>

      {/* Right side form */}
      <div className="w-[700px] h-full rounded-r-xl flex items-center justify-start shadow-lg">
        <div className="w-3/4 ">
          <h2 className="text-3xl font-bold text-white mb-2 text-center">
            Welcome Back
          </h2>
          <p className="text-gray-400 mb-6 text-sm text-center">
            Sign in to continue
          </p>

          {/* OAuth buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="flex items-center justify-center gap-2 w-1/2 h-10 bg-gray-800 rounded-md hover:bg-gray-700 transition"
            >
              <FaGoogle className="text-red-500" />
              <span className="text-sm font-medium text-white">Google</span>
            </button>
            <button
              onClick={() => signIn("github", { callbackUrl: "/" })}
              className="flex items-center justify-center gap-2 w-1/2 h-10 bg-gray-800 rounded-md hover:bg-gray-700 transition"
            >
              <FiGithub className="text-white" />
              <span className="text-sm font-medium text-white">GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-5">
            <hr className="flex-grow border-gray-700" />
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <hr className="flex-grow border-gray-700" />
          </div>

          {/* Credentials form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <div>
              <InputField
                name="email"
                placeholder="Email"
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

            <ButtonForm type="submit" isLoading={isSubmitting}>
              Sign In
            </ButtonForm>
          </form>

          <p className="text-gray-400 text-sm text-center mt-4">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-cyan-400 hover:text-cyan-300 transition"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninDeskForm;
