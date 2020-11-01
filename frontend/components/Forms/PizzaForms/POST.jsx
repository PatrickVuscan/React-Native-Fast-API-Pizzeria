// @ts-check
import { Input, Item, Label } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

export default ({ actionCreators, dispatch }) => {
    return (
      <>
        <Item
          floatingLabel
        >
          <Label>Name</Label>
          <Input
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
          <Label>Size</Label>
          <Input />
        </Item>
        <Item
          floatingLabel
          last
        >
          <Label>Price</Label>
          <Input
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
          <Label>Toppings</Label>
          <Input />
        </Item>
      </>
    )
}

const styles = StyleSheet.create({})
