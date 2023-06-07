import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Fiction",
    description:
      "Immerse yourself in captivating stories and narratives that transport you to imaginative worlds and introduce you to unforgettable characters.",
    image: "/assets/fiction.png",
  },
  {
    _id: uuid(),
    categoryName: "Self Help",
    description:
      "Discover valuable insights and practical techniques for personal growth, motivation, and achieving your full potential in various aspects of life.",
    image: "/assets/self-help.png",
  },
  {
    _id: uuid(),
    categoryName: "Business",
    description:
      "Gain valuable knowledge, strategies, and insights into entrepreneurship, leadership, finance, and organizational success in the dynamic business landscape.",
    image: "/assets/business.png",
  },
];
