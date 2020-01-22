import React, { useEffect, useState, useMemo } from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

import { Themed, Theme, WithThemeProps, withTheme } from '../theming';
import { inRange, getRadius } from '../helpers';

const minSize = 20;
const maxSize = 70;

interface ButtonProps extends TouchableOpacityProps {
  size?: number;
  cornerRadius?: number | string;
  disabled?: boolean;
  busy?: boolean;
  busyIndicatorColor?: string;
  busyAnimationType?: 'fade' | 'zoom' | 'slide';
  busyAnimationDuration?: number;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  text?: React.ReactNode;
  textStyle?: StyleProp<TextStyle>;
  iconSource?: ImageSourcePropType;
  iconStyle?: StyleProp<ImageStyle>;
  iconAlignment?: 'left' | 'right';
}

const Button: React.FC<Themed<typeof createStyleSheet, ButtonProps>> = ({
  theme: { styles },
  size = 50,
  cornerRadius = '16%',
  disabled,
  busy,
  busyIndicatorColor,
  busyAnimationType = 'fade',
  busyAnimationDuration = 500,
  activeOpacity = 0.5,
  children,
  style,
  text,
  textStyle,
  iconSource,
  iconStyle,
  iconAlignment = 'left',
  ...props
}) => {
  const toValue = busy ? 1 : 0;
  const [animatedValue] = useState(() => new Animated.Value(toValue));

  useEffect(() => {
    Animated.timing(animatedValue, {
      duration: busyAnimationDuration,
      toValue: toValue,
      useNativeDriver: true,
      easing: Easing.out(Easing.exp),
    }).start();
  }, [animatedValue, busyAnimationDuration, toValue]);

  const interpolate = (outputRange: number[]) =>
    animatedValue.interpolate({ inputRange: [0, 1], outputRange });

  const animation = (direction: 'in' | 'out') => ({
    opacity: interpolate(direction === 'in' ? [0, 1] : [1, 0]),
    transform: {
      fade: null,
      zoom: [{ scale: interpolate(direction === 'in' ? [2, 1] : [1, 0.5]) }],
      slide: [{ translateY: interpolate(direction === 'in' ? [-25, 0] : [0, 25]) }],
    }[busyAnimationType],
  });

  const proportions = useMemo(() => {
    const height = inRange(Math.round(size), minSize, maxSize);
    const increment = Math.floor(height / 5);

    return {
      height,
      fontSize: 7 + increment,
      iconSize: 10 + increment,
      textMargin: increment / 2,
      contentPadding: (height - increment) / 2 - 5,
      borderRadius: getRadius(cornerRadius, height),
    };
  }, [size, cornerRadius]);

  let content;

  if (children) {
    content = children;
  } else {
    content = [];

    if (text) {
      const textStyles = [
        {
          fontSize: proportions.fontSize,
          marginHorizontal: proportions.textMargin,
        },
        styles.text,
        textStyle,
      ];

      if (disabled) {
        textStyles.push(styles.disabledText);
      }

      content.push(
        <Text key="text" style={textStyles} numberOfLines={1}>
          {text}
        </Text>,
      );
    }

    if (iconSource) {
      const iconStyles = [
        {
          width: proportions.iconSize,
          height: proportions.iconSize,
        },
        styles.icon,
        iconStyle,
      ];

      if (disabled) {
        iconStyles.push(styles.disabledIcon);
      }

      const image = <Image key="image" style={iconStyles} source={iconSource} />;

      if (iconAlignment === 'right') {
        content.push(image);
      } else {
        content.unshift(image);
      }
    }
  }

  const rootStyles = [
    {
      height: proportions.height,
      borderRadius: proportions.borderRadius,
      paddingHorizontal: proportions.contentPadding,
    },
    styles.root,
    style,
  ];

  if (disabled) {
    rootStyles.push(styles.disabledRoot);
  }

  return (
    <TouchableOpacity
      style={rootStyles}
      disabled={busy || disabled}
      activeOpacity={activeOpacity}
      {...props}
    >
      <Animated.View style={[styles.busy, animation('in')]} pointerEvents="none">
        <ActivityIndicator
          size="small"
          animating={busy}
          color={busyIndicatorColor || styles.text.color}
        />
      </Animated.View>
      <Animated.View style={[styles.content, animation('out')]}>{content}</Animated.View>
    </TouchableOpacity>
  );
};

const createStyleSheet = ({ colors, fonts }: Theme) =>
  StyleSheet.create({
    root: {
      overflow: 'hidden',
      justifyContent: 'center',
      backgroundColor: colors.blue,
    },
    busy: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    text: {
      ...fonts.semibold,
      color: colors.white,
    },
    icon: {
      flexShrink: 0,
      tintColor: colors.white,
    },
    disabledRoot: {
      backgroundColor: colors.gray5,
    },
    disabledText: {
      color: colors.gray2,
    },
    disabledIcon: {
      tintColor: colors.gray2,
    },
  });

export type Props = ButtonProps & WithThemeProps;

export default withTheme(Button, createStyleSheet, 'Button');
