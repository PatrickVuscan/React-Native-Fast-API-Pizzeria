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
import React, { useEffect, useReducer, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DeleteDrinksForm from '../components/Forms/DrinkForms/DELETE';
import GetDrinksForm from '../components/Forms/DrinkForms/GET';
import PostDrinksForm from '../components/Forms/DrinkForms/POST';
import PutDrinksForm from '../components/Forms/DrinkForms/PUT';
import DrinkList from '../components/Lists/DrinkList';
import { actionCreators, initialState, reducer } from '../reducers/DrinkReducer';
import theme from '../styles';

const requests = ['POST', 'GET', 'PUT', 'DELETE'];

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

const Drinks = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
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
  }, []);

  const submit = () => {
    if (state.request === 'GET') {
      if (state.id) {
        return fetch(`http://127.0.0.1:5000/drinks/${state.id}`)
          .then((response) => response.json())
          .then((json) => {
            setDrinks([json]);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      return fetch(`http://127.0.0.1:5000/drinks`)
        .then((response) => response.json())
        .then((json) => {
          setDrinks(json);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (state.request === 'POST') {
      return fetch(`http://127.0.0.1:5000/drinks`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: parseInt(state.name, 10),
          price: state.price,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          setDrinks([json]);
        })
        .catch((error) => {
          console.error('error', error);
        });
    }
    if (state.request === 'PUT') {
      return fetch(`http://127.0.0.1:5000/drinks/${state.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: parseInt(state.name, 10),
          price: state.price,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          setDrinks([json]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (state.request === 'DELETE') {
      return fetch(`http://127.0.0.1:5000/drinks/${state.id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((json) => {
          setDrinks([json]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  if (state.request === 'GET') {
    formElements = (
      <GetDrinksForm
        actionCreators={actionCreators}
        dispatch={dispatch}
        state={state}
      />
    );
  }

  if (state.request === 'POST') {
    formElements = (
      <PostDrinksForm
        actionCreators={actionCreators}
        dispatch={dispatch}
        state={state}
        drinkEnum={drinkEnum}
      />
    );
  }

  if (state.request === 'PUT') {
    formElements = (
      <PutDrinksForm
        actionCreators={actionCreators}
        dispatch={dispatch}
        state={state}
        drinkEnum={drinkEnum}
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
          <DrinkList
            drinks={drinks}
            drinkEnum={drinkEnum}
          />
        </Content>
      </ScrollView>
    </Container>
  );
};

export default Drinks;
