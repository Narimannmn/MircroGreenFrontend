import { instance } from "@/shared/api/instance";
import { appLocalStorageKey } from "@/shared/config/appLocalStorage/appLocalStorage";
import {
  BasePagination,
  PaginatedItem,
} from "@/shared/schemas/pagination/pagination";
import { appLocalStorage } from "@/shared/utils/appLocalStorage/appLocalStorage";
import { Plant, PlantRead, PlantReadCreate } from "../shemas/shemas";

export const createPlant = (data: PlantReadCreate) => {
  return instance
    .post("/microgreen/plant/", data, {
      headers: {
        Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
      },
    })
    .then((data) => data.data);
};

export const getAllPlants = ({ page, page_size }: BasePagination) => {
  return instance
    .get<PaginatedItem<Plant>>("/microgreen/plant/all", {
      params: {
        page_size,
        page,
      },
      headers: {
        Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
      },
    })
    .then((data) => data.data);
};
export const getPlantById = (id: string) => {
  return instance
    .get<Plant>(`/microgreen/plant/${id}`, {
      headers: {
        Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
      },
    })
    .then((data) => data.data);
};
export const updatePlant = (id: string, data: PlantRead) => {
  return instance
    .put<Plant>(`/microgreen/plant/${id}`, data, {
      headers: {
        Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
      },
    })
    .then((data) => data.data);
};

export const deletePlant = (id: string) => {
  return instance
    .delete<Plant>(`/microgreen/plant/${id}`, {
      headers: {
        Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
      },
    })
    .then((data) => data.data);
};
export const createPlantByImage = (image: string) => {
  return instance
    .post(
      "/microgreen/plant/by-image",
      { photo_link: image },
      {
        headers: {
          Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
        },
      },
    )
    .then((response) => response.data);
};
