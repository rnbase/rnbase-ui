import React from 'react';
import { Animated, StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

import { Themed, WithThemeProps, withTheme } from '../theming';

interface PagerProps extends ViewProps {
  color?: string;
  count?: number;
  current?: number | Animated.Value;
  orientation?: 'horizontal' | 'vertical';
  style?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
}

const Pager: React.FC<Themed<typeof createStyleSheet, PagerProps>> = ({
  theme: { colors, styles },
  color = colors.white,
  count = 0,
  current,
  orientation = 'horizontal',
  style,
  itemStyle,
  ...props
}) => {
  if (count < 2) {
    return null;
  }

  let currentIndex = typeof current === 'number' ? new Animated.Value(current) : current;
  const rootStyles = [styles.root, style];

  if (orientation === 'horizontal') {
    rootStyles.push({ flexDirection: 'row' });
  }

  const renderItem = (_item: any, index: number) => {
    const itemStyles = [{ backgroundColor: color }, styles.item, itemStyle];

    if (currentIndex) {
      const opacity = currentIndex.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [0.5, 1, 0.5],
        extrapolate: 'clamp',
      });
      const scale = currentIndex.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [1, 1.4, 1],
        extrapolate: 'clamp',
      });

      itemStyles.push({ opacity: opacity as any, transform: [{ scale }] as any });
    }

    return <Animated.View key={index} style={itemStyles} />;
  };

  return (
    <View {...props} style={rootStyles}>
      {Array.from({ length: count }, renderItem)}
    </View>
  );
};

const createStyleSheet = () =>
  StyleSheet.create({
    root: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      width: 5,
      height: 5,
      margin: 3,
      borderRadius: 3,
    },
  });

export type Props = PagerProps & WithThemeProps;

export default withTheme(Pager, createStyleSheet, 'Pager');
