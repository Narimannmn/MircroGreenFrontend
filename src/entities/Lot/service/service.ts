import { instance } from "@/shared/api/instance";
import { appLocalStorageKey } from "@/shared/config/appLocalStorage/appLocalStorage";
import { BasePagination } from "@/shared/schemas/pagination/pagination";
import { appLocalStorage } from "@/shared/utils/appLocalStorage/appLocalStorage";
import { Lot, LotCreateRead, PaginatedLot } from "../schemas/shemas";

export const getAllLots = ({ page, page_size }: BasePagination) => {
  return instance
    .get<PaginatedLot>("/seedbeds/all", {
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
export const createLot = (lotData: LotCreateRead) => {
  return instance
    .post<Lot>("/seedbeds/add", lotData, {
      headers: {
        Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
};
export const deleteLot = (id: number) => {
  return instance
    .delete(`/seedbeds/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
      },
    })
    .then((data) => data.data);
};
