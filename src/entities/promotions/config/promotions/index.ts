import { Product } from "@entities/dishes/components/DishesContainer/DishesContainer";
import { dishes } from "@features/choose-dishes/config/dishes";
import promotion1 from "./promotion-1.png";
import promotion2 from "./promotion-2.png";
import promotion3 from "./promotion-3.png";
import promotion4 from "./promotion-4.png";

export type Promotion = {
  id: string;
  original: string;
  thumbnail: string;
  alt: string;
  name: string;
  description: string;
  product?: Product;
} & Record<string, unknown>;

export const promotions: Promotion[] = [
  {
    id: "1",
    original: promotion1,
    thumbnail: promotion1,
    alt: "Promotion 1",
    name: "Акция 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    product: dishes[0],
  },
  {
    id: "2",
    original: promotion2,
    thumbnail: promotion2,
    name: "Акция 2",
    alt: "Promotion 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: "3",
    original: promotion3,
    thumbnail: promotion3,
    name: "Акция 3",
    alt: "Promotion 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];
