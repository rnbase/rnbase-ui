import { createStackNavigator, HeaderStyleInterpolators } from 'react-navigation-stack';

import HomeScreen from './screens/Home';
import ExampleScreen from './screens/Example';
import StretchyFlatListScreen from './screens/StretchyFlatList';

export default createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Example: {
      screen: ExampleScreen,
      navigationOptions: {
        title: 'Component Examples',
      },
    },
    StretchyFlatList: {
      screen: StretchyFlatListScreen,
      navigationOptions: {
        title: 'Stretchy Header',
      },
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerBackTitle: 'Back',
      headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
      cardStyle: {
        backgroundColor: 'white',
      },
    },
  },
);
