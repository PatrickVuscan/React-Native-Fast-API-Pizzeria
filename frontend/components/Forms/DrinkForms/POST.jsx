// @ts-check
import { Input, Item, Label } from 'native-base';
import React from 'react';

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
      {/* <Item
        style={{
          flex: 1,
          alignItems: 'stretch',
          flexDirection: 'column',
        }}
      >
        <SectionedMultiSelect
          styles={{ container: { flex: 1 } }}
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
      </Item> */}
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
