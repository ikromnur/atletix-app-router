import { z } from "zod";
import {
  emailSchema,
  passwordSchema,
  nameSchema,
  phoneSchema,
} from "@/schemas/auth";

export const registerFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  password: passwordSchema,
});

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
