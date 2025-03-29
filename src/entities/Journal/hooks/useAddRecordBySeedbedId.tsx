import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RecordsBase } from "../schemas/schemas";
import { addRecordBySeedbedId } from "../service/service";

export const useAddRecordBySeedbedId = (seedbed_id: number | undefined) => {
  const queryClient = useQueryClient();
  if (!seedbed_id) return;

  return useMutation({
    mutationFn: async (record: RecordsBase) => {
      await addRecordBySeedbedId(seedbed_id, record);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["records", seedbed_id],
      });
    },
  });
};
