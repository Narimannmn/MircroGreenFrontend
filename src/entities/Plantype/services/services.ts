import { instance } from "@/shared/api/instance";
import { appLocalStorageKey } from "@/shared/config/appLocalStorage/appLocalStorage";
import { BasePagination } from "@/shared/schemas/pagination/pagination";
import { appLocalStorage } from "@/shared/utils/appLocalStorage/appLocalStorage";
import { PlantType, PlantTypeRead } from "../shemas/shemas";

export interface createPlantTypeProps {
  data: PlantTypeRead;
}
export const createPlantType = ({ data }: createPlantTypeProps) => {
  return instance
    .post("/microgreen/plant-type/", data, {
      headers: {
        Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
      },
    })
    .then((data) => data.data);
};

export const deletePlantType = (id: string) => {
  return instance
    .delete(`/microgreen/plant-type/${id}`, {
      headers: {
        Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
      },
    })
    .then((data) => data.data);
};

export interface updatePlantTypeProps {
  id: string;
  data: PlantTypeRead;
}
export const updatePlantType = ({ id, data }: updatePlantTypeProps) => {
  return instance
    .put(`/microgreen/plant-type/${id}`, data, {
      headers: {
        Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
      },
    })
    .then((data) => data.data);
};

export const getPlantTypeById = (id: string) => {
  return instance
    .get<PlantType>(`/microgreen/plant-type/${id}`, {
      headers: {
        Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
      },
    })
    .then((data) => data.data);
};

export const getAllPlantTypes = ({
  page = 1,
  page_size = 10,
}: BasePagination) => {
  return instance
    .get<PlantType[]>("/microgreen/plant-type/all/", {
      params: {
        page: page,
        page_size: page_size,
      },
      headers: {
        Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
      },
    })
    .then((data) => data.data);
};
