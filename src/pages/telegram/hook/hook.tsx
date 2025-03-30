import { useMutation } from "@tanstack/react-query";
import {
  addTelegramIntegration,
  deleteTelegramIntegration,
} from "../services/services";

export const useAddTelegramIntegration = () => {
  return useMutation({
    mutationFn: (id: string) => addTelegramIntegration(id),
  });
};

export const useDeleteTelegramIntegration = () => {
  return useMutation({
    mutationFn: (id: string) => deleteTelegramIntegration(id),
  });
};
