import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import { Button, StretchyScrollView } from '../../../..';

type NavigationState = {
  params: {};
};

type Props = {
  navigation: NavigationScreenProp<NavigationState>;
};

const images = [
  { uri: 'https://picsum.photos/id/112/900/600' },
  { uri: 'https://picsum.photos/id/1041/900/600' },
  { uri: 'https://picsum.photos/id/167/900/600' },
  { uri: 'https://picsum.photos/id/487/900/600' },
  { uri: 'https://picsum.photos/id/106/900/600' },
];

const HomeScreen: React.FC<Props> = ({ navigation }) => (
  <StretchyScrollView
    headerImages={images}
    headerHeight={300}
    headerBackgroundColor="#30303C"
    headerContent={<Image style={styles.logo} source={require('../../assets/logo.png')} />}
  >
    <View style={styles.container}>
      <Button
        themeKey="HomeButton"
        text="Component Examples"
        onPress={() => navigation.navigate('Example')}
      />
      <View style={styles.separator} />
      <Button
        themeKey="HomeButton"
        text="Stretchy Header"
        onPress={() => navigation.navigate('StretchyFlatList')}
      />
    </View>
  </StretchyScrollView>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
  },
  separator: {
    marginVertical: 10,
    backgroundColor: '#0003',
    height: StyleSheet.hairlineWidth,
  },
});

export default HomeScreen;
