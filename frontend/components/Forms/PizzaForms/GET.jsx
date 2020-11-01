// @ts-check
import { Input, Item, Label } from 'native-base';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import theme from '../../../styles';

export default ({ actionCreators, dispatch }) => (
  <>
    <Text style={theme.centerText}>
      If you want to see all pizzas, just press submit with no ID!
    </Text>
    <Item
      floatingLabel
      style={theme.firstItem}
    >
      <Label>Pizza ID</Label>
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

const styles = StyleSheet.create({});
