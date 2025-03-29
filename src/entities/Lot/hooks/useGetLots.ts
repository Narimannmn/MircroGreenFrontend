import { useQuery } from "@tanstack/react-query";
import { BasePagination } from "@/shared/schemas/pagination/pagination";
import { getAllLots } from "../service/service";

export const useGetLots = ({ page = 1, page_size = 10 }: BasePagination) => {
  return useQuery({
    queryKey: ["useGetLots", page],
    queryFn: () => getAllLots({ page, page_size }),
  });
};
