/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState, useCallback, useMemo } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  Avatar,
  Badge,
  Button,
  OutlineButton,
  ProgressBar,
  Rating,
  TextButton,
  Segmented,
  StretchyScrollView,
  Component,
} from 'rnbase-ui';

import { generateHeaderImages } from '../../data';

const avatars = {
  none: { uri: 'https://randomuser.me/api/portraits/none.jpg' },
  test: { uri: 'https://randomuser.me/api/portraits/women/68.jpg' },
};

const segmentedItems = [
  {
    text: 'One',
    iconSource: require('../../assets/star.png'),
  },
  {
    text: 'Two',
    iconSource: require('../../assets/heart.png'),
  },
  {
    text: 'Three',
  },
];

const ExampleScreen = () => {
  const [busy, setBusy] = useState(false);
  const [badge, setBadge] = useState(0);
  const [rating, setRating] = useState(3.5);
  const [userRating, setUserRating] = useState();
  const [segmented, setSegmented] = useState(0);
  const [headerImages] = useState(() => generateHeaderImages(3));

  const toggleBusy = useCallback(() => {
    setBusy(true);
    setTimeout(() => setBusy(false), 3000);
  }, []);

  const clearBadge = useCallback(() => setBadge(0), []);
  const incrementBadge = useCallback(() => setBadge(badge + 1), [badge]);

  const headerBackground = useMemo(() => headerImages.map(source => <Image source={source} />), [
    headerImages,
  ]);
  const headerContent = useMemo(() => <Button text="Welcome to React" onPress={incrementBadge} />, [
    incrementBadge,
  ]);

  const handleSegmentedChange = useCallback((index: number) => setSegmented(index), []);

  const handleRatingChange = useCallback(setUserRating, []);
  const handleRatingComplete = useCallback(
    (value: number) => {
      setRating(Math.round((rating + value) * 5) / 10);
      setUserRating(undefined);
    },
    [rating],
  );

  return (
    <StretchyScrollView
      headerHeight={300}
      headerBackground={headerBackground}
      headerBackgroundColor="#30303C"
      headerContent={headerContent}
    >
      <Component>Themed Component</Component>
      <View style={styles.body}>
        <View style={styles.stack}>
          <Avatar
            name="John Smith"
            imageSource={avatars.none}
            defaultImageSource={avatars.test}
            badge={{ value: badge }}
          />
          <Avatar email="jitewaboh@lagify.com" defaultImageSource={avatars.test} />
          <Avatar
            name="Elon Musk"
            colorize={true}
            imageSource={avatars.none}
            badge={{
              value: !!badge,
              style: { backgroundColor: '#3B0' },
            }}
          />
          <Avatar name="John Smith" imageSource={avatars.test} cornerRadius={10} />
          <Avatar email="user@email.com" imageSource={avatars.none} />
        </View>
        <View style={styles.stack}>
          <Badge value={true} style={{ backgroundColor: '#3B0' }} />
          <Badge value={true} style={{ backgroundColor: '#FC0' }} cornerRadius={0} />
          <Badge value={badge} />
          <Badge value={35} style={{ backgroundColor: '#F20' }} />
          <Badge value={350} size={30} />
          <Badge value={355} limit={false} cornerRadius={3} />
        </View>
        <View style={styles.stack}>
          <Button
            text="Button 1"
            iconSource={require('../../assets/star.png')}
            onPress={incrementBadge}
          />
          <OutlineButton
            text="Button 2"
            iconSource={require('../../assets/heart.png')}
            onPress={clearBadge}
          />
          <TextButton
            text="Button 3"
            busy={busy}
            iconAlignment="right"
            iconSource={require('../../assets/chevron-right.png')}
            onPress={toggleBusy}
          />
        </View>
        <Button
          busy={busy}
          style={styles.single}
          text="Activity Button"
          busyAnimationType="slide"
          iconSource={require('../../assets/check-circle.png')}
          onPress={toggleBusy}
        />
        <Segmented
          items={segmentedItems}
          selected={segmented}
          style={styles.single}
          onChange={handleSegmentedChange}
        />
        {segmented === 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Step One</Text>
            <Text style={styles.sectionDescription}>
              Edit <Text style={styles.highlight}>App.tsx</Text> to change this screen and then come
              back to see your edits.
            </Text>
          </View>
        )}
        {segmented === 1 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>See Your Changes</Text>
            <Text style={styles.sectionDescription}>
              <ReloadInstructions />
            </Text>
          </View>
        )}
        {segmented === 2 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Debug</Text>
            <Text style={styles.sectionDescription}>
              <DebugInstructions />
            </Text>
          </View>
        )}
        <View style={styles.stack}>
          <Rating
            size={35}
            value={rating}
            onChange={handleRatingChange}
            onComplete={handleRatingComplete}
          />
          <Text>Rating: {userRating || rating} out of 5</Text>
        </View>
        <ProgressBar value={badge ? badge * 10 : undefined} />
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Learn More</Text>
          <Text style={styles.sectionDescription}>Read the docs to discover what to do next:</Text>
        </View>
        <LearnMoreLinks />
      </View>
    </StretchyScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    padding: 20,
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  stack: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  single: {
    marginVertical: 10,
  },
});

export default ExampleScreen;
