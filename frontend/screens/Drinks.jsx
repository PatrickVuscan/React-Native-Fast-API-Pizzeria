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
import DeleteDrinksForm from '../components/Forms/DrinkForms/DELETE';
import GetDrinksForm from '../components/Forms/DrinkForms/GET';
import PostDrinksForm from '../components/Forms/DrinkForms/POST';
import PutDrinksForm from '../components/Forms/DrinkForms/PUT';
import DrinkList from '../components/Lists/DrinkList';
import { actionCreators, initialState, reducer } from '../reducers/DrinkReducer';
import theme from '../styles';

const drinks = [
  {
    id: 1,
    name: 'Water',
    price: 1.99,
  },
  {
    id: 2,
    name: 'Sparkling Water',
    price: 1.99,
  },
  {
    id: 3,
    name: 'Juice',
    price: 1.99,
  },
  {
    id: 4,
    name: 'Coke',
    price: 1.99,
  },
  {
    id: 5,
    name: 'Diet Coke',
    price: 1.99,
  },
  {
    id: 6,
    name: 'Zero',
    price: 1.99,
  },
  {
    id: 7,
    name: 'Pepsi',
    price: 1.99,
  },
  {
    id: 8,
    name: 'Dr. Pepper',
    price: 1.99,
  },
];

const requests = ['POST', 'GET', 'PUT', 'DELETE'];

const Drinks = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  let formElements = null;
  let drinkList = null;

  const submit = () => {
  };

  if (state.request === 'GET') {
    formElements = (
      <GetDrinksForm
        actionCreators={actionCreators}
        dispatch={dispatch}
        state={state}
      />
    );

    drinkList = <DrinkList drinks={drinks} />;
  }

  if (state.request === 'POST') {
    formElements = (
      <PostDrinksForm
        actionCreators={actionCreators}
        dispatch={dispatch}
        state={state}
        drinks={drinks}
      />
    );
  }

  if (state.request === 'PUT') {
    formElements = (
      <PutDrinksForm
        actionCreators={actionCreators}
        dispatch={dispatch}
        state={state}
        drinks={drinks}
      />
    );
  }

  if (state.request === 'DELETE') {
    formElements = (
      <DeleteDrinksForm
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
          {state.request === 'GET' && drinkList}
        </Content>
      </ScrollView>
    </Container>
  );
};

export default Drinks;
