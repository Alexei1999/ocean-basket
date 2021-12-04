import { baseApi } from "./base";

const apiBaseUrl = "/api";

//уточнить статусы
export enum DishStatus {
  Active = "Активно",
  NotActive = "Не активно",
}

export type Dish = {
  id: number;
  name: string;
  description: string;
  prices: {
    weight: string | "-";
    tenge_price: string | "-";
    rouble_price: string | "-";
  }[];
  photo: string | null;
  recommended_dish1: string | null;
  recommended_dish2: string | null;
  recommended_dish3: string | null;
  status: DishStatus;
  category: string;
  created_at: string;
  updated_at: string;
};

export const getDishes = (): Promise<Dish[]> => {
  return baseApi.get(`${apiBaseUrl}/dishes`).then((response) => response.data);
};

export const getPopular = (): Promise<Dish[]> => {
  return baseApi
    .get(`${apiBaseUrl}/dishes/popular`)
    .then((response) => response.data);
};

export type Category = {
  id: number;
  category: string;
  created_at: string;
  updated_at: string;
};

export const getCategories = (): Promise<Category[]> => {
  return baseApi
    .get(`${apiBaseUrl}/categories`)
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
  return baseApi.get(`${apiBaseUrl}/actions`).then((response) => response.data);
};
