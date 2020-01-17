import React from 'react';
import { StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';

import RootNavigator from './router';
import theme from './theme';

import { ThemeProvider } from '../..';

StatusBar.setBarStyle('dark-content');

const AppContainer = createAppContainer(RootNavigator);

const App = () => (
  <ThemeProvider colorScheme="no-preference" theme={theme}>
    <AppContainer />
  </ThemeProvider>
);

export default App;
