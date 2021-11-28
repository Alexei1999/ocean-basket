import breakfastImg from "./dish-images/breakfast.png";
import dinnerImg from "./dish-images/dinner.png";
import pizzaImg from "./dish-images/pizza.png";
import saladImg from "./dish-images/salad.png";
import spaghettiImg from "./dish-images/spaghetti.png";

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
      original: breakfastImg,
      thumbnail: breakfastImg,
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
      original: pizzaImg,
      thumbnail: pizzaImg,
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
      original: spaghettiImg,
      thumbnail: spaghettiImg,
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
    isAvailable: true,
    price: 1500,
    image: {
      id: "103",
      original: dinnerImg,
      thumbnail: dinnerImg,
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
      original: saladImg,
      thumbnail: saladImg,
    },
  },
];
