import React, { useState, useEffect } from 'react';
import { Animated, Easing, StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

import { Themed, Theme, WithThemeProps, withTheme } from '../theming';
import { getRadius, useLayout } from '../helpers';

interface ProgressBarProps extends ViewProps {
  size?: number;
  cornerRadius?: number | string;
  value?: number;
  style?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
}

const ProgressBar: React.FC<Themed<typeof createStyleSheet, ProgressBarProps>> = ({
  Colors: _Colors,
  styles,
  value,
  size = 6,
  cornerRadius = '50%',
  style,
  indicatorStyle,
  ...props
}) => {
  const [{ width }, onLayout] = useLayout();
  const [animatedValue] = useState(() => new Animated.Value(value || 0));

  useEffect(() => {
    if (value !== undefined) {
      Animated.timing(animatedValue, {
        duration: 200,
        toValue: value,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }).start();
    } else {
      animatedValue.setValue(0);

      Animated.loop(
        Animated.timing(animatedValue, {
          duration: 2000,
          toValue: 1,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.cubic),
        }),
      ).start();
    }
  }, [animatedValue, value]);

  const transform = [];

  if (value !== undefined) {
    transform.push({
      translateX: animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: [-width / 2, 0],
        extrapolate: 'clamp',
      }),
    });

    transform.push({
      scaleX: animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
    });
  } else {
    transform.push({
      translateX: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-width, width],
        extrapolate: 'clamp',
      }),
    });
  }

  const rootStyles = [
    {
      height: size,
      borderRadius: getRadius(cornerRadius, size),
    },
    styles.root,
    style,
  ];

  return (
    <View testID="root" {...props} style={rootStyles} onLayout={onLayout}>
      <Animated.View style={[styles.indicator, indicatorStyle, { transform }]} />
    </View>
  );
};

const createStyleSheet = ({ Colors }: Theme) =>
  StyleSheet.create({
    root: {
      overflow: 'hidden',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      backgroundColor: Colors.gray5,
    },
    indicator: {
      width: '100%',
      height: '100%',
      backgroundColor: Colors.blue,
    },
  });

export type Props = ProgressBarProps & WithThemeProps;

export default withTheme(ProgressBar, createStyleSheet, 'ProgressBar');
