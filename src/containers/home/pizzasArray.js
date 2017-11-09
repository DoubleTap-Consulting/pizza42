import cheesePizzaImage from 'images/cheesePizza.jpg';
import meatPizzaImage from 'images/meatPizza.jpg';
import peppPizzaImage from 'images/peppPizza.jpg';
import ultimatePizzaImage from 'images/ultimatePizza.jpg';

export default function seedPizzaArray() {
  return [
    {
      image: peppPizzaImage,
      key: 4,
      textBody: 'A delicious, delectable, delightful pizza topped with pepperonis.',
      textHeadline: 'Small Pepperoni Pizza',
    },
    {
      image: peppPizzaImage,
      key: 8,
      textBody: 'A delicious, delectable, delightful pizza topped with pepperonis.',
      textHeadline: 'Medium Pepperoni Pizza',
    },
    {
      image: peppPizzaImage,
      key: 15,
      textBody: 'A delicious, delectable, delightful pizza topped with pepperonis.',
      textHeadline: 'Large Pepperoni Pizza',
    },
    {
      image: cheesePizzaImage,
      key: 16,
      textBody: 'A delicious, delectable, delightful pizza with no toppings. Simple and succulent.',
      textHeadline: 'Small Cheese Pizza',
    },
    {
      image: cheesePizzaImage,
      key: 42,
      textBody: 'A delicious, delectable, delightful pizza with no toppings. Simple and succulent.',
      textHeadline: 'Medium Cheese Pizza',
    },
    {
      image: cheesePizzaImage,
      key: 815,
      textBody: 'A delicious, delectable, delightful pizza with no toppings. Simple and succulent.',
      textHeadline: 'Large Cheese Pizza',
    },
    {
      image: meatPizzaImage,
      key: 58,
      textBody: 'One of those pizzas with weird meats that you should not have on pizza, like ham.',
      textHeadline: 'Small Meat Lovers Pizza',
    },
    {
      image: meatPizzaImage,
      key: 105,
      textBody: 'One of those pizzas with weird meats that you should not have on pizza, like ham.',
      textHeadline: 'Medium Meat Lovers Pizza',
    },
    {
      image: meatPizzaImage,
      key: 23,
      textBody: 'One of those pizzas with weird meats that you should not have on pizza, like ham.',
      textHeadline: 'Large Meat Lovers Pizza',
    },
    {
      image: ultimatePizzaImage,
      key: 12,
      textBody: 'Combines every ingredient onto one pizza. Something to love for everyone, and something that will have to be taken off for everyone.',
      textHeadline: 'Ultimate Pizza',
    },
  ];
}
