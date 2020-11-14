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

export default ({ toppings }) => (
  <Card style={{ ...theme.card, ...theme.padding }}>
    <CardItem
      header
      bordered
    >
      <Text>Toppings available at Milano Pizzeria!</Text>
    </CardItem>
    {toppings.map((topping) => (
      <CardItem
        bordered
        key={topping.id}
      >
        <Body>
          <H1>
            {topping.name}
          </H1>
          <Text>
            {`ID: ${topping.topping_id}`}
          </Text>
          <Text>
            {`Price: ${topping.price}`}
          </Text>
        </Body>
      </CardItem>
    ))}
  </Card>
);
