// @ts-check
import { Input, Item, Label } from 'native-base';
import React from 'react';
import { Text } from 'react-native';
import theme from '../../../styles';

export default ({ actionCreators, dispatch }) => (
  <>
    <Text style={theme.centerText}>
      If you want to see all toppings, just press submit with no ID!
    </Text>
    <Item
      floatingLabel
    >
      <Label>Topping ID</Label>
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="numeric"
        onChangeText={(text) => {
          dispatch(actionCreators.updateID(text));
        }}
      />
    </Item>
  </>
);
