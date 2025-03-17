import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { RegisterFormSchema } from "@/features/auth/form/register";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

type RegisterFormProps = {
  onRegister: (data: RegisterFormSchema) => void;
  registerLoading: boolean;
};

const RegisterForm = ({ onRegister, registerLoading }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit } = useFormContext<RegisterFormSchema>();

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <form
      onSubmit={handleSubmit(onRegister)}
      className="flex flex-col gap-2 w-full max-w-sm md:max-w-72 lg:max-w-96"
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
              <Input type="email" placeholder="Masukkan email..." {...field} />
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
                  className="absolute top-1/2 right-1 -translate-y-1/2 hover:bg-transparent"
                  aria-label={
                    showPassword ? "Sembunyikan Password" : "Tampilkan Password"
                  }
                >
                  {showPassword ? (
                    <FaRegEye className="text-secondary-foreground" />
                  ) : (
                    <FaRegEyeSlash className="text-secondary-foreground" />
                  )}
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button type="submit" className="my-4" disabled={registerLoading}>
        {registerLoading ? "Loading..." : "Daftar"}
      </Button>
    </form>
  );
};

export default RegisterForm;
