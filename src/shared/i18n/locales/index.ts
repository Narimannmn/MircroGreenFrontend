import { AppI18NextNamespace } from "../types";
import { kzApiResponseStatuses, kzLogin, kzRequests } from "./kz";
import { ruApiResponseStatuses, ruLogin, ruRequests } from "./ru";

export const kzResourses: Record<AppI18NextNamespace, unknown> = {
  login: kzLogin,
  requests: kzRequests,
  apiResponseStatuses: kzApiResponseStatuses,
};

export const ruResourses: Record<AppI18NextNamespace, unknown> = {
  login: ruLogin,
  requests: ruRequests,
  apiResponseStatuses: ruApiResponseStatuses,
};
