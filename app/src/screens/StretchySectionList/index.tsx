import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import { Avatar, StretchySectionList, useTheme, Theme } from 'rnbase-ui';

import { generateHeaderImages, generateUsers } from '../../data';

type NavigationState = {
  params: {};
};

type Props = {
  navigation: NavigationScreenProp<NavigationState>;
};

const StretchySectionListScreen: React.FC<Props> = ({ navigation }) => {
  const [headerImages] = useState(() => generateHeaderImages(3));
  const [sections] = useState(() => [
    { data: generateUsers(5), title: 'Administrators' },
    { data: generateUsers(10), title: 'Employees' },
    { data: generateUsers(15), title: 'Customers' },
  ]);
  const { Colors, Fonts } = useTheme();
  const styles = createStyles({ Colors, Fonts });

  return (
    <StretchySectionList
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
      sections={sections}
      keyExtractor={item => `item-${item.id}`}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderSectionHeader={({ section }) => (
        <View style={styles.section}>
          <Text style={styles.sectionText}>{section.title}</Text>
        </View>
      )}
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
    section: {
      backgroundColor: Colors.gray6,
    },
    sectionText: {
      ...Fonts.semibold,
      fontSize: 18,
      color: Colors.blue,
      padding: 15,
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

export default StretchySectionListScreen;
