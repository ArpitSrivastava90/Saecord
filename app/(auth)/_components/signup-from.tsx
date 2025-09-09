"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { SignupSchema } from "@/lib/validations";
import { z } from "zod";

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

  const onSubmit = (data: SignupFormData) => {
    console.log("Form Submitted", data);
    reset();
  };

  return (
    <div className="w-full max-w-sm mt-6 border border-gray-800 rounded-xl p-6 flex flex-col items-center bg-black/40 backdrop-blur">
      {/* Title */}
      <h1 className="text-2xl md:text-4xl font-bold text-white tracking-wide">
        Create Account
      </h1>
      <p className="text-gray-400 text-sm mt-1">Sign up to get started</p>

      {/* Form Fields */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mt-6 flex flex-col space-y-4"
      >
        {/* Name Fields */}
        <div className="flex space-x-2">
          <div className="w-1/2">
            <input
              {...register("firstname")}
              type="text"
              placeholder="Firstname"
              className="w-full h-11 bg-gray-900 outline-none px-3 text-white rounded-md border border-gray-700 focus:border-cyan-500 transition"
            />
            {errors.firstname && (
              <p className="text-red-500 text-xs mt-1">
                {errors.firstname.message}
              </p>
            )}
          </div>

          <div className="w-1/2">
            <input
              {...register("lastname")}
              type="text"
              placeholder="Lastname"
              className="w-full h-11 bg-gray-900 outline-none px-3 text-white rounded-md border border-gray-700 focus:border-cyan-500 transition"
            />
            {errors.lastname && (
              <p className="text-red-500 text-xs mt-1">
                {errors.lastname.message}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
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

        {/* Password */}
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

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 bg-cyan-600 text-white rounded-md font-medium hover:bg-cyan-700 transition disabled:opacity-50"
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      {/* Divider */}
      <div className="w-full flex items-center my-5">
        <hr className="flex-grow border-gray-700" />
        <span className="px-3 text-gray-500 text-sm">OR</span>
        <hr className="flex-grow border-gray-700" />
      </div>

     
      <div className="w-full flex justify-center gap-4">
  
        <button className="flex items-center justify-center gap-2 w-1/2 h-10 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition">
          <FaGoogle className="text-red-500" />
          <span className="text-sm font-medium">Google</span>
        </button>

        {/* GitHub */}
        <button className="flex items-center justify-center gap-2 w-1/2 h-10 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition">
          <FiGithub className="text-xl" />
          <span className="text-sm font-medium">GitHub</span>
        </button>
      </div>
    </div>
  );
};
