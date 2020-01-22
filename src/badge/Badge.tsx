import React, { useEffect, useState } from 'react';
import {
  Animated,
  PixelRatio,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native';

import { Themed, Theme, WithThemeProps, withTheme } from '../theming';
import { inRange, getRadius } from '../helpers';

const minSize = 15;
const maxSize = 40;

interface BadgeProps extends ViewProps {
  size?: number;
  cornerRadius?: number | string;
  animate?: boolean;
  value?: number | boolean;
  limit?: number | boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Badge: React.FC<Themed<typeof createStyleSheet, BadgeProps>> = ({
  theme: { styles },
  size = 20,
  cornerRadius = '50%',
  animate = true,
  value,
  limit = 99,
  style,
  textStyle,
  ...props
}) => {
  const toValue = value ? 1 : 0;
  const [animatedValue] = useState(() => new Animated.Value(toValue));

  useEffect(() => {
    Animated.spring(animatedValue, {
      tension: 60,
      friction: 6,
      toValue: toValue,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, toValue]);

  if (!value) {
    return null;
  }

  let content = null;
  let height = styles.root.minHeight;

  if (typeof value === 'number' && value !== 0) {
    height = inRange(Math.round(size), minSize, maxSize);

    const fontSize = PixelRatio.roundToNearestPixel(height * 0.6);
    const displayValue = limit && value > limit ? `${limit}+` : value;
    const textStyles = [
      {
        fontSize,
        marginHorizontal: fontSize / 2,
      },
      styles.text,
      textStyle,
    ];

    content = (
      <Text style={textStyles} numberOfLines={1}>
        {displayValue}
      </Text>
    );
  }

  const rootStyles = [
    {
      height,
      minWidth: height,
      borderRadius: getRadius(cornerRadius, height),
    },
    styles.root,
    style,
  ];

  if (animate) {
    rootStyles.push({ transform: [{ scale: animatedValue as any }] });
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
