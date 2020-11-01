/* eslint-disable global-require */
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import { Spinner, View } from 'native-base';
import React from 'react';
import Drinks from './screens/Drinks';
import Orders from './screens/Orders';
import Pizzas from './screens/Pizzas';
import Toppings from './screens/Toppings';

const Tab = createBottomTabNavigator();

export default class App extends React.Component {
  // checking state for if font is loaded or not.
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    try {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
    } catch (error) {
      console.log(error);
    }
    // Setting the state to true when font is loaded.
    this.setState({ isReady: true });
  }

  render() {
    const { isReady } = this.state;
    if (!isReady) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Spinner color="green" />
        </View>
      );
    }

    return (
      <NavigationContainer style={{ flex: 1 }}>
        <Tab.Navigator
          style={{ flex: 1 }}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            tabStyle: {
              justifyContent: 'center',
            },
          }}
        >
          <Tab.Screen
            name="Pizzas"
            component={Pizzas}
          />
          <Tab.Screen
            name="Drinks"
            component={Drinks}
          />
          <Tab.Screen
            name="Toppings"
            component={Toppings}
          />
          <Tab.Screen
            name="Orders"
            component={Orders}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
