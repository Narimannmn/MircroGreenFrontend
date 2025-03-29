import { useMutation } from "@tanstack/react-query";
import { updatePlant } from "../services/services";
import { PlantRead } from "../shemas/shemas";

export const useUpdatePlant = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: PlantRead }) =>
      updatePlant(id, data),
    mutationKey: ["useUpdatePlant"],
  });
};
