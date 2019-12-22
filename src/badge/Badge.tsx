import React from 'react';
import {
  PixelRatio,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

import { Theme, useThemeStyles } from '../theming';

export interface Props extends ViewProps {
  size?: number;
  color?: string;
  value?: number | boolean;
  limit?: number | boolean;
  rounded?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  themeKey?: string;
}

const Badge: React.FC<Props> = ({
  size = 12,
  color,
  value,
  limit = 99,
  rounded = true,
  style,
  textStyle,
  themeKey = 'Badge',
  ...props
}) => {
  const styles = useThemeStyles(createStyleSheet, themeKey);

  if (!value) {
    return null;
  }

  const rootStyles = [styles.root, style];

  if (color) {
    rootStyles.push({ backgroundColor: color });
  }

  let content;
  let height = styles.root.height;

  if (typeof value === 'number' && value > 0) {
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
    <View {...props} style={rootStyles}>
      {content}
    </View>
  );
};

const createStyleSheet = ({ Colors, Fonts }: Theme) =>
  StyleSheet.create({
    root: {
      height: 10,
      minWidth: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.blue,
    },
    text: {
      ...Fonts.normal,
      color: Colors.white,
    },
  });

export default Badge;
