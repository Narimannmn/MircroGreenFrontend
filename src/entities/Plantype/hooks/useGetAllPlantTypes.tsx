import { useQuery } from "@tanstack/react-query";
import { BasePagination } from "@/shared/schemas/pagination/pagination";
import { getAllPlantTypes } from "../services/services";

export const useGetAllPlantTypes = ({
  page = 1,
  page_size = 100,
}: BasePagination) => {
  return useQuery({
    queryKey: ["useGetAllPlantTypes", page],
    queryFn: () => getAllPlantTypes({ page, page_size }),
  });
};
