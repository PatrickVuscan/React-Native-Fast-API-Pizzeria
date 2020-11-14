// @ts-check
import { MaterialIcons } from '@expo/vector-icons';
import { Input, Item, Label } from 'native-base';
import React from 'react';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

export default ({
  actionCreators, dispatch, state, drinkEnum,
}) => {
  const drinkNames = [];

  Object.keys(drinkEnum).forEach((key) => {
    drinkNames.push({ id: key, name: drinkEnum[key] });
  });

  const drinksMS = [
    {
      id: 1,
      name: 'Drink Names',
      children: drinkNames,
    },
  ];

  return (
    <>
      <Item
        style={{
          flex: 1,
          alignItems: 'stretch',
          flexDirection: 'column',
        }}
      >
        <SectionedMultiSelect
          single
          styles={{ container: { flex: 1 } }}
          selectedItems={[state.name]}
          items={drinksMS}
          expandDropDowns
          // @ts-ignore
          IconRenderer={MaterialIcons}
          uniqueKey="id"
          subKey="children"
          selectText="Select Drink Name"
          alwaysShowSelectText
          showDropDowns
          readOnlyHeadings
          modalWithSafeAreaView
          onSelectedItemsChange={(drink) => {
            dispatch(actionCreators.updateName(drink[0]));
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
};
