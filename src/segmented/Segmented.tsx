import React, { useEffect, useState } from 'react';
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

interface ButtonProps {
  text?: React.ReactNode;
  iconSource?: ImageSourcePropType;
  component?: React.ReactNode;
}

interface SegmentedProps extends TouchableOpacityProps {
  buttons: ButtonProps[];
  selected?: number;
  animationDuration?: number;
  style?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  onChange: Function;
}

const Segmented: React.FC<Themed<typeof createStyleSheet, SegmentedProps>> = ({
  styles,
  buttons,
  disabled,
  selected = 0,
  activeOpacity = 0.5,
  animationDuration = 500,
  onChange,
  style,
  buttonStyle,
  textStyle,
  iconStyle,
  indicatorStyle,
}) => {
  const [buttonWidth, setButtonWidth] = useState(0);
  const [animatedValue] = useState(() => new Animated.Value(selected));

  useEffect(() => {
    Animated.timing(animatedValue, {
      duration: animationDuration,
      toValue: selected * buttonWidth,
      useNativeDriver: true,
      easing: Easing.out(Easing.exp),
    }).start();
  }, [animatedValue, selected, buttonWidth, animationDuration]);

  const onLayout = (event: LayoutChangeEvent) => {
    setButtonWidth(event.nativeEvent.layout.width / buttons.length);
  };

  const indicatorStyles = [
    styles.indicator,
    indicatorStyle,
    {
      width: buttonWidth,
      transform: [{ translateX: animatedValue }],
    },
    disabled && styles.disabledIndicator,
  ];

  const renderButton = (button: ButtonProps, index: number) => {
    if (button.component) {
      return button.component;
    }

    let content = [];
    const isSelected = index === selected;

    if (button.iconSource) {
      const iconStyles = [
        styles.icon,
        iconStyle,
        isSelected && styles.selectedIcon,
        disabled && styles.disabledIcon,
      ];
      content.push(<Image key="image" style={iconStyles} source={button.iconSource} />);
    }

    if (button.text) {
      const textStyles = [
        styles.text,
        textStyle,
        isSelected && styles.selectedText,
        disabled && styles.disabledText,
      ];
      content.push(
        <Text key="text" style={textStyles} numberOfLines={1}>
          {button.text}
        </Text>,
      );
    }

    return content;
  };

  return (
    <View style={[styles.root, style, disabled && styles.disabledRoot]}>
      <View testID="container" style={styles.content} onLayout={onLayout}>
        <Animated.View style={indicatorStyles} />
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            disabled={disabled}
            activeOpacity={activeOpacity}
            style={[styles.button, buttonStyle]}
            onPress={() => onChange(index)}
          >
            {renderButton(button, index)}
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
    button: {
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
