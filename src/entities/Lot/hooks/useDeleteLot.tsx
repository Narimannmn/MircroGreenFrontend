import { useMutation } from "@tanstack/react-query";
import { deleteLot } from "../service/service";

export const useDeleteLot = () => {
  return useMutation({
    mutationFn: (id: number) => deleteLot(id),
    mutationKey: ["useDeleteLot"],
  });
};
