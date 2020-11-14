// @ts-check
import {
  Body,
  Card,
  CardItem,
  H1,
  Text,
} from 'native-base';
import React from 'react';
import theme from '../../styles';

const getToppings = (toppings) => {
  let t = "Toppings: ";

  toppings.forEach((v) => {
    t += `${v.name}, `;
  });

  if (t !== "Toppings: ") {
    t = t.substring(0, t.length - 2);
  }

  return t;
};

export default ({ pizzas }) => (
  <Card style={{ ...theme.card, ...theme.padding }}>
    <CardItem
      header
      bordered
    >
      <Text>Pizzas available at Milano Pizzeria!</Text>
    </CardItem>
    {pizzas.map((pizza) => (
      <CardItem
        bordered
        key={pizza.pizza_id}
      >
        <Body>
          <H1>
            {pizza.name}
          </H1>
          <Text>
            {`ID: ${pizza.pizza_id}`}
          </Text>
          <Text>
            {`Size: ${pizza.size}`}
          </Text>
          <Text>
            {getToppings(pizza.toppings)}
          </Text>
          <Text>
            {`Price: ${pizza.base_price}`}
          </Text>
        </Body>
      </CardItem>
    ))}
  </Card>
);
