// @ts-check
import { Picker } from '@react-native-picker/picker';
import {
  Icon,
  Input,
  Item,
  Label,
} from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

const sizes = [
  { name: 'XL', value: 0 },
  { name: 'L', value: 1 },
  { name: 'M', value: 2 },
  { name: 'S', value: 3 },
];

export default ({ actionCreators, dispatch, state }) => (
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
    <Item style={{ flex: 1 }}>
      <Label>Size</Label>
      <Picker
        style={{
          flex: 1,
          alignSelf: 'center',
          justifyContent: 'center',
          marginLeft: 20,
        }}
        selectedValue={state.size}
        onValueChange={(value) => {
          dispatch(actionCreators.updateSize(value));
        }}
      >
        {sizes.map((size) => (
          <Picker.Item
            label={size.name}
            value={size.value}
            key={size.value}
          />
        ))}
      </Picker>
    </Item>
    <Item
      floatingLabel
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
);

const styles = StyleSheet.create({});
