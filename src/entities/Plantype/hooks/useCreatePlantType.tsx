import { useMutation } from "@tanstack/react-query";
import { createPlantType } from "../services/services";
import { PlantTypeRead } from "../shemas/shemas";

export const useCreatePlantType = () => {
  return useMutation({
    mutationFn: (data: PlantTypeRead) => createPlantType({ data }),
    mutationKey: ["useCreatePlantType"],
  });
};
