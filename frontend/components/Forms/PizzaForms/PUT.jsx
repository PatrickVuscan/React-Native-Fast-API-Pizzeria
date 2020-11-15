// @ts-check
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import {
  Input,
  Item,
  Label,
  Text,
} from 'native-base';
import React from 'react';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import theme from '../../../styles';

const sizes = [
  { name: 'XL', value: 0 },
  { name: 'L', value: 1 },
  { name: 'M', value: 2 },
  { name: 'S', value: 3 },
];

export default ({
  actionCreators, dispatch, state, toppings,
}) => {
  const toppingsMS = [
    {
      id: 1,
      name: 'Toppings',
      children: toppings,
    },
  ];

  return (
    <>
      <Text style={theme.centerText}>
        Update your Pizza by adding in the ID and selecting new properties for the pizza!
      </Text>
      <Item
        floatingLabel
      >
        <Label>Pizza ID</Label>
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
      <Item style={{ flex: 1, borderBottomWidth: 0 }}>
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
          value={state.price}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="numeric"
          onChangeText={(text) => {
            dispatch(actionCreators.updatePrice(text));
          }}
        />
      </Item>
      <Item
        style={{
          flex: 1,
          alignItems: 'stretch',
          flexDirection: 'column',
        }}
      >
        <SectionedMultiSelect
          styles={{ container: { flex: 1 } }}
          selectedItems={state.toppings}
          items={toppingsMS}
          expandDropDowns
          // @ts-ignore
          IconRenderer={MaterialIcons}
          uniqueKey="topping_id"
          subKey="children"
          selectText="Select Topings"
          alwaysShowSelectText
          showDropDowns
          readOnlyHeadings
          modalWithSafeAreaView
          onSelectedItemsChange={(t) => {
            dispatch(actionCreators.updateToppings(t));
          }}
        />
      </Item>
    </>
  );
};
