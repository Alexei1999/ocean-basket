export type StorageFields = "cart" | "form" | "phone" | "schedule" | "location";

export const getFromStorage = <T>(field: StorageFields, isObject = true): T => {
  const localCart = window.localStorage.getItem(field);

  if (localCart) {
    try {
      return JSON.parse(localCart);
    } catch (e) {
      console.error(e);
      window.localStorage.removeItem(field);
      return isObject ? ({} as T) : (null as unknown as T);
    }
  }

  return isObject ? ({} as T) : (null as unknown as T);
};

export const setToStorage = (field: StorageFields, data: unknown) => {
  window.localStorage.setItem(field, JSON.stringify(data));
};
