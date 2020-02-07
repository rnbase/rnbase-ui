import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewProps, ViewStyle } from 'react-native';

import { Theme, Themed, WithThemeProps, withTheme } from '../theming';
import { getArrayColor, getRadius } from '../helpers';

function getTopItems(items: DataProps[], count: number) {
  return [...items.entries()]
    .sort((a, b) => b[1].value - a[1].value)
    .splice(0, count)
    .sort((a, b) => a[0] - b[0])
    .map(item => item[1]);
}

interface DataProps {
  value: number;
  color?: string;
  label?: string;
}

interface StackBarProps extends ViewProps {
  size?: number;
  cornerRadius?: number | string;
  data: DataProps[];
  separatorWidth?: number;
  showLabels?: number;
  renderLabel?: (item: DataProps, index: number) => void;
  style?: StyleProp<ViewStyle>;
  legendStyle?: StyleProp<ViewStyle>;
  legendLabelStyle?: StyleProp<ViewStyle>;
  legendSwatchStyle?: StyleProp<ViewStyle>;
  legendTextStyle?: StyleProp<TextStyle>;
}

const StackBar: React.FC<Themed<typeof createStyleSheet, StackBarProps>> = ({
  theme: { styles },
  data,
  size = 10,
  cornerRadius = '50%',
  separatorWidth = 1,
  showLabels = data.length,
  renderLabel: propRenderLabel,
  style,
  legendStyle,
  legendLabelStyle,
  legendSwatchStyle,
  legendTextStyle,
  ...props
}) => {
  const count = data.length;
  const items = data.map((item, index) => ({
    ...item,
    color: item.color || getArrayColor(index, count),
  }));

  const renderItem = ({ value, color }: DataProps, index: number) => {
    const itemStyles = {
      height: '100%',
      flexGrow: value,
      backgroundColor: color,
      marginLeft: index > 0 ? separatorWidth : 0,
    };

    return <View key={index} style={itemStyles} />;
  };

  const renderLabel = ({ color, label }: DataProps, index: number) => {
    const swatchStyles = [{ backgroundColor: color }, styles.legendSwatch, legendSwatchStyle];

    return !label ? null : (
      <View key={index} style={[styles.legendLabel, legendLabelStyle]}>
        <View style={swatchStyles} />
        <Text style={[styles.legendText, legendTextStyle]} numberOfLines={1}>
          {label}
        </Text>
      </View>
    );
  };

  const rootStyles = [
    {
      height: size,
      borderRadius: getRadius(cornerRadius, size),
    },
    styles.root,
  ];

  return (
    <View {...props} style={style}>
      <View style={rootStyles}>{items.map(renderItem)}</View>
      {showLabels > 0 && (
        <View style={[styles.legend, legendStyle]}>
          {getTopItems(items, showLabels).map(propRenderLabel || renderLabel)}
        </View>
      )}
    </View>
  );
};

const createStyleSheet = ({ colors, fonts }: Theme) =>
  StyleSheet.create({
    root: {
      overflow: 'hidden',
      flexDirection: 'row',
    },
    legend: {
      marginTop: 8,
      flexWrap: 'wrap',
      flexDirection: 'row',
    },
    legendLabel: {
      marginRight: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    legendSwatch: {
      width: 10,
      height: 10,
      marginRight: 3,
      borderRadius: 5,
    },
    legendText: {
      ...fonts.normal,
      fontSize: 12,
      color: colors.black,
    },
  });

export type Props = StackBarProps & WithThemeProps;

export default withTheme(StackBar, createStyleSheet, 'StackBar');
