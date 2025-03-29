import { useMutation } from "@tanstack/react-query";
import { LotCreateRead } from "../schemas/shemas";
import { createLot } from "./../service/service";

export const useCreateLot = () => {
  return useMutation({
    mutationFn: (data: LotCreateRead) => createLot(data),
    mutationKey: ["useCreateLot"],
  });
};
