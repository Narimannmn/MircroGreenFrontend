import { useMutation } from "@tanstack/react-query";
import { createPlant } from "../services/services";
import { PlantReadCreate } from "../shemas/shemas";

export const useCreatePlant = () => {
  return useMutation({
    mutationFn: (data: PlantReadCreate) => createPlant(data),
    mutationKey: ["useCreatePlant"],
  });
};
