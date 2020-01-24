/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState, useCallback } from 'react';
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

const ExampleScreen = () => {
  const [busy, setBusy] = useState(false);
  const [badge, setBadge] = useState(0);
  const [rating, setRating] = useState(3.5);
  const [userRating, setUserRating] = useState();
  const [selectedButton, setSelectedButton] = useState(0);
  const [headerImages] = useState(() => generateHeaderImages(3));

  const onSelectButton = (index: number) => setSelectedButton(index);

  const handleRatingChage = useCallback(setUserRating, []);
  const handleRatingTounchEnd = useCallback(
    (value: number) => {
      setRating(Math.round((rating + value) * 5) / 10);
      setUserRating(undefined);
    },
    [rating],
  );

  return (
    <StretchyScrollView
      headerBackground={headerImages.map(source => (
        <Image source={source} />
      ))}
      headerHeight={300}
      headerBackgroundColor="#30303C"
      headerContent={<Button text="Welcome to React" onPress={() => setBadge(badge + 1)} />}
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
            text="Button"
            iconSource={require('../../assets/star.png')}
            onPress={() => setBadge(badge + 1)}
          />
          <OutlineButton
            text="Button"
            iconSource={require('../../assets/heart.png')}
            onPress={() => setBadge(0)}
          />
          <TextButton
            text="Button"
            busy={busy}
            iconAlignment="right"
            iconSource={require('../../assets/chevron-right.png')}
            onPress={() => {
              setBusy(true);
              setTimeout(() => setBusy(false), 3000);
            }}
          />
        </View>
        <Button
          busy={busy}
          style={{ marginVertical: 10 }}
          text="Activity Button"
          busyAnimationType="slide"
          iconSource={require('../../assets/check-circle.png')}
          onPress={() => {
            setBusy(true);
            setTimeout(() => setBusy(false), 3000);
          }}
        />
        <Segmented
          selected={selectedButton}
          onChange={onSelectButton}
          items={[
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
          ]}
        />
        {selectedButton === 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Step One</Text>
            <Text style={styles.sectionDescription}>
              Edit <Text style={styles.highlight}>App.tsx</Text> to change this screen and then come
              back to see your edits.
            </Text>
          </View>
        )}
        {selectedButton === 1 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>See Your Changes</Text>
            <Text style={styles.sectionDescription}>
              <ReloadInstructions />
            </Text>
          </View>
        )}
        {selectedButton === 2 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Debug</Text>
            <Text style={styles.sectionDescription}>
              <DebugInstructions />
            </Text>
          </View>
        )}
        <View style={styles.stack}>
          <Rating
            size={30}
            value={rating}
            onChange={handleRatingChage}
            onTouchEnd={handleRatingTounchEnd}
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
});

export default ExampleScreen;
