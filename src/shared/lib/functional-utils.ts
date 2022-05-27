import { useCallback, useEffect, useMemo, useState } from "react";

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export function getPlurals<T>(num: number, options: T[]): T {
  if (num === 0) return options[2];
  if (num === 1) return options[0];
  if (num >= 2 && num <= 4) return options[1];
  if (num >= 5 && num <= 20) return options[2];

  // Обработка чисел от 21 и выше
  const arr = String(num).split("");
  const lastNumber = Number(arr[arr.length - 1]);

  if (lastNumber === 0) return options[2];
  if (lastNumber === 1) return options[0];
  if (lastNumber >= 2 && lastNumber <= 4) return options[1];
  if (lastNumber >= 5 && lastNumber <= 9) return options[2];

  return options[2];
}

export const useObserver = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isStartLoading, setIsStartLoading] = useState<boolean>(false);

  const [oberver, setObserver] = useState<IntersectionObserver | null>(null);

  const containerRef = useCallback(
    (ref: HTMLElement | null) => {
      if (oberver && ref) {
        oberver.unobserve(ref);
        oberver.observe(ref);
      }
    },
    [oberver]
  );

  useEffect(() => {
    const intObs = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setIsVisible(true);
        setIsStartLoading(true);
      } else {
        setIsVisible(false);
      }
    });

    setObserver(intObs);

    return () => {
      intObs.disconnect();
    };
  }, []);

  return useMemo(
    () => ({
      containerRef,
      isVisible,
      isStartLoading,
    }),
    [containerRef, isVisible, isStartLoading]
  );
};

export const stringifyValueSafely = (value: unknown): string => {
  if (typeof value === "object" && value !== null) {
    try {
      return JSON.stringify(value);
    } catch (error) {
      console.error(error);
      console.error(value);
      return "";
    }
  }

  const stringValue = (value as Record<string, unknown>)?.toString?.();
  if (typeof stringValue === "string") {
    return stringValue;
  }

  if (value === null) return "null";
  if (value === undefined) return "undefined";

  console.error(value);
  return "";
};

export const getIsKz = () =>
  window.location.hostname.includes(".kz") ||
  window.location.hostname.includes("91.201.214.167");
