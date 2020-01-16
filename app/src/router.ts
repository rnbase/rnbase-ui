import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './screens/Home';
import ExampleScreen from './screens/Example';
import StretchyFlatListScreen from './screens/StretchyFlatList';

export default createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Example: { screen: ExampleScreen },
    StretchyFlatList: { screen: StretchyFlatListScreen },
  },
  {
    initialRouteName: 'Home',
  },
);
