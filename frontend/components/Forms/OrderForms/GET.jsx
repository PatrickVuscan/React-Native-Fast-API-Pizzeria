// @ts-check
import { Input, Item, Label } from 'native-base';
import React from 'react';
import { Text } from 'react-native';
import theme from '../../../styles';

export default ({ actionCreators, dispatch, state }) => (
  <>
    <Text style={theme.centerText}>
      If you want to see all orders, just press submit with no ID!
    </Text>
    <Item
      floatingLabel
    >
      <Label>Order ID</Label>
      <Input
        value={state.order_id}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="numeric"
        onChangeText={(text) => {
          dispatch(actionCreators.updateOrderID(text));
        }}
      />
    </Item>
  </>
);
