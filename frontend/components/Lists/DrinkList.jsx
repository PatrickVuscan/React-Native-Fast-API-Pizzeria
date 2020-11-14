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

export default ({ drinks, drinkEnum }) => (
  <Card style={{ ...theme.card, ...theme.padding }}>
    <CardItem
      header
      bordered
    >
      <Text>
        Drinks available at Milano Pizzeria!
      </Text>
    </CardItem>
    {drinks.map((drink) => (
      <CardItem
        bordered
        key={drink.drink_id}
      >
        <Body>
          <H1>
            {drinkEnum[drink.name]}
          </H1>
          <Text>
            {`ID: ${drink.drink_id}`}
          </Text>
          <Text>
            {`Price: $${drink.price}`}
          </Text>
        </Body>
      </CardItem>
    ))}
  </Card>
);
