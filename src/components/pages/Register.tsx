"use client";

import Image from "next/image";
import { useState } from "react";
import banner from "../../../public/benner.png";
import logo from "../../../public/logo.svg";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const registerFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Nama minimal 3 karakter" })
    .max(50, { message: "Nama maksimal 50 karakter" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Nama hanya boleh mengandung huruf" }),

  email: z
    .string()
    .email({ message: "Email tidak valid" })
    .max(100, { message: "Email terlalu panjang" }),

  phone: z
    .string()
    .min(12, { message: "Nomor telepon minimal 12 digit" })
    .max(15, { message: "Nomor telepon terlalu panjang" })
    .regex(/^\d+$/, { message: "Nomor telepon hanya boleh berisi angka" }),

  password: z
    .string()
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
      message:
        "Password harus mengandung minimal 1 simbol (@, $, !, %, *, ?, &)",
    }),
});

type RegisterFormSchema = z.infer<typeof registerFormSchema>;

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: RegisterFormSchema) => {
      const response = await axios.post("/api/register", data);
      return response.data;
    },
    onSuccess: () => {
      alert("Registrasi berhasil!");
      form.reset();
    },
    onError: (error: any) => {
      setErrorMessage(
        error.response?.data?.message || "Terjadi kesalahan, coba lagi."
      );
    },
  });

  const { control, handleSubmit } = form;

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRegister = (data: RegisterFormSchema) => {
    setErrorMessage(""); // Reset error sebelum request
    mutate(data);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      {/* Banner */}
      <section className="relative hidden md:block">
        <Image
          src={banner}
          className="w-full h-full"
          width={2000}
          height={2000}
          alt="banner"
        />
        <Image
          src={logo}
          className="absolute top-10 right-1/2 translate-x-1/2"
          width={400}
          height={300}
          alt="logo"
        />
      </section>

      {/* Form */}
      <section className="flex items-center justify-center flex-col max-w-sm mx-auto">
        <h1 className="text-xl font-bold w-full">Daftar Sekarang!</h1>
        <p className="mb-5">Lanjutkan dengan menggunakan</p>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <Form {...form}>
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="flex flex-col gap-2 w-full"
          >
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Masukkan email..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No Ponsel</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="08123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Masukkan Password"
                        {...field}
                      />
                      <Button
                        type="button"
                        tabIndex={-1}
                        variant="ghost"
                        onClick={handleShowPassword}
                        size="icon"
                        className="absolute top-1/2 right-0 -translate-y-1/2 hover:bg-transparent"
                        aria-label={
                          showPassword
                            ? "Sembunyikan Password"
                            : "Tampilkan Password"
                        }
                      >
                        {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-2" disabled={isPending}>
              {isPending ? "Loading..." : "Daftar"}
            </Button>
          </form>
        </Form>
      </section>
    </div>
  );
};

export default RegisterPage;
