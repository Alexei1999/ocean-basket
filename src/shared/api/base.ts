import axios from "axios";

export const hostUrl = "http://2.56.213.189:81";

export type ResponseType = {
  status: number;
  data: unknown;
  message?: string;
};
export const baseApi = axios.create({
  baseURL: hostUrl,
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
