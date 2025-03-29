import { useMutation } from "@tanstack/react-query";
import { login } from "../services/services";

export type LoginResponseError =
  | {
      detail: string;
    }
  | {
      detail: Array<{
        loc: [string | number];
        msg: string;
        type: string;
      }>;
    };

export const useLogin = () => {
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
  });

  return mutation;
};
