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
  calories?: number;
  proteins?: number;
  fats?: number;
  carbohydrates?: number;
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

export type OrderTypeParams = Omit<FormValues, "title"> & {
  time: string;
  phone: string;
  dishes: {
    name: string;
    weight: number;
    rouble_price: number;
    tenge_price: number;
    modifiers: { key: string; value: string; amount: number }[];
  }[];
  promocode?: string;
  restaurant: string;
  location: boolean | null;
} & {
  payment: string;
} & {
  MerchantLogin: string;
  InvoiceID: number;
  Signature: string;
};

export const postOrder = (
  params: OrderTypeParams
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

export type PaymentArgumentsParams = {
  OutSum: number;
};
export type PaymentArguments = {
  InvoiceId: number;
  OutSum: number;
  SignatureValue: string;
};

export const postPaymentArguments = (
  params: PaymentArgumentsParams
): Promise<PaymentArguments> => {
  return baseApi
    .post(`${apiBaseUrl}/paymentParams`, params)
    .then((response) => response.data);
};

export type PaymentStatusParams = {
  InvID: number;
  OutSum: number;
};
export type PaymentStatus = {
  result: boolean;
  goodsNum: number;
  requestDate: string;
  deliveryTime: string;
  deliveryPlace: string;
  outSum: string;
  paymentMethod: string;
  deliveryPrice: number;
  totalSum: string;
  SignatureValue: string;
  orderNumber: number;
  location: boolean | false;
};

export const postPaymentStatus = (
  params: PaymentStatusParams
): Promise<PaymentStatus> => {
  return baseApi
    .post(`${apiBaseUrl}/paymentStatus`, params)
    .then((response) => response.data);
};

export type ValidateTimeStatus = {
  result: boolean;
};

export const getTimeValidate = (): Promise<boolean> => {
  return baseApi
    .get(`${apiBaseUrl}/timeValidate`)
    .then((response) => response.data)
    .then((data) => data.result);
};

export const getDish = (id: string): Promise<Dish> => {
  return baseApi
    .post(`${apiBaseUrl}/getDish`, { dish_id: id })
    .then((response) => response.data);
};

export const getPosts = (): Promise<string[]> => {
  return baseApi
    .get(`${apiBaseUrl}/getPermalinks`)
    .then((response) => response.data);
};
