import { useQuery } from "@tanstack/react-query";
import { getRecordsComment } from "../service/service";

// Assuming that getRecordsComment returns an object with a "message" property
export type RecordCommentData = {
  message: string;
};

export const useGetRecordComment = (seedbed_id: number | undefined) => {
  return useQuery({
    queryKey: ["useGetRecordComment", seedbed_id],
    queryFn: async () => {
      return await getRecordsComment(seedbed_id);
    },

    enabled: !!seedbed_id,
  });
};
