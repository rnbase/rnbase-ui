import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import { Button, StretchyScrollView } from 'rnbase-ui';

import { HeaderImages } from '../../data';

type NavigationState = {
  params: {};
};

type Props = {
  navigation: NavigationScreenProp<NavigationState>;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => (
  <StretchyScrollView
    headerHeight={300}
    headerImages={HeaderImages}
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
        text="Stretchy Flat List"
        onPress={() => navigation.navigate('StretchyFlatList')}
      />
      <View style={styles.separator} />
      <Button
        themeKey="HomeButton"
        text="Stretchy Section List"
        onPress={() => navigation.navigate('StretchySectionList')}
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
