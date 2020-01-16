import React from 'react';
import { StyleSheet, View } from 'react-native';

import { NavigationScreenProp } from 'react-navigation';

import { Button } from '../../../..';

type NavigationState = {
  params: {};
};

type Props = {
  navigation: NavigationScreenProp<NavigationState>;
};

const HomeScreen: React.FC<Props> = props => (
  <View style={styles.container}>
    <Button text="Welcome to React" onPress={() => props.navigation.navigate('Example')} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

export default HomeScreen;
