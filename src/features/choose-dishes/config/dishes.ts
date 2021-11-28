import { Product } from "../../../entities/dishes/components/DishesContainer/DishesContainer";

import breakfastImg from "./dish-images/breakfast.png";
import dinnerImg from "./dish-images/dinner.png";
import pizzaImg from "./dish-images/pizza.png";
import saladImg from "./dish-images/salad.png";
import spaghettiImg from "./dish-images/spaghetti.png";
import soupImg from "./dish-images/soup.jpg";
import platterImg from "./dish-images/platter.jpg";

export const dishes: Product[] = [
  {
    id: 101,
    name: "Завтрак в OceanBasket",
    slug: "breakfast",
    ingridients: ["cheese", " becone", " tomato"],
    isApproximate: true,
    isDiscount: true,
    price: 1500,
    discount: 3000,
    isAvailable: true,
    category: "starters",
    image: {
      id: "103",
      original: breakfastImg,
      thumbnail: breakfastImg,
    },
  },
  {
    id: 102,
    name: "Пицца",
    slug: "pizza",
    ingridients: ["cheese", " becone", " tomato"],
    isApproximate: false,
    isDiscount: false,
    price: 2500,
    isAvailable: true,
    category: "top-up",
    image: {
      id: "104",
      original: pizzaImg,
      thumbnail: pizzaImg,
    },
  },
  {
    id: 103,
    name: "Паста",
    slug: "pasta",
    ingridients: ["cheese", " becone", " tomato"],
    deliveryFee: 5,
    isApproximate: false,
    isDiscount: true,
    category: "top-up",
    price: 1500,
    isAvailable: true,
    image: {
      id: "105",
      original: spaghettiImg,
      thumbnail: spaghettiImg,
    },
  },
  {
    id: 104,
    name: "Ужин в OceanBasket",
    slug: "dinner",
    ingridients: ["cheese", " becone", " tomato"],
    isApproximate: true,
    isDiscount: false,
    isAvailable: true,
    price: 1500,
    category: "starters",
    image: {
      id: "103",
      original: dinnerImg,
      thumbnail: dinnerImg,
    },
  },
  {
    id: 105,
    name: "Салат",
    slug: "salad",
    ingridients: ["cheese", " becone", " tomato"],
    deliveryFee: 5,
    isApproximate: false,
    isDiscount: true,
    category: "salats",
    price: 1500,
    isAvailable: true,
    image: {
      id: "103",
      original: saladImg,
      thumbnail: saladImg,
    },
  },
  {
    id: 106,
    name: "Суп",
    slug: "soup",
    ingridients: ["cheese", " becone", " tomato"],
    deliveryFee: 5,
    isApproximate: false,
    isDiscount: false,
    category: "soups",
    price: 5000,
    isAvailable: true,
    image: {
      id: "103",
      original: soupImg,
      thumbnail: soupImg,
    },
  },
  {
    id: 107,
    name: "Платтер",
    slug: "platter",
    ingridients: ["cheese", " becone", " tomato"],
    deliveryFee: 5,
    isApproximate: false,
    isDiscount: false,
    category: "combos",
    price: 5000,
    isAvailable: true,
    image: {
      id: "103",
      original: platterImg,
      thumbnail: platterImg,
    },
  },
];
