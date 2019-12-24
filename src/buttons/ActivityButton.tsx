import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Animated, Easing, StyleSheet, View } from 'react-native';

import Button, { ButtonProps } from './Button';

import { Stylized, WithThemeProps, withTheme } from '../theming';

interface ActivityButtonProps extends ButtonProps {
  busy?: boolean;
  indicatorColor?: string;
}

const toValue = (value?: boolean) => (value ? 1 : 0);

const ActivityButton: React.FC<Stylized<typeof createStyleSheet, ActivityButtonProps>> = ({
  styles,
  busy,
  indicatorColor,
  ...props
}) => {
  const [animatedValue] = useState(() => new Animated.Value(toValue(busy)));

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: toValue(busy),
      duration: 800,
      useNativeDriver: true,
      easing: Easing.out(Easing.exp),
    }).start();
  }, [animatedValue, busy]);

  const buttonAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    }),
    transform: [
      {
        perspective: 1000,
      },
      {
        rotateX: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '-90deg'],
        }),
      },
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 35],
        }),
      },
    ],
  };

  const indicatorAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        perspective: 1000,
      },
      {
        rotateX: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['90deg', '0deg'],
        }),
      },
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [-35, 0],
        }),
      },
    ],
  };

  return (
    <View>
      <Animated.View style={[styles.indicator, indicatorAnimation]}>
        {/* TODO BUG:
          The animating prop has no effect on Android when
          the component initialized with animating=false
          https://github.com/facebook/react-native/issues/9023
        */}
        {busy && <ActivityIndicator size="small" color={indicatorColor} />}
      </Animated.View>
      <Animated.View style={buttonAnimation}>
        <Button themeKey="ActivityButtonButton" {...props} />
      </Animated.View>
    </View>
  );
};

const createStyleSheet = () =>
  StyleSheet.create({
    indicator: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export type Props = ActivityButtonProps & WithThemeProps;

export default withTheme(ActivityButton, createStyleSheet, 'ActivityButton');
