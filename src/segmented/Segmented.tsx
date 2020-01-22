import React, { useCallback, useEffect, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  ImageSourcePropType,
  ImageStyle,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';

import { Themed, Theme, WithThemeProps, withTheme } from '../theming';

interface ItemProps {
  text?: React.ReactNode;
  iconSource?: ImageSourcePropType;
  component?: React.ReactNode;
}

interface SegmentedProps extends TouchableOpacityProps {
  items: ItemProps[];
  selected?: number;
  animationDuration?: number;
  style?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  onChange: Function;
}

const Segmented: React.FC<Themed<typeof createStyleSheet, SegmentedProps>> = ({
  theme: { styles },
  items,
  disabled,
  selected = 0,
  activeOpacity = 0.5,
  animationDuration = 500,
  onChange,
  style,
  itemStyle,
  textStyle,
  iconStyle,
  indicatorStyle,
}) => {
  const [itemWidth, setItemWidth] = useState(0);
  const [animatedValue] = useState(() => new Animated.Value(selected));

  useEffect(() => {
    Animated.timing(animatedValue, {
      duration: animationDuration,
      toValue: selected * itemWidth,
      useNativeDriver: true,
      easing: Easing.out(Easing.exp),
    }).start();
  }, [animatedValue, selected, itemWidth, animationDuration]);

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      setItemWidth(event.nativeEvent.layout.width / items.length);
    },
    [items.length],
  );

  const indicatorStyles = [
    styles.indicator,
    indicatorStyle,
    {
      width: itemWidth,
      transform: [{ translateX: animatedValue }],
    },
    disabled && styles.disabledIndicator,
  ];

  const renderItem = (item: ItemProps, index: number) => {
    if (item.component) {
      return item.component;
    }

    const content = [];
    const isSelected = index === selected;

    if (item.iconSource) {
      const iconStyles = [
        styles.icon,
        iconStyle,
        isSelected && styles.selectedIcon,
        disabled && styles.disabledIcon,
      ];

      content.push(<Image key="image" style={iconStyles} source={item.iconSource} />);
    }

    if (item.text) {
      const textStyles = [
        styles.text,
        textStyle,
        isSelected && styles.selectedText,
        disabled && styles.disabledText,
      ];

      content.push(
        <Text key="text" style={textStyles} numberOfLines={1}>
          {item.text}
        </Text>,
      );
    }

    return content;
  };

  return (
    <View style={[styles.root, style, disabled && styles.disabledRoot]}>
      <View testID="container" style={styles.content} onLayout={onLayout}>
        <Animated.View style={indicatorStyles} />
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            disabled={disabled}
            activeOpacity={activeOpacity}
            style={[styles.item, itemStyle]}
            onPress={() => onChange(index)}
          >
            {renderItem(item, index)}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const createStyleSheet = ({ Colors, Fonts }: Theme) =>
  StyleSheet.create({
    root: {
      height: 40,
      padding: 3,
      borderRadius: 8,
      backgroundColor: Colors.gray5,
    },
    content: {
      flexGrow: 1,
      flexDirection: 'row',
    },
    indicator: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: 5,
      backgroundColor: Colors.white,
    },
    item: {
      flex: 1,
      paddingHorizontal: 5,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    text: {
      ...Fonts.semibold,
      fontSize: 15,
      marginHorizontal: 5,
      color: Colors.gray,
    },
    icon: {
      width: 18,
      height: 18,
      tintColor: Colors.gray,
    },
    selectedText: {
      color: Colors.blue,
    },
    selectedIcon: {
      tintColor: Colors.blue,
    },
    disabledRoot: {
      backgroundColor: Colors.gray6,
    },
    disabledText: {
      color: Colors.gray2,
    },
    disabledIcon: {
      tintColor: Colors.gray2,
    },
    disabledIndicator: {
      opacity: 0.6,
    },
  });

export type Props = SegmentedProps & WithThemeProps;

export default withTheme(Segmented, createStyleSheet, 'Segmented');
