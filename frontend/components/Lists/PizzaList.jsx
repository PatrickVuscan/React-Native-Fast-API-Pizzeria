// @ts-check
import {
  Body,
  Card,
  CardItem,
  H1,
  Text,
} from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import theme from '../../styles';

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
        key={pizza.id}
      >
        <Body>
          <H1>
            {pizza.name}
          </H1>
          <Text>
            {`Size: ${pizza.size}`}
          </Text>
          <Text>
            {`Toppings: ${pizza.toppings.join(', ')}`}
          </Text>
          <Text>
            {`Price: ${pizza.base_price}`}
          </Text>
        </Body>
      </CardItem>
    ))}
  </Card>
);

const styles = StyleSheet.create({});
