import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './screens/Home';
import ExampleScreen from './screens/Example';

export default createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Example: { screen: ExampleScreen },
  },
  {
    initialRouteName: 'Home',
  },
);
