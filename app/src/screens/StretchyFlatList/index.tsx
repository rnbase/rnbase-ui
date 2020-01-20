import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import { Avatar, StretchyFlatList, Themed, Theme, useTheme, withTheme } from 'rnbase-ui';

import { generateHeaderImages, generateUsers } from '../../data';

type NavigationState = {
  params: {};
};

type Props = {
  navigation: NavigationScreenProp<NavigationState>;
};

const StretchyFlatListScreen: React.FC<Themed<typeof createStyles, Props>> = ({
  navigation,
  styles,
}) => {
  const [headerImages] = useState(() => generateHeaderImages(3));
  const [users] = useState(() => generateUsers(50));
  const { Colors } = useTheme();

  return (
    <StretchyFlatList
      headerHeight={212}
      headerBackground={headerImages.map(source => (
        <Image style={styles.headerImage} source={source} />
      ))}
      headerBackgroundColor={Colors.black}
      headerContent={
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Stretchy Header</Text>
          <Text style={styles.headerText}>With image gallery in the background</Text>
        </View>
      }
      ListFooterComponent={
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            People avatars, names, and email addresses listed on this screen are fake data generated
            using Faker.js
          </Text>
        </View>
      }
      data={users}
      keyExtractor={item => `item-${item.id}`}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => (
        <TouchableHighlight
          activeOpacity={1}
          underlayColor={Colors.underlay}
          onPress={() => navigation.navigate('StretchyScrollView', { item })}
        >
          <View style={styles.item}>
            <Avatar size={50} imageSource={{ uri: item.image }} />
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.itemText} numberOfLines={1}>
                {item.email}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      )}
    />
  );
};

const createStyles = ({ Colors, Fonts }: Theme) =>
  StyleSheet.create({
    headerImage: {
      opacity: 0.5,
    },
    headerContent: {
      alignItems: 'center',
    },
    headerTitle: {
      ...Fonts.bold,
      fontSize: 35,
      color: Colors.white,
    },
    headerText: {
      ...Fonts.normal,
      fontSize: 18,
      color: Colors.white,
    },
    separator: {
      marginHorizontal: 10,
      backgroundColor: Colors.separator,
      height: StyleSheet.hairlineWidth,
    },
    item: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 15,
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemContent: {
      flex: 1,
      marginLeft: 10,
    },
    itemTitle: {
      ...Fonts.semibold,
      fontSize: 16,
      color: Colors.black,
    },
    itemText: {
      ...Fonts.normal,
      fontSize: 13,
      color: Colors.gray,
    },
    footer: {
      marginTop: 10,
      marginBottom: 35,
      alignItems: 'center',
    },
    footerText: {
      ...Fonts.normal,
      fontSize: 13,
      maxWidth: 320,
      textAlign: 'center',
      color: Colors.gray2,
    },
  });

export default withTheme(StretchyFlatListScreen, createStyles, 'StretchyFlatListScreen');
