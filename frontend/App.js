import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Drinks from "./screens/Drinks";
import Orders from "./screens/Orders";
import Pizzas from "./screens/Pizzas";
import Toppings from "./screens/Toppings";


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
	>
        <Tab.Screen name="Pizzas" component={Pizzas} />
        <Tab.Screen name="Drinks" component={Drinks} />
        <Tab.Screen name="Toppings" component={Toppings} />
        <Tab.Screen name="Orders" component={Orders} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
