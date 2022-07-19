import { ReactNode } from "react";

export const propsGetter = <
  T extends {
    ru: {
      default: ReactNode;
      [key: string]: ReactNode | undefined;
    };
    kz: {
      default: ReactNode;
      [key: string]: ReactNode | undefined;
    };
  }
>(
  config: T,
  isRus: boolean,
  prefix: string
): ReactNode => {
  const { ru, kz } = config;
  const { default: defaultNode, [prefix]: prefixNode } = isRus ? ru : kz;
  return prefixNode || defaultNode;
};
