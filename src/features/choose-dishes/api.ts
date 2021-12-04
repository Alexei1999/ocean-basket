export type StorageFields = "cart" | "form";

export const getFromStorage = <T>(field: StorageFields, isSafe = true): T => {
  const localCart = window.localStorage.getItem(field);

  if (localCart) {
    try {
      return JSON.parse(localCart);
    } catch (e) {
      console.error(e);
      window.localStorage.removeItem(field);
      return isSafe ? ({} as T) : (null as unknown as T);
    }
  }

  return isSafe ? ({} as T) : (null as unknown as T);
};

export const setToStorage = (field: StorageFields, data: unknown) => {
  window.localStorage.setItem(field, JSON.stringify(data));
};
