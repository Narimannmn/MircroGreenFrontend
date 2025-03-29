import { useMutation } from "@tanstack/react-query";
import { deletePlant } from "../services/services";

export const useDeletePlant = () => {
  return useMutation({
    mutationFn: (id: string) => deletePlant(id),
    mutationKey: ["useDeletePlant"],
  });
};
