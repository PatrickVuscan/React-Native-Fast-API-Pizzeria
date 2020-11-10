// @ts-check
import { Input, Item, Label } from 'native-base';
import React from 'react';
import { Text } from 'react-native';
import theme from '../../../styles';

export default ({ actionCreators, dispatch, state }) => (
  <>
    <Text style={theme.centerText}>
      {"Enter the ID of the Topping you'd like to delete"}
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
  </>
);
