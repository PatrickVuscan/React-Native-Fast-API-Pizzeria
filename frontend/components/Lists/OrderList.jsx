// @ts-check
import {
  Body,
  Card,
  CardItem,
  H1,
  H2,
  Text,
} from 'native-base';
import React from 'react';
import theme from '../../styles';
import DrinkList from './DrinkList';
import PizzaList from './PizzaList';

export default ({
  orders, drinkEnum,
}) => (
  <Card style={{ ...theme.card, ...theme.padding }}>
    <CardItem
      header
      bordered
    >
      <Text>All Orders made at Milano Pizzeria!</Text>
    </CardItem>
    {orders.map((order) => (
      <CardItem
        bordered
        key={order.order_id}
      >
        <Body>
          <H1>
            {`Order ${order.order_id}`}
          </H1>
          <Text>
            {`Customer ID: ${order.customer_id}`}
          </Text>
          <Text>
            {`Is Completed: ${order.is_completed}`}
          </Text>
          <Text>
            {`Delivery Method: ${order.delivery_method}`}
          </Text>
          <H2>
            Pizzas
          </H2>
          <PizzaList pizzas={order.pizzas} />
          <H2>
            Drinks
          </H2>
          <DrinkList
            drinks={order.drinks}
            drinkEnum={drinkEnum}
          />
        </Body>
      </CardItem>
    ))}
  </Card>
);
