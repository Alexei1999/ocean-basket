import breakfastLogo from "./breakfast.png";
import dinnerLogo from "./dinner.png";
import pizzaLogo from "./pizza.png";
import saladLogo from "./salad.png";
import spaghettiLogo from "./spaghetti.png";

export const items = [
  {
    id: 101,
    name: "Завтрак в OceanBasket",
    slug: "breakfast",
    ingridients: ["cheese", " becone", " tomato"],
    deliveryFee: null,
    isApproximate: true,
    isDiscount: true,
    price: 1500,
    discount: 3000,
    isAvailable: true,
    image: {
      id: "103",
      original: breakfastLogo,
      thumbnail: breakfastLogo,
    },
  },
  {
    id: 102,
    name: "Pizza",
    slug: "pizza",
    ingridients: ["cheese", " becone", " tomato"],
    deliveryFee: null,
    isApproximate: false,
    isDiscount: false,
    price: 2500,
    isAvailable: true,
    image: {
      id: "104",
      original: pizzaLogo,
      thumbnail: pizzaLogo,
    },
  },
  {
    id: 103,
    name: "Pasta",
    slug: "pasta",
    ingridients: ["cheese", " becone", " tomato"],
    deliveryFee: 5,
    isApproximate: false,
    isDiscount: true,
    price: 1500,
    isAvailable: true,
    image: {
      id: "105",
      original: spaghettiLogo,
      thumbnail: spaghettiLogo,
    },
  },
  {
    id: 104,
    name: "Ужин в OceanBasket",
    slug: "dinner",
    ingridients: ["cheese", " becone", " tomato"],
    deliveryFee: null,
    isApproximate: true,
    isDiscount: false,
    price: 1500,
    isAvailable: true,
    image: {
      id: "103",
      original: dinnerLogo,
      thumbnail: dinnerLogo,
    },
  },
  {
    id: 105,
    name: "Salad",
    slug: "salad",
    ingridients: ["cheese", " becone", " tomato"],
    deliveryFee: 5,
    isApproximate: false,
    isDiscount: true,
    price: 1500,
    isAvailable: true,
    image: {
      id: "103",
      original: saladLogo,
      thumbnail: saladLogo,
    },
  },
];
