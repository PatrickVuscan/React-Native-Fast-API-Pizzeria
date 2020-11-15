// @ts-check
import { Picker } from '@react-native-picker/picker';
import {
  Button, Container, Content, Form, Header, Text, View,
} from 'native-base';
import React, { useEffect, useReducer, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import DeleteOrdersForm from '../components/Forms/OrderForms/DELETE';
import GetOrdersForm from '../components/Forms/OrderForms/GET';
import PostOrdersForm from '../components/Forms/OrderForms/POST';
import PutOrdersForm from '../components/Forms/OrderForms/PUT';
import OrderList from '../components/Lists/OrderList';
import { actionCreators, initialState, reducer } from '../reducers/OrderReducer';
import theme from '../styles';

const requests = ['POST', 'GET', 'PUT', 'DELETE'];

const deliveryEnum = {
  0: 'Pickup',
  1: 'In House',
  2: 'Uber Eats',
  3: 'Foodora',
};

const drinkEnum = {
  0: "Water",
  1: "Sparkling Water",
  2: "Juice",
  3: "Coke",
  4: "Diet Coke",
  5: "Coke Zero",
  6: "Pepsi",
  7: "Dr. Pepper",
};

export default function Orders() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [orders, setOrders] = useState([]);
  const [pizzas, setPizzas] = useState([]);
  const [drinks, setDrinks] = useState([]);
  let formElements = null;

  useEffect(() => {
    const refreshDrinks = async () => {
      fetch(`http://127.0.0.1:5000/drinks`)
        .then((res) => res.json())
        .then((json) => {
          setDrinks(json);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    refreshDrinks();
  }, [state.request]);

  useEffect(() => {
    const refreshPizzas = async () => {
      fetch(`http://127.0.0.1:5000/pizzas`)
        .then((res) => res.json())
        .then((json) => {
          setPizzas(json);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    refreshPizzas();
  }, [state.request]);

  const submit = () => {
    if (state.request === 'GET') {
      if (state.order_id) {
        return fetch(`http://127.0.0.1:5000/orders/${state.order_id}`)
          .then((response) => response.json())
          .then((json) => {
            setOrders([json]);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      return fetch(`http://127.0.0.1:5000/orders`)
        .then((response) => response.json())
        .then((json) => {
          setOrders(json);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (state.request === 'POST') {
      console.log("CURRENT STATE: ", state);
      return fetch(`http://127.0.0.1:5000/orders/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id: state.customer_id,
        }),
      })
        .then((response) => response.json())
        .then((res) => fetch(`http://127.0.0.1:5000/orders/${res.order_id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pizzas: state.pizzas,
            drinks: state.drinks,
            delivery_method: parseInt(state.delivery_method, 10),
          }),
        }))
        .then((res) => res.json())
        .then((json) => {
          console.log('this is the returned order after post update', json);
          setOrders([json]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (state.request === 'PUT') {
      return fetch(`http://127.0.0.1:5000/orders/${state.order_id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pizzas: state.pizzas,
          drinks: state.drinks,
          is_completed: state.is_completed,
          delivery_method: parseInt(state.delivery_method, 10),
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          setOrders([json]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (state.request === 'DELETE') {
      return fetch(`http://127.0.0.1:5000/orders/${state.order_id}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((json) => {
          setOrders([json]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  if (state.request === 'GET') {
    formElements = (
      <GetOrdersForm
        actionCreators={actionCreators}
        dispatch={dispatch}
        state={state}
      />
    );
  }

  if (state.request === 'POST') {
    formElements = (
      <PostOrdersForm
        actionCreators={actionCreators}
        dispatch={dispatch}
        state={state}
        drinks={drinks}
        drinkEnum={drinkEnum}
        pizzas={pizzas}
        deliveryEnum={deliveryEnum}
      />
    );
  }

  if (state.request === 'PUT') {
    formElements = (
      <PutOrdersForm
        actionCreators={actionCreators}
        dispatch={dispatch}
        state={state}
        drinkEnum={drinkEnum}
        pizzas={pizzas}
        deliveryEnum={deliveryEnum}
        drinks={drinks}
      />
    );
  }

  if (state.request === 'DELETE') {
    formElements = (
      <DeleteOrdersForm
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
          <OrderList
            orders={orders}
            drinkEnum={drinkEnum}
          />
        </Content>
      </ScrollView>
    </Container>
  );
}
