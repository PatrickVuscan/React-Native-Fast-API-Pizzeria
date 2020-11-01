// @ts-check
import { Picker } from '@react-native-picker/picker';
import {
  Button,
  Container,
  Content,
  Form,
  Header,
  Text,
} from 'native-base';
import React, { useReducer } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import GetPizzasForm from '../components/Forms/PizzaForms/GET';
import PostPizzasForm from '../components/Forms/PizzaForms/POST';
import PizzaList from '../components/Lists/PizzaList';
import { actionCreators, initialState, reducer } from '../reducers/PizzaReducer';
import theme from '../styles';

const pizzas = [
  {
    id: 1,
    name: 'Pepperoni Pizza',
    size: 'XL',
    toppings: ['Pepperoni', 'Steak'],
    base_price: 9.98,
  },
  {
    id: 2,
    name: 'Cheese Pizza',
    size: 'L',
    toppings: [],
    base_price: 8.98,
  },
];

const requests = ['POST', 'GET', 'PUT', 'DELETE'];

const Pizzas = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  let formElements = null;
  let pizzaList = null;

  const submit = () => {
  };

  if (state.request === 'GET') {
    formElements = (
      <GetPizzasForm
        actionCreators={actionCreators}
        dispatch={dispatch}
      />
    );

    pizzaList = <PizzaList pizzas={pizzas} />;
  }

  if (state.request === 'POST') {
    formElements = (
      <PostPizzasForm
        actionCreators={actionCreators}
        dispatch={dispatch}
        state={state}
      />
    );

    pizzaList = <PizzaList pizzas={[]} />;
  }

  return (
    <Container>
      <ScrollView
        automaticallyAdjustContentInsets
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
      >
        <Header style={theme.verticalCenter}>
          <Text style={theme.header}>
            Milano Pizzeria
          </Text>
        </Header>
        <Content>
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <Text style={theme.centerText}>
              Request Type
            </Text>
            <Picker
              style={{
                width: '30%',
              }}
              selectedValue={state.request}
              onValueChange={(value) => {
                dispatch(actionCreators.updateRequest(value));
              }}
            >
              {requests.map((r) => (
                <Picker.Item
                  label={r}
                  value={r}
                  key={r}
                />
              ))}
            </Picker>

          </View>
          <Form
            style={{
              ...theme.form,
              ...theme.margin,
            }}
          >
            {formElements}
            <Button
              style={{
                ...theme.spaceItem,
                ...theme.centerElement,
              }}
              onPress={submit}
            >
              <Text>Submit</Text>
            </Button>
          </Form>
          {pizzaList}
        </Content>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Pizzas;
