import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import { Avatar, StretchySectionList, Table, Theme, useTheme } from 'rnbase-ui';

import { generateHeaderImages, generateUsers } from '../../data';

type NavigationState = {
  params: {};
};

type Props = {
  navigation: NavigationScreenProp<NavigationState>;
};

const StretchySectionListScreen: React.FC<Props> = ({ navigation }) => {
  const {
    theme: { colors, styles },
  } = useTheme(createStyles);

  const [headerImages] = useState(() => generateHeaderImages(3));
  const [sections] = useState(() => [
    { data: generateUsers(5), title: 'Administrators' },
    { data: generateUsers(10), title: 'Employees' },
    { data: generateUsers(15), title: 'Customers' },
  ]);

  return (
    <StretchySectionList
      headerHeight={212}
      headerBackground={headerImages.map(source => (
        <Image style={styles.headerImage} source={source} />
      ))}
      headerBackgroundColor={colors.black}
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
      ItemSeparatorComponent={({ highlighted }) => (
        <Table.Separator insetLeft={80} highlighted={highlighted} />
      )}
      renderSectionHeader={({ section }) => (
        <Table.SectionHeader style={styles.section}>
          <Text style={styles.sectionText}>{section.title}</Text>
        </Table.SectionHeader>
      )}
      renderItem={({ item, separators }) => (
        <Table.Row
          title={item.name}
          subtitle={item.email}
          style={styles.itemRow}
          titleStyle={styles.itemTitle}
          subtitleStyle={styles.itemSubtitle}
          image={<Avatar size={50} imageSource={{ uri: item.image }} />}
          onPress={() => navigation.navigate('StretchyScrollView', { item })}
          onPressIn={separators.highlight}
          onPressOut={separators.unhighlight}
        />
      )}
    />
  );
};

const createStyles = ({ colors, fonts }: Theme) =>
  StyleSheet.create({
    headerImage: {
      opacity: 0.5,
    },
    headerContent: {
      alignItems: 'center',
    },
    headerTitle: {
      ...fonts.bold,
      fontSize: 35,
      color: colors.white,
    },
    headerText: {
      ...fonts.normal,
      fontSize: 18,
      color: colors.white,
    },
    section: {
      padding: 15,
      marginBottom: 0,
      marginHorizontal: 0,
      backgroundColor: colors.gray6,
    },
    sectionText: {
      ...fonts.semibold,
      fontSize: 18,
      color: colors.blue,
    },
    itemRow: {
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
    itemTitle: {
      ...fonts.semibold,
      fontSize: 16,
      color: colors.black,
    },
    itemSubtitle: {
      ...fonts.normal,
      fontSize: 13,
      color: colors.gray,
    },
    footer: {
      marginTop: 10,
      marginBottom: 35,
      alignItems: 'center',
    },
    footerText: {
      ...fonts.normal,
      fontSize: 13,
      maxWidth: 320,
      textAlign: 'center',
      color: colors.gray2,
    },
  });

export default StretchySectionListScreen;
