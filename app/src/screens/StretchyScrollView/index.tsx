import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import SafeAreaView from 'react-native-safe-area-view';

import { Avatar, Button, StretchyScrollView, Theme, useTheme } from 'rnbase-ui';

type NavigationState = {
  params: {};
};

type Props = {
  navigation: NavigationScreenProp<NavigationState>;
};

const StretchyScrollViewScreen: React.FC<Props> = ({ navigation }) => {
  const {
    theme: { colors, styles },
  } = useTheme(createStyles);

  const item = navigation.getParam('item');

  return (
    <StretchyScrollView
      headerHeight={212}
      headerBackground={
        <Image style={styles.headerImage} source={{ uri: item.image }} blurRadius={15} />
      }
      headerBackgroundColor={colors.black}
      headerContent={<Avatar style={styles.avatar} size={128} imageSource={{ uri: item.image }} />}
      contentContainerStyle={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.email} numberOfLines={1}>
            {item.email}
          </Text>
          <Text style={styles.text}>
            This sample user details screen has been created using{' '}
            <Text style={styles.textBold}>StretchyScrollView</Text> component. For the header
            background we have used the same avatar image with a blur filter applied.
          </Text>
        </View>
        <Button style={styles.button} text="Back to List" onPress={() => navigation.goBack()} />
      </SafeAreaView>
    </StretchyScrollView>
  );
};

const createStyles = ({ colors, fonts }: Theme) =>
  StyleSheet.create({
    headerImage: {
      opacity: 0.8,
    },
    avatar: {
      borderWidth: 5,
      borderColor: colors.white,
    },
    container: {
      flexGrow: 1,
    },
    content: {
      flexGrow: 1,
      alignItems: 'center',
      paddingVertical: 20,
      paddingHorizontal: 15,
    },
    name: {
      ...fonts.semibold,
      fontSize: 26,
      color: colors.black,
    },
    email: {
      ...fonts.light,
      fontSize: 16,
      color: colors.gray,
    },
    text: {
      ...fonts.light,
      fontSize: 18,
      lineHeight: 26,
      marginVertical: 20,
      color: colors.black,
      textAlign: 'center',
    },
    textBold: {
      fontWeight: '500',
    },
    button: {
      margin: 15,
    },
  });

export default StretchyScrollViewScreen;
