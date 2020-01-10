/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar } from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import theme from './theme';
import { ThemeProvider, Avatar, Badge, Button, OutlineButton, TextButton, Component } from '../';

const avatars = {
  none: { uri: 'https://randomuser.me/api/portraits/none.jpg' },
  test: { uri: 'https://randomuser.me/api/portraits/women/68.jpg' },
};

const App = () => {
  // eslint-disable-next-line no-undef
  const usingHermes = typeof HermesInternal === 'object' && HermesInternal !== null;

  const [busy, setBusy] = useState(false);
  const [badge, setBadge] = useState(0);

  return (
    <ThemeProvider colorScheme="no-preference" theme={theme}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <Header />
          {!usingHermes ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <Component>Themed Component</Component>
          <View style={styles.body}>
            <View style={styles.stack}>
              <Avatar
                size={50}
                name="John Smith"
                imageSource={avatars.none}
                defaultImageSource={avatars.test}
                badge={{
                  value: badge,
                }}
              />
              <Avatar size={50} email="jitewaboh@lagify.com" defaultImageSource={avatars.test} />
              <Avatar
                size={50}
                name="Elon Musk"
                colorize={true}
                imageSource={avatars.none}
                badge={{
                  value: !!badge,
                  color: '#3B0',
                }}
              />
              <Avatar
                size={50}
                name="John Smith"
                imageSource={avatars.test}
                shape="square"
                style={{ borderRadius: 10 }}
                imageStyle={{ borderRadius: 7 }}
              />
              <Avatar size={50} email="user@email.com" imageSource={avatars.none} />
            </View>
            <View style={styles.stack}>
              <Badge value={true} color="#3B0" />
              <Badge value={true} color="#FC0" rounded={false} />
              <Badge value={badge} />
              <Badge value={35} color="#F20" />
              <Badge value={350} size={16} />
              <Badge value={355} limit={false} rounded={false} style={{ borderRadius: 3 }} />
            </View>
            <View style={styles.stack}>
              <Button
                text="Button"
                imageSource={require('./src/assets/star.png')}
                onPress={() => setBadge(badge + 1)}
              />
              <OutlineButton
                text="Button"
                imageSource={require('./src/assets/heart.png')}
                onPress={() => setBadge(0)}
              />
              <TextButton
                text="Button"
                busy={busy}
                imageAlignment="right"
                imageSource={require('./src/assets/chevron-right.png')}
                onPress={() => {
                  setBusy(true);
                  setTimeout(() => setBusy(false), 3000);
                }}
              />
            </View>
            <Button
              busy={busy}
              //style={{ width: 200 }}
              text="Activity Button"
              busyAnimationType="slide"
              imageSource={require('./src/assets/check-circle.png')}
              onPress={() => {
                setBusy(true);
                setTimeout(() => setBusy(false), 3000);
              }}
            />
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.tsx</Text> to change this screen and then
                come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemeProvider>
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

export default App;
