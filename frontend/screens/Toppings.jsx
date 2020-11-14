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
import DeleteToppingsForm from '../components/Forms/ToppingForms/DELETE';
import GetToppingsForm from '../components/Forms/ToppingForms/GET';
import PostToppingsForm from '../components/Forms/ToppingForms/POST';
import PutToppingsForm from '../components/Forms/ToppingForms/PUT';
import ToppingList from '../components/Lists/ToppingList';
import { actionCreators, initialState, reducer } from '../reducers/ToppingReducer';
import theme from '../styles';

const requests = ['POST', 'GET', 'PUT', 'DELETE'];

const Toppings = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
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
        return fetch(`http://127.0.0.1:5000/toppings/${state.id}`)
          .then((res) => res.json())
          .then((json) => {
            setToppings([json]);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      return fetch(`http://127.0.0.1:5000/toppings`)
        .then((res) => res.json())
        .then((json) => {
          setToppings(json);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (state.request === 'POST') {
      return fetch(`http://127.0.0.1:5000/toppings/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: state.name,
          price: state.price,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          setToppings([json]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (state.request === 'PUT') {
      return fetch(`http://127.0.0.1:5000/toppings/${state.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: state.name,
          price: state.price,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          setToppings([json]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (state.request === 'DELETE') {
      return fetch(`http://127.0.0.1:5000/toppings/${state.id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((json) => {
          setToppings([json]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  if (state.request === 'GET') {
    formElements = (
      <GetToppingsForm
        actionCreators={actionCreators}
        dispatch={dispatch}
        state={state}
      />
    );
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
          <ToppingList toppings={toppings} />
        </Content>
      </ScrollView>
    </Container>
  );
};

export default Toppings;
