import { FormValues } from "@entities/payment/components/Forms/address-form";
import { ModifierType } from "@features/choose-dishes/models";
import { baseApi } from "./base";

const apiBaseUrl = "/api";

export const EMPTY_STRING = "-";

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
    weight: string | typeof EMPTY_STRING;
    tenge_price: string | typeof EMPTY_STRING;
    rouble_price: string | typeof EMPTY_STRING;
  }[];
  photo: string | null;
  recommended: string | null;
  recommended_dishes?: Omit<Dish, "recommended_dishes">[];
  status: DishStatus;
  category: string;
  created_at: string;
  updated_at: string;
};

export const getDishes = (): Promise<{ [category: string]: Dish[] }> => {
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

export type OrderType = Omit<FormValues, "title"> & {
  time: string;
  phone: string;
  dishes: {
    name: string;
    weight: number;
    rouble_price: number;
    tenge_price: number;
    modifiers: string[];
  }[];
  promocode?: string;
  restaurant: string;
} & {
  payment: string;
} & {
  MerchantLogin: string;
  InvoiceID: number;
  Signature: string;
};

export const postOrder = (
  params: OrderType
): Promise<{ order_id?: number }> => {
  return baseApi
    .post(`orders/submit`, params)
    .then((response) => response.data);
};

export type PromocodeParams = {
  promocode: string;
};

export const verifyPromocode = (
  params: PromocodeParams
): Promise<{ result: boolean; promocode_text: string | null }> => {
  return baseApi
    .post(`${apiBaseUrl}/promocodes/promocodeValidator`, params)
    .then((response) => response.data);
};

export const postSubscribe = (params: string) => {
  return baseApi.post(`${apiBaseUrl}/subscribers/submit`, { email: params });
};

export const getModifiers = (id: string | number): Promise<ModifierType[]> => {
  if (!id) throw new Error("id is required");

  return baseApi
    .get(`${apiBaseUrl}/modifiers/${id}`)
    .then((response) => response.data);
};
