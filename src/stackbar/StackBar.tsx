import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewProps, ViewStyle } from 'react-native';

import { Theme, Themed, WithThemeProps, withTheme } from '../theming';
import { getRadius } from '../helpers';

function getArrayColor(index: number, length: number): string {
  return `hsl(${360 * (1 - index / length)}, 65%, 65%)`;
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
  sorting?: 'asc' | 'desc';
  showLegend?: boolean;
  renderLegend?: (item: DataProps, index: number) => void;
  separatorWidth?: number;
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
  sorting,
  showLegend = true,
  renderLegend,
  separatorWidth = 1,
  style,
  legendStyle,
  legendLabelStyle,
  legendSwatchStyle,
  legendTextStyle,
  ...props
}) => {
  let items = data;

  if (sorting) {
    items = data.sort((a, b) => (sorting === 'asc' ? a.value - b.value : b.value - a.value));
  }

  const renderItem = ({ value, color }: DataProps, index: number) => {
    const itemStyles = {
      height: '100%',
      flexGrow: value,
      backgroundColor: color || getArrayColor(index, data.length),
      marginLeft: index > 0 ? separatorWidth : 0,
    };

    return <View key={index} style={itemStyles} />;
  };

  const renderLabel = ({ color, label }: DataProps, index: number) => {
    const swatchStyles = [
      { backgroundColor: color || getArrayColor(index, data.length) },
      styles.legendSwatch,
      legendSwatchStyle,
    ];

    return (
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
      {showLegend && (
        <View style={[styles.legend, legendStyle]}>{items.map(renderLegend || renderLabel)}</View>
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
