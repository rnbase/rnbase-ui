/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { Button, StretchyFlatList } from '../../../..';

const images = [
  { uri: 'https://picsum.photos/id/112/900/600' },
  { uri: 'https://picsum.photos/id/1041/900/600' },
  { uri: 'https://picsum.photos/id/106/900/600' },
];

const data = [
  {
    albumId: 1,
    id: 1,
    title: 'accusamus beatae ad facilis cum similique qui sunt',
    url: 'https://placehold.it/600/92c952',
    thumbnailUrl: 'https://placehold.it/150/92c952',
  },
  {
    albumId: 1,
    id: 2,
    title: 'reprehenderit est deserunt velit ipsam',
    url: 'https://placehold.it/600/771796',
    thumbnailUrl: 'https://placehold.it/150/771796',
  },
  {
    albumId: 1,
    id: 3,
    title: 'officia porro iure quia iusto qui ipsa ut modi',
    url: 'https://placehold.it/600/24f355',
    thumbnailUrl: 'https://placehold.it/150/24f355',
  },
  {
    albumId: 1,
    id: 4,
    title: 'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
    url: 'https://placehold.it/600/d32776',
    thumbnailUrl: 'https://placehold.it/150/d32776',
  },
  {
    albumId: 1,
    id: 5,
    title: 'natus nisi omnis corporis facere molestiae rerum in',
    url: 'https://placehold.it/600/f66b97',
    thumbnailUrl: 'https://placehold.it/150/f66b97',
  },
  {
    albumId: 1,
    id: 6,
    title: 'accusamus ea aliquid et amet sequi nemo',
    url: 'https://placehold.it/600/56a8c2',
    thumbnailUrl: 'https://placehold.it/150/56a8c2',
  },
  {
    albumId: 1,
    id: 7,
    title: 'officia delectus consequatur vero aut veniam explicabo molestias',
    url: 'https://placehold.it/600/b0f7cc',
    thumbnailUrl: 'https://placehold.it/150/b0f7cc',
  },
  {
    albumId: 1,
    id: 8,
    title: 'aut porro officiis laborum odit ea laudantium corporis',
    url: 'https://placehold.it/600/54176f',
    thumbnailUrl: 'https://placehold.it/150/54176f',
  },
  {
    albumId: 1,
    id: 9,
    title: 'qui eius qui autem sed',
    url: 'https://placehold.it/600/51aa97',
    thumbnailUrl: 'https://placehold.it/150/51aa97',
  },
];

const StretchyFlatListScreen = () => {
  return (
    <StretchyFlatList
      headerImages={images}
      headerHeight={300}
      headerBackgroundColor="#30303C"
      headerContent={<Button text="Welcome to React" onPress={() => {}} />}
      data={data}
      keyExtractor={item => `item-${item.id}`}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.thumbnailUrl, width: 70, height: 70 }} />
          <Text style={styles.itemText}>{item.title}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },
  itemText: { flex: 1, color: '#000', marginLeft: 5 },
});

export default StretchyFlatListScreen;
