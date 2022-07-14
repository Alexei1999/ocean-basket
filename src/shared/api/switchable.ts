import axios from "axios";
import { createEvent, createStore } from "effector";
import { baseApi, hostUrl, transformResponse } from "./base";
import { Dish, Category, apiBaseUrl, DishStatus } from "./common";

export const onChangeHostUrl = createEvent<string>();

export const $hostUrl = createStore(hostUrl).on(
  onChangeHostUrl,
  (_, prefix) => prefix
);

export const getDishes = (): Promise<{ [category: string]: Dish[] }> => {
  return axios
    .get(`${apiBaseUrl}/dishes`, {
      baseURL: $hostUrl.getState(),
      transformResponse: transformResponse,
    })
    .then((response) => response.data);
};

export const getPopular = (): Promise<Dish[]> => {
  return axios
    .get(`${apiBaseUrl}/dishes/popular`, {
      baseURL: $hostUrl.getState(),
      transformResponse: transformResponse,
    })
    .then((response) => response.data);
};

export const getCategories = (): Promise<Category[]> => {
  return axios
    .get(`${apiBaseUrl}/categories`, {
      baseURL: $hostUrl.getState(),
      transformResponse: transformResponse,
    })
    .then((response) => response.data);
};

export type Promotion = {
  id: string;
  title: string;
  description: string;
  status: DishStatus;
  photo: string;
  created_at: string;
  updated_at: string;
  basket: Dish[];
};

export const getPromotions = (): Promise<Promotion[]> => {
  return baseApi
    .get(`${apiBaseUrl}/actions`, {
      baseURL: $hostUrl.getState(),
      transformResponse: transformResponse,
    })
    .then((response) => response.data);
};
