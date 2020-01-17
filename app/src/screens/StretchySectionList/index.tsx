import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import { Avatar, StretchySectionList } from 'rnbase-ui';

import { HeaderImages, Users, shuffleArray } from '../../data';

const StretchySectionListScreen = () => {
  return (
    <StretchySectionList
      headerHeight={212}
      headerImages={shuffleArray(HeaderImages)}
      headerBackgroundColor="#30303C"
      headerContent={
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Stretchy Header</Text>
          <Text style={styles.headerText}>SectionList Component Example</Text>
        </View>
      }
      sections={[
        { data: Users.slice(0, 10), title: 'Administrators' },
        { data: Users.slice(10, 20), title: 'Employees' },
        { data: Users.slice(20, 30), title: 'Customers' },
      ]}
      keyExtractor={item => `item-${item.id}`}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderSectionHeader={({ section }) => (
        <View style={styles.section}>
          <Text style={styles.sectionText}>{section.title}</Text>
        </View>
      )}
      renderItem={({ item }) => (
        <TouchableHighlight activeOpacity={1} underlayColor="#0001" onPress={() => {}}>
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

const styles = StyleSheet.create({
  headerContent: {
    flexGrow: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0008',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 35,
    fontWeight: '700',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
  },
  separator: {
    marginHorizontal: 10,
    backgroundColor: '#0003',
    height: StyleSheet.hairlineWidth,
  },
  section: {
    backgroundColor: '#4A4A4A',
  },
  sectionText: {
    color: '#FFF',
    padding: 10,
    fontSize: 20,
    fontWeight: '600',
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
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  itemText: {
    color: '#888',
    fontSize: 13,
    fontWeight: '400',
  },
});

export default StretchySectionListScreen;
