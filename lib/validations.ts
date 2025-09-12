import { z } from "zod";

export const SignupSchema = z.object({
  firstname: z
    .string()
    .max(10, "Max 10 character Req")
    .min(3, "Min 3 character Req")
    .optional(),
  lastname: z
    .string()
    .max(15, "Max 10 characte Reqr")
    .min(3, "Min 3 character Req")
    .optional(),

  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(5, "Min 5 Character Req")
    .max(12, "Max 12 Character Req"),
});

export const SigninSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(5, "Min 5 Character Req")
    .max(12, "Max 12 Character Req"),
});
