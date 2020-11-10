// @ts-check
import { MaterialIcons } from '@expo/vector-icons';
import {
  Input,
  Item,
  Label,
  Text,
} from 'native-base';
import React from 'react';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import theme from '../../../styles';

export default ({
  actionCreators, dispatch, state, drinks,
}) => {
  const drinksMS = [
    {
      id: 1,
      name: 'Drinks',
      children: drinks,
    },
  ];

  return (
    <>
      <Text style={theme.centerText}>
        Update your Drink by adding in the ID and selecting new properties for the drink!
      </Text>
      <Item
        floatingLabel
      >
        <Label>Drink ID</Label>
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
        style={{
          flex: 1,
          alignItems: 'stretch',
          flexDirection: 'column',
          borderBottomWidth: 0,
          margin: 0,
          padding: 0
        }}
      >
        <SectionedMultiSelect
          selectedItems={[state.name]}
          single
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
          onSelectedItemsChange={(t) => {
            dispatch(actionCreators.updateName(t[0]));
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
