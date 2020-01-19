import React, { useEffect, useState } from 'react';
import {
  Animated,
  Easing,
  PixelRatio,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native';

import { Themed, Theme, WithThemeProps, withTheme } from '../theming';

export interface BadgeProps extends ViewProps {
  size?: number;
  color?: string;
  value?: number | boolean;
  limit?: number | boolean;
  rounded?: boolean;
  animate?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  themeKey?: string;
}

const Badge: React.FC<Themed<typeof createStyleSheet, BadgeProps>> = ({
  styles,
  size = 12,
  color,
  value,
  limit = 99,
  rounded = true,
  animate = true,
  style,
  textStyle,
  ...props
}) => {
  const toValue = value ? 1 : 0;
  const [animatedValue] = useState(() => new Animated.Value(toValue));

  useEffect(() => {
    Animated.timing(animatedValue, {
      duration: 300,
      toValue: toValue,
      useNativeDriver: true,
      easing: Easing.in(Easing.elastic(1)),
    }).start();
  }, [animatedValue, toValue]);

  if (!value) {
    return null;
  }

  const rootStyles = [
    styles.root,
    style,
    animate && {
      transform: [{ scale: animatedValue }],
    },
  ];

  if (color) {
    rootStyles.push({ backgroundColor: color });
  }

  let content;
  let height = styles.root.minHeight;

  if (typeof value === 'number' && value !== 0) {
    const displayValue = limit && value > limit ? `${limit}+` : value;

    height = PixelRatio.roundToNearestPixel(size / 0.6);

    rootStyles.push({
      height,
      minWidth: height,
      paddingHorizontal: size / 2,
    });

    const textStyles = [
      styles.text,
      textStyle,
      {
        fontSize: size,
      },
    ];

    content = (
      <Text style={textStyles} numberOfLines={1}>
        {displayValue}
      </Text>
    );
  }

  if (rounded) {
    rootStyles.push({ borderRadius: height / 2 });
  }

  return (
    <Animated.View {...props} style={rootStyles}>
      {content}
    </Animated.View>
  );
};

const createStyleSheet = ({ Colors, Fonts }: Theme) =>
  StyleSheet.create({
    root: {
      minWidth: 10,
      minHeight: 10,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.blue,
    },
    text: {
      ...Fonts.normal,
      color: Colors.white,
    },
  });

export type Props = BadgeProps & WithThemeProps;

export default withTheme(Badge, createStyleSheet, 'Badge');
