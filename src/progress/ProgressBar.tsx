import React, { useCallback, useState, useEffect } from 'react';
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

import { Themed, Theme, WithThemeProps, withTheme } from '../theming';

interface ProgressBarProps extends ViewProps {
  value?: number;
  height?: number;
  rounded?: boolean;
  trackColor?: string;
  indicatorColor?: string;
  style?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
}

const ProgressBar: React.FC<Themed<typeof createStyleSheet, ProgressBarProps>> = ({
  styles,
  value,
  height = 6,
  rounded = true,
  trackColor,
  indicatorColor,
  style,
  indicatorStyle,
  ...props
}) => {
  const [width, setWidth] = useState(0);
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

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  }, []);

  const rootStyles = [styles.root, style, { height }];
  const indicatorStyles = [styles.indicator, indicatorStyle];
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

  if (rounded) {
    rootStyles.push({ borderRadius: height / 2 });
  }

  if (trackColor) {
    rootStyles.push({ backgroundColor: trackColor });
  }

  if (indicatorColor) {
    indicatorStyles.push({ backgroundColor: indicatorColor });
  }

  return (
    <View {...props} testID="root" onLayout={onLayout} style={rootStyles}>
      <Animated.View style={[indicatorStyles, { transform }]} />
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
