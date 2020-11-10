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
import DeleteToppingsForm from '../components/Forms/ToppingForms/DELETE';
import GetToppingsForm from '../components/Forms/ToppingForms/GET';
import PostToppingsForm from '../components/Forms/ToppingForms/POST';
import PutToppingsForm from '../components/Forms/ToppingForms/PUT';
import ToppingList from '../components/Lists/ToppingList';
import { actionCreators, initialState, reducer } from '../reducers/ToppingReducer';
import theme from '../styles';

const toppings = [
  { id: 1, name: 'Steak', price: 5.99 },
  { id: 2, name: 'Pepperoni', price: 2.99 },
  { id: 3, name: 'Parmesan', price: 1.99 },
  { id: 4, name: 'Chicken', price: 4.99 },
  { id: 5, name: 'Red Peppers', price: 1.99 },
  { id: 6, name: 'Onion', price: 0.99 },
];

const requests = ['POST', 'GET', 'PUT', 'DELETE'];

const Toppings = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  let formElements = null;
  let toppingList = null;

  const submit = () => {
  };

  if (state.request === 'GET') {
    formElements = (
      <GetToppingsForm
        actionCreators={actionCreators}
        dispatch={dispatch}
        state={state}
      />
    );

    toppingList = <ToppingList toppings={toppings} />;
  }

  if (state.request === 'POST') {
    formElements = (
      <PostToppingsForm
        actionCreators={actionCreators}
        dispatch={dispatch}
        state={state}
      />
    );
  }

  if (state.request === 'PUT') {
    formElements = (
      <PutToppingsForm
        actionCreators={actionCreators}
        dispatch={dispatch}
        state={state}
      />
    );
  }

  if (state.request === 'DELETE') {
    formElements = (
      <DeleteToppingsForm
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
          {state.request === 'GET' && toppingList}
        </Content>
      </ScrollView>
    </Container>
  );
};

export default Toppings;
