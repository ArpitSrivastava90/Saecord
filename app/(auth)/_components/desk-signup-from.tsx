"use client";
import Image from "next/image";
import Link from "next/link";
import img1 from "../Images/lev1.jpg";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGoogle } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { SignupSchema } from "@/lib/validations";
import { InputField } from "./input-comp";
import { ButtonForm } from "./button-com";

type SignupFormData = z.infer<typeof SignupSchema>;

const SignupDeskForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
    mode: "onBlur",
  });

  const onSubmit = (data: SignupFormData) => {
    console.log("Form Submitted ✅", data);
    reset();
  };

  return (
    <div className="hidden md:flex w-full h-[600px] justify-start items-center px-26 gap-2">
      <div className="w-[400px] h-full relative rounded-l-xl overflow-hidden shadow-lg">
        <Image
          src={img1}
          alt="Signup Illustration"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="w-[700px] h-full rounded-r-xl flex items-center justify-start shadow-lg">
        <div className="w-3/4 ">
          <h2 className="text-3xl font-bold text-white mb-2 text-center">
            Create Account
          </h2>
          <p className="text-gray-400 mb-6 text-sm text-center">
            Sign up to get started with Saecord
          </p>

          <div className="flex gap-4 mb-6">
            <button className="flex items-center justify-center gap-2 w-1/2 h-10 bg-gray-800 rounded-md hover:bg-gray-700 transition">
              <FaGoogle className="text-red-500" />
              <span className="text-sm font-medium text-white">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 w-1/2 h-10 bg-gray-800 rounded-md hover:bg-gray-700 transition">
              <FiGithub className="text-white" />
              <span className="text-sm font-medium text-white">GitHub</span>
            </button>
          </div>

          <div className="flex items-center my-5">
            <hr className="flex-grow border-gray-700" />
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <hr className="flex-grow border-gray-700" />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <div className="flex gap-3">
              <div className="flex-1">
                <InputField
                  name="firstname"
                  placeholder="Firstname"
                  register={register}
                  type="text"
                  error={errors.firstname}
                  className="w-full h-11"
                />
              </div>
              <div className="flex-1">
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

            {/* Email */}
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

            <ButtonForm type="submit" children="Sign Up" />
          </form>

          <p className="text-gray-400 text-sm text-center mt-4">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-cyan-400 hover:text-cyan-300 transition"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupDeskForm;
