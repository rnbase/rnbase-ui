import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import { Button, StretchyScrollView, Theme, useTheme } from 'rnbase-ui';

import data from '../../data';

type NavigationState = {
  params: {};
};

type Props = {
  navigation: NavigationScreenProp<NavigationState>;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const {
    theme: { colors, styles },
  } = useTheme(createStyles);

  return (
    <StretchyScrollView
      headerHeight={300}
      headerBackground={data.headerImages.map(source => (
        <Image source={source} />
      ))}
      headerBackgroundColor={colors.black}
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
          text="Table Controls"
          onPress={() => navigation.navigate('Table')}
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
};

const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      padding: 15,
    },
    logo: {
      width: 120,
      height: 120,
    },
    separator: {
      marginVertical: 10,
      backgroundColor: colors.separator,
      height: StyleSheet.hairlineWidth,
    },
  });

export default HomeScreen;
