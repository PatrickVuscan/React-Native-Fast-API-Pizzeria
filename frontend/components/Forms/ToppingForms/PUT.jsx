// @ts-check
import {
  Input,
  Item,
  Label,
  Text,
} from 'native-base';
import React from 'react';
import theme from '../../../styles';

export default ({ actionCreators, dispatch, state }) => (
  <>
    <Text style={theme.centerText}>
      Update your Topping by adding in the ID and selecting new properties for the topping!
    </Text>
    <Item
      floatingLabel
    >
      <Label>Topping ID</Label>
      <Input
        value={state.id}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="numeric"
        onChangeText={(text) => {
          dispatch(actionCreators.updateID(text));
        }}
      />
    </Item>
    <Item
      floatingLabel
    >
      <Label>Name</Label>
      <Input
        value={state.name}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="numeric"
        onChangeText={(text) => {
          dispatch(actionCreators.updateName(text));
        }}
      />
    </Item>
    <Item
      floatingLabel
    >
      <Label>Price</Label>
      <Input
        value={state.price}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="numeric"
        onChangeText={(text) => {
          dispatch(actionCreators.updatePrice(text));
        }}
      />
    </Item>

  </>
);
