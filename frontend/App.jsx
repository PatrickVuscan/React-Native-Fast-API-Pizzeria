/* eslint-disable global-require */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
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
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    // Setting the state to true when font is loaded.
    this.setState({ isReady: true });
  }

  render() {
    const { isReady } = this.state;
    if (!isReady) {
      return <AppLoading />;
    }

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
}

/* export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(async () => {
    !isReady && await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });

      setIsReady(true);

  }, [])

  if (!isReady) {
    return <AppLoading />;
  }

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
} */
