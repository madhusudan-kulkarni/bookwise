import { v4 as uuid } from "uuid";

/**
 * Product Database can be added here.
 * You can add products of your wish with different attributes
 * */

export const products = [
  {
    _id: uuid(),
    title: "1984",
    author: "George Orwell",
    image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1657781256i/61439040.jpg",
    price: 249,
    categoryName: "Fiction",
    rating: 4.5,
  },
  {
    _id: uuid(),
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566425108i/33.jpg",
    price: 899,
    categoryName: "Fiction",
    rating: 4.3,
  },
  {
    _id: uuid(),
    title: "Brave New World",
    author: "Aldous Huxley",
    image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1331315450i/5479.jpg",
    price: 699,
    categoryName: "Fiction",
    rating: 4.2,
  },
  {
    _id: uuid(),
    title: "Influence: The Psychology of Persuasion",
    author: "Robert B. Cialdini",
    image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1391026083i/28815.jpg",
    price: 699,
    categoryName: "Self Help",
    rating: 4.1,
  },
  {
    _id: uuid(),
    title: "Atomic Habits",
    author: "James Clear",
    image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385i/40121378.jpg",
    price: 499,
    categoryName: "Self Help",
    rating: 4.2,
  },
  {
    _id: uuid(),
    title: "Deep Work: Rules for Focused Success in a Distracted World",
    author: "Cal Newport",
    image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1447957962i/25744928.jpg",
    price: 499,
    categoryName: "Self Help",
    rating: 4.6,
  },
  {
    _id: uuid(),
    title: "Zero to One",
    author: "Peter Thiel",
    image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1630663027i/18050143.jpg",
    price: 499,
    categoryName: "Business",
    rating: 4.2,
  },
  {
    _id: uuid(),
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1317793965i/11468377.jpg",
    price: 399,
    categoryName: "Business",
    rating: 3.9,
  },
  {
    _id: uuid(),
    title: "The Intelligent Investor",
    author: "Benjamin Graham",
    image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1409602421i/106835.jpg",
    price: 699,
    categoryName: "Business",
    rating: 4.6,
  },
];
