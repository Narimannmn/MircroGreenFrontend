import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RecordsBase } from "../schemas/schemas";
import { addRecordBySeedbedId } from "../service/service";

export const useAddRecordBySeedbedId = (seedbed_id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (record: RecordsBase) =>
      addRecordBySeedbedId(seedbed_id, record),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["records", seedbed_id],
      });
    },
  });
};
