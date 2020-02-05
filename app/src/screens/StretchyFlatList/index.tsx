import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import { Avatar, StretchyFlatList, Table, Theme, useTheme } from 'rnbase-ui';

import { generateHeaderImages, generateUsers } from '../../data';

type NavigationState = {
  params: {};
};

type Props = {
  navigation: NavigationScreenProp<NavigationState>;
};

const StretchyFlatListScreen: React.FC<Props> = ({ navigation }) => {
  const {
    theme: { colors, styles },
  } = useTheme(createStyles);

  const [headerImages] = useState(() => generateHeaderImages(3));
  const [users] = useState(() => generateUsers(50));

  return (
    <StretchyFlatList
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
      data={users}
      keyExtractor={item => `item-${item.id}`}
      ItemSeparatorComponent={({ highlighted }) => (
        <Table.Separator insetLeft={80} highlighted={highlighted} />
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

export default StretchyFlatListScreen;
