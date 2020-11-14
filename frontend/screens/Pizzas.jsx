import { Picker } from '@react-native-picker/picker';
import {
  Button,
  Container,
  Content,
  Form,
  Header,
  Text,
} from 'native-base';
import React, { useReducer, useState, useEffect } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DeletePizzasForm from '../components/Forms/PizzaForms/DELETE';
import GetPizzasForm from '../components/Forms/PizzaForms/GET';
import PostPizzasForm from '../components/Forms/PizzaForms/POST';
import PutPizzasForm from '../components/Forms/PizzaForms/PUT';
import PizzaList from '../components/Lists/PizzaList';
import { actionCreators, initialState, reducer } from '../reducers/PizzaReducer';
import theme from '../styles';

const requests = ['POST', 'GET', 'PUT', 'DELETE'];

const Pizzas = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [pizzas, setPizzas] = useState([]);
  const [toppings, setToppings] = useState([]);
  let formElements = null;

  useEffect(() => {
    const refreshToppings = async () => {
      fetch(`http://127.0.0.1:5000/toppings`)
        .then((res) => res.json())
        .then((json) => {
          setToppings(json);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    refreshToppings();
  }, []);

  const submit = () => {
    if (state.request === 'GET') {
      if (state.id) {
        return fetch(`http://127.0.0.1:5000/pizzas/${state.id}`)
          .then((response) => response.json())
          .then((json) => {
            setPizzas([json]);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      return fetch(`http://127.0.0.1:5000/pizzas`)
        .then((response) => response.json())
        .then((json) => {
          setPizzas(json);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (state.request === 'POST') {
      return fetch(`http://127.0.0.1:5000/pizzas/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: state.name,
          size: state.size,
          base_price: state.basePrice,
        }),
      })
        .then((response) => response.json())
        .then((res) => fetch(`http://127.0.0.1:5000/pizzas/${res.pizza_id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            toppings: state.toppings,
          }),
        }))
        .then((res) => res.json())
        .then((json) => {
          setPizzas([json]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (state.request === 'PUT') {
      return fetch(`http://127.0.0.1:5000/pizzas/${state.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: state.name,
          base_price: state.basePrice,
          toppings: state.toppings,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          setPizzas([json]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (state.request === 'DELETE') {
      return fetch(`http://127.0.0.1:5000/pizzas/${state.id}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((json) => {
          setPizzas([json]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  if (state.request === 'GET') {
    formElements = (
      <GetPizzasForm
        actionCreators={actionCreators}
        dispatch={dispatch}
        state={state}
      />
    );
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
          <PizzaList pizzas={pizzas} />
        </Content>
      </ScrollView>
    </Container>
  );
};

// const styles = StyleSheet.create({});

export default Pizzas;
