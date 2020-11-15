// @ts-check
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { Input, Item, Label } from 'native-base';
import React from 'react';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

export default ({
  actionCreators, dispatch, state, pizzas, deliveryEnum, drinks, drinkEnum,
}) => {
  const pizzasMS = [
    {
      id: 1,
      name: 'Pizzas',
      children: pizzas,
    },
  ];

  const drinksEnumerated = [];
  if (drinks) {
    drinks.forEach((drink) => {
      drinksEnumerated.push({
        ...drink,
        name: drinkEnum[drink.name],
      });
    });
  }

  const drinksMS = [
    {
      id: 1,
      name: 'Drinks',
      children: drinksEnumerated,
    },
  ];

  return (
    <>
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
      <Item style={{ flex: 1 }}>
        <Label>Delivery Method</Label>
        <Picker
          style={{
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
            marginLeft: 20,
          }}
          selectedValue={state.delivery_method}
          onValueChange={(value) => {
            console.log('delivery method udpatge', value);
            dispatch(actionCreators.updateDeliveryMethod(value));
          }}
        >
          {Object.keys(deliveryEnum).map((key) => (
            <Picker.Item
              label={deliveryEnum[key]}
              value={key}
              key={key}
            />
          ))}
        </Picker>
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
          selectedItems={state.pizzas}
          items={pizzasMS}
          expandDropDowns
          // @ts-ignore
          IconRenderer={MaterialIcons}
          uniqueKey="pizza_id"
          subKey="children"
          selectText="Select Pizzas"
          alwaysShowSelectText
          showDropDowns
          readOnlyHeadings
          modalWithSafeAreaView
          onSelectedItemsChange={(p) => {
            dispatch(actionCreators.updatePizzas(p));
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
          selectedItems={state.drinks}
          items={drinksMS}
          expandDropDowns
          // @ts-ignore
          IconRenderer={MaterialIcons}
          uniqueKey="drink_id"
          subKey="children"
          selectText="Select Drinks"
          alwaysShowSelectText
          showDropDowns
          readOnlyHeadings
          modalWithSafeAreaView
          onSelectedItemsChange={(d) => {
            dispatch(actionCreators.updateDrinks(d));
          }}
        />
      </Item>
    </>
  );
};
