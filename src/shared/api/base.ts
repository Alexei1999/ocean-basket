import axios from "axios";

export type ResponseType = {
  status: number;
  data: unknown;
  message?: string;
};

export const baseApi = axios.create({
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
