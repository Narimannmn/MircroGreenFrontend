import { instance } from "@/shared/api/instance";
import { appLocalStorageKey } from "@/shared/config/appLocalStorage/appLocalStorage";
import { appLocalStorage } from "@/shared/utils/appLocalStorage/appLocalStorage";
import { PaginatedRecords, RecordsBase } from "../schemas/schemas";

export interface GetRecordsParams {
  seedbed_id: string | undefined;
  page: number;
  page_size: number;
}

export const getRecordsBySeedbedId = ({
  seedbed_id,
  page,
  page_size,
}: GetRecordsParams) => {
  if (!seedbed_id) return;
  return instance
    .get<PaginatedRecords>(`/record/records/${+seedbed_id}`, {
      params: {
        page,
        page_size,
      },
      headers: {
        Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
      },
    })
    .then((res) => res.data);
};
export const addRecordBySeedbedId = async (
  seedbed_id: number,
  record: RecordsBase,
) => {
  const response = await instance.post(`/record/record/${seedbed_id}`, record, {
    headers: {
      Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
    },
  });

  return response.data;
};
