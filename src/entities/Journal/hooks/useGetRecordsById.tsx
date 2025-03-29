import { useQuery } from "@tanstack/react-query";
import { getRecordsBySeedbedId, GetRecordsParams } from "../service/service";

export const useGetRecordsById = (params: GetRecordsParams) => {
  return useQuery({
    queryKey: ["records", params.seedbed_id, params.page, params.page_size],
    queryFn: () => getRecordsBySeedbedId(params),
    enabled: !!params.seedbed_id,
  });
};
