import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { RegisterFormSchema } from "@/features/auth/form/register";

type UsePostRegisterProps = {
  onSuccess: () => void;
  onError: (e: Error) => void;
};

export const UsePostRegister = ({
  onSuccess,
  onError,
}: UsePostRegisterProps) => {
  return useMutation({
    mutationFn: async (data: RegisterFormSchema) => {
      const response = await axiosInstance.post("/register", data);
      return response.data;
    },
    onSuccess,
    onError,
  });
};
