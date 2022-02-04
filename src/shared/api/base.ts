import axios from "axios";

import { proxy } from "../../../package.json";

export const hostUrl = proxy;

export type ResponseType = {
  status: number;
  data: unknown;
  message?: string;
};
export const baseApi = axios.create({
  baseURL: hostUrl,
  headers: {
    Authorization: "Basic YWRtaW46bWlpTlZCOFE=",
  },
  transformResponse: [
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
  ],
});
