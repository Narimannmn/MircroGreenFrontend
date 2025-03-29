import { useQuery } from "@tanstack/react-query";
import { BasePagination } from "@/shared/schemas/pagination/pagination";
import { getAllPlants } from "../services/services";

export const useGetPlants = ({ page = 1, page_size = 10 }: BasePagination) => {
  return useQuery({
    queryKey: ["useGetPlants", page],
    queryFn: () => getAllPlants({ page, page_size }),
  });
};
