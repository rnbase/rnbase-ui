import { createStackNavigator, HeaderStyleInterpolators } from 'react-navigation-stack';

import HomeScreen from './screens/Home';
import ExampleScreen from './screens/Example';
import StretchyFlatListScreen from './screens/StretchyFlatList';
import StretchySectionListScreen from './screens/StretchySectionList';

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
        title: 'Stretchy FlatList',
      },
    },
    StretchySectionList: {
      screen: StretchySectionListScreen,
      navigationOptions: {
        title: 'Stretchy SectionList',
      },
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerBackTitle: 'Back',
      headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
      cardStyle: {
        backgroundColor: '#fff',
      },
    },
  },
);
