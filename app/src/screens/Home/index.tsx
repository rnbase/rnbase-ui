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
    <Button text="Example" onPress={() => props.navigation.navigate('Example')} />
    <Button text="StretchyFlatList" onPress={() => props.navigation.navigate('StretchyFlatList')} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

export default HomeScreen;
