import axios, { AxiosResponse } from "axios";
import { t } from "i18next";
import {
  LoginFormFields,
  LoginResponse,
  LoginResponseSchema,
  Token,
} from "@/entities/Auth/schemas/schemas";
import { Tokens } from "@/entities/Auth/store/store";
import { instance } from "@/shared/api/instance";
import { LoginResponseError } from "../hooks/hooks";

export const login = async (credentials: LoginFormFields) => {
  return instance
    .post<
      LoginFormFields,
      AxiosResponse<LoginResponse, LoginResponseError>,
      LoginFormFields
    >("/auth/login", credentials, {
      validateStatus(status) {
        return status === 200;
      },
    })
    .then((response) => {
      const result = LoginResponseSchema.safeParse(response.data);
      if (!result.success) {
        throw new Error("Validation error");
      }
      return result.data;
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        if (
          typeof error.response === "object" &&
          error.response !== null &&
          "data" in error.response &&
          typeof error.response.data === "object" &&
          error.response.data !== null &&
          "detail" in error.response.data &&
          typeof error.response.data.detail === "string"
        ) {
          throw new Error(error.response.data.detail);
        }
        if (
          typeof error.response === "object" &&
          error.response !== null &&
          "data" in error.response &&
          typeof error.response.data === "object" &&
          error.response.data !== null &&
          "detail" in error.response.data &&
          Array.isArray(error.response.data.detail) &&
          error.response.data.detail[0] &&
          typeof error.response.data.detail[0] === "object" &&
          error.response.data.detail[0] !== null &&
          "msg" in error.response.data.detail[0] &&
          typeof error.response.data.detail[0].msg === "string"
        ) {
          throw new Error(error.response.data.detail[0].msg);
        }
        throw new Error(t("axiosError", { ns: "requests" }));
      }
      throw new Error(t("unexpectedError", { ns: "requests" }));
    });
};

export const revalidateToken = async (refreshToken: Token) => {
  return instance.get<Tokens>("/auth/refresh", {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
};
