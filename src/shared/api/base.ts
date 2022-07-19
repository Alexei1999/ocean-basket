import { getIsKz } from "@shared/lib/functional-utils";
import axios, { AxiosResponseTransformer } from "axios";

export const prefixes = {
  kz: {
    0: "https://oceanbasket.kz/oceanBasket/public",
  },
  ru: {
    0: "https://oceanbasket.ru/oceanBasket/public",
    1: "https://oceanbasket-shuv.ru",
  },
};

export const hostUrl = !getIsKz() ? prefixes.ru[0] : prefixes.kz[0];

export const transformResponse: AxiosResponseTransformer[] = [
  (data) => {
    const {
      data: responseData,
      message,
      status,
    } = JSON.parse(data) as ResponseType;

    if (status < 200 || status >= 300) {
      throw new Error(message!);
    }

    return responseData;
  },
];

export type ResponseType = {
  status: number;
  data: unknown;
  message?: string;
};
export const baseApi = axios.create({
  baseURL: hostUrl,
  transformResponse: transformResponse,
});
