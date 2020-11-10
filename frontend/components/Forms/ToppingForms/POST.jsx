// @ts-check
import { Input, Item, Label } from 'native-base';
import React from 'react';

export default ({ actionCreators, dispatch, state }) => (
  <>
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
