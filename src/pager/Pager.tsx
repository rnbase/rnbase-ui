import React from 'react';
import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

import { Themed, WithThemeProps, withTheme } from '../theming';

interface PagerProps extends ViewProps {
  count?: number;
  selected?: number;
  color?: string;
  orientation?: 'horizontal' | 'vertical';
  style?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  selectedItemStyle?: StyleProp<ViewStyle>;
}

const Pager: React.FC<Themed<typeof createStyleSheet, PagerProps>> = ({
  theme: { colors, styles },
  count = 0,
  selected,
  color = colors.white,
  orientation = 'horizontal',
  style,
  itemStyle,
  selectedItemStyle,
  ...props
}) => {
  if (count < 2) {
    return null;
  }

  const rootStyles = [styles.root, style];

  if (orientation === 'horizontal') {
    rootStyles.push({ flexDirection: 'row' });
  }

  const renderItem = (_item: any, index: number) => {
    const itemStyles = [{ backgroundColor: color }, styles.item, itemStyle];

    if (index === selected) {
      itemStyles.push(styles.itemSelected, selectedItemStyle);
    }

    return <View key={index} style={itemStyles} />;
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
      width: 6,
      height: 6,
      margin: 3,
      opacity: 0.5,
      borderRadius: 3,
    },
    itemSelected: {
      width: 7,
      height: 7,
      margin: 2.5,
      opacity: 1,
      borderRadius: 3.5,
    },
  });

export type Props = PagerProps & WithThemeProps;

export default withTheme(Pager, createStyleSheet, 'Pager');
