import { useMutation } from "@tanstack/react-query";
import { createPlantByImage } from "../services/services";

export const useCreatePlantByImage = () => {
  return useMutation({
    mutationFn: (data: string) => createPlantByImage(data),
    mutationKey: ["useCreatePlantByImage"],
  });
};
