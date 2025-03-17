import { z } from "zod";

export const nameSchema = z
  .string({ required_error: "Name is required" })
  .min(3, { message: "Nama minimal 3 karakter" })
  .max(50, { message: "Nama maksimal 50 karakter" })
  .regex(/^[a-zA-Z\s]+$/, { message: "Nama hanya boleh mengandung huruf" });

export const emailSchema = z
  .string({ required_error: "Email is required" })
  .email({ message: "Email tidak valid" })
  .max(100, { message: "Email terlalu panjang" });

export const phoneSchema = z
  .string({ required_error: "Phone is required" })
  .min(12, { message: "Nomor telepon minimal 12 digit" })
  .max(15, { message: "Nomor telepon terlalu panjang" })
  .regex(/^\d+$/, { message: "Nomor telepon hanya boleh berisi angka" });

export const passwordSchema = z
  .string({ required_error: "Password is required" })
  .min(8, { message: "Password minimal 8 karakter" })
  .max(100, { message: "Password terlalu panjang" })
  .regex(/[A-Z]/, {
    message: "Password harus mengandung minimal 1 huruf besar",
  })
  .regex(/[a-z]/, {
    message: "Password harus mengandung minimal 1 huruf kecil",
  })
  .regex(/\d/, { message: "Password harus mengandung minimal 1 angka" })
  .regex(/[@$!%*?&]/, {
    message: "Password harus mengandung minimal 1 simbol (@, $, !, %, *, ?, &)",
  });
