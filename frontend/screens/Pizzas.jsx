// @ts-check
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Form, H1, Header, Input, Item, Label, Row, Text,
} from 'native-base';
import React, { useReducer } from 'react';
import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';

const pizzas = [
  {
    id: 1,
    name: 'Peperoni Pizza',
    size: 'XL',
    toppings: ['Peperoni', 'Steak'],
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

const actionTypes = {
  UPDATE_REQUEST: 'UPDATE_REQUEST',
  UPDATE_ID: 'UPDATE_ID',
  UPDATE_NAME: 'UPDATE_NAME',
  UPDATE_SIZE: 'UPDATE_SIZE',
  UPDATE_BASE_PRICE: 'UPDATE_BASE_PRICE',
};

const actionCreators = {
  updateRequest: (request) => ({ type: actionTypes.UPDATE_REQUEST, payload: request }),
  updateID: (id) => ({ type: actionTypes.UPDATE_ID, payload: id }),
  updateName: (name) => ({ type: actionTypes.UPDATE_NAME, payload: name }),
  updateSize: (size) => ({ type: actionTypes.UPDATE_SIZE, payload: size }),
  updateBasePrice: (price) => ({ type: actionTypes.UPDATE_BASE_PRICE, payload: price }),
};

const initialState = {
  request: 'GET',
  id: '',
  name: '',
  size: 3,
  basePrice: 0.00,
};

const reducer = (state, action) => {
  console.log('HEY! IM HERE!', action);
  switch (action.type) {
  case actionTypes.UPDATE_REQUEST:
    return { ...state, request: action.payload };
  case actionTypes.UPDATE_ID:
    return { ...state, id: action.payload };
  case actionTypes.UPDATE_NAME:
    return { ...state, name: action.payload };
  case actionTypes.UPDATE_SIZE:
    return { ...state, size: action.payload };
  case actionTypes.UPDATE_BASE_PRICE:
    return { ...state, basePrice: action.payload };
  default:
    return state;
  }
};

const Pizzas = (props) => {
  console.log(props);
  const [state, dispatch] = useReducer(reducer, initialState);

  let formElements;
  let pizzaList;

  const submit = () => {
  };

  if (state.request === 'GET') {
    formElements = (
      <>
        <Text style={styles.centerText}>
          If you want to see all pizzas, just press submit with no ID!
        </Text>
        <Item
          floatingLabel
          style={styles.firstItem}
        >
          <Label>Pizza ID</Label>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="numeric"
            onChangeText={(text) => {
              dispatch(actionCreators.updateID(text));
            }}
          />
        </Item>
      </>
    );

    pizzaList = (
      <Card style={{ ...styles.card, ...styles.padding }}>
        <CardItem
          header
          bordered
        >
          <Text>Pizzas available at Milano Pizzeria!</Text>
        </CardItem>
        {pizzas.map((pizza) => (
          <CardItem
            bordered
            key={pizza.id}
          >
            <Body>
              <H1>
                {pizza.name}
              </H1>
              <Text>
                {`Size: ${pizza.size}`}
              </Text>
              <Text>
                {`Toppings: ${pizza.toppings.join(', ')}`}
              </Text>
              <Text>
                {`Price: ${pizza.base_price}`}
              </Text>
            </Body>
          </CardItem>
        ))}
      </Card>
    );
  }

  if (state.request === 'POST') {
    formElements = (
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
        <Item
          floatingLabel
        >
          <Label>Size</Label>
          <Input />
        </Item>
        <Item
          floatingLabel
          last
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
  }

  return (
    <ScrollView
      automaticallyAdjustContentInsets
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
    >
      <Row>
        <Container>
          <Header style={styles.verticalCenter}>
            <Text style={styles.header}>
              Milano Pizzeria
            </Text>
          </Header>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.centerText}>
              Request Type
            </Text>
            <Picker
              mode="dropdown"
              style={{ width: '30%' }}
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
            style={{ ...styles.form, ...styles.margin }}
          >
            {formElements}
            <Button
              style={{ ...styles.spaceItem, ...styles.centerElement }}
              onPress={submit}
            >
              <Text>Submit</Text>
            </Button>
          </Form>
          {pizzaList}
        </Container>
      </Row>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  padding: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  margin: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  card: {
    marginLeft: 20,
    marginRight: 20,
  },
  centerElement: {
    alignSelf: 'center',
  },
  centerText: {
    textAlign: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstItem: {
    marginTop: 0,
  },
  form: {
    padding: 20,
    backgroundColor: '#eee',
  },
  header: {
    fontSize: 20,
    fontWeight: '400',
  },
  spaceItem: {
    margin: 20,
  },
  verticalCenter: { alignItems: 'center' },
});

export default Pizzas;
