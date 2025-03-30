import { instance } from "@/shared/api/instance";
import { appLocalStorageKey } from "@/shared/config/appLocalStorage/appLocalStorage";
import { appLocalStorage } from "@/shared/utils/appLocalStorage/appLocalStorage";

export const addTelegramIntegration = async (telegram_id: string) => {
  const response = await instance.post(
    "/integration/telegram",
    { telegram_id },
    {
      headers: {
        Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
      },
    },
  );

  return response.data;
};

export const deleteTelegramIntegration = async (telegram_id: string) => {
  const response = await instance.delete(
    `/integration/telegram/${telegram_id}`,
    {
      headers: {
        Authorization: `Bearer ${appLocalStorage.getItem(appLocalStorageKey.accessToken)}`,
      },
    },
  );

  return response.data;
};
