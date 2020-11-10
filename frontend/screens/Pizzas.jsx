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
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DeletePizzasForm from '../components/Forms/PizzaForms/DELETE';
import GetPizzasForm from '../components/Forms/PizzaForms/GET';
import PostPizzasForm from '../components/Forms/PizzaForms/POST';
import PutPizzasForm from '../components/Forms/PizzaForms/PUT';
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

const toppings = [
  { id: 1, name: 'Steak' },
  { id: 2, name: 'Pepperoni' },
  { id: 3, name: 'Parmesan' },
  { id: 4, name: 'Chicken' },
  { id: 5, name: 'Red Peppers' },
  { id: 6, name: 'Onion' },
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
        state={state}
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
        toppings={toppings}
      />
    );
  }

  if (state.request === 'PUT') {
    formElements = (
      <PutPizzasForm
        actionCreators={actionCreators}
        dispatch={dispatch}
        state={state}
        toppings={toppings}
      />
    );
  }

  if (state.request === 'DELETE') {
    formElements = (
      <DeletePizzasForm
        actionCreators={actionCreators}
        dispatch={dispatch}
        state={state}
      />
    );
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
                // @ts-ignore
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
          {state.request === 'GET' && pizzaList}
        </Content>
      </ScrollView>
    </Container>
  );
};

// const styles = StyleSheet.create({});

export default Pizzas;
