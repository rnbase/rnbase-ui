import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ImageSourcePropType,
  ViewStyle,
} from 'react-native';

import { Themed, Theme, WithThemeProps, withTheme } from '../theming';

const toValue = (value?: boolean) => (value ? 1 : 0);

interface ButtonProps extends TouchableOpacityProps {
  children?: React.ReactNode;
  disabled?: boolean;
  busy?: boolean;
  busyIndicatorColor?: string;
  busyAnimationType?: 'fade' | 'zoom' | 'slide';
  busyAnimationDuration?: number;
  style?: StyleProp<ViewStyle>;
  text?: React.ReactNode;
  textStyle?: StyleProp<TextStyle>;
  imageSource?: ImageSourcePropType;
  imageStyle?: StyleProp<ImageStyle>;
  imageAlignment?: 'left' | 'right';
}

const Button: React.FC<Themed<typeof createStyleSheet, ButtonProps>> = ({
  styles,
  busy,
  busyIndicatorColor,
  busyAnimationType = 'fade',
  busyAnimationDuration = 500,
  activeOpacity = 0.5,
  children,
  style,
  text,
  textStyle,
  imageSource,
  imageStyle,
  imageAlignment = 'left',
  ...props
}) => {
  const [animatedValue] = useState(() => new Animated.Value(toValue(busy)));

  useEffect(() => {
    Animated.timing(animatedValue, {
      duration: busyAnimationDuration,
      toValue: toValue(busy),
      useNativeDriver: true,
      easing: Easing.out(Easing.exp),
    }).start();
  }, [animatedValue, busy, busyAnimationDuration]);

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

  let content;

  if (children) {
    content = children;
  } else {
    content = [];

    if (text) {
      const textStyles = [styles.text, textStyle, props.disabled && styles.disabledText];

      content.push(
        <Text key="text" style={textStyles} numberOfLines={1}>
          {text}
        </Text>,
      );
    }

    if (imageSource) {
      const imageStyles = [styles.image, imageStyle, props.disabled && styles.disabledImage];
      const image = <Image key="image" style={imageStyles} source={imageSource} />;

      if (imageAlignment === 'left') {
        content.unshift(image);
      } else {
        content.push(image);
      }
    }
  }

  const rootStyles = [styles.root, style, props.disabled && styles.disabledRoot];
  const indicatorColor = busyIndicatorColor || styles.text.color;

  return (
    <TouchableOpacity disabled={busy} activeOpacity={activeOpacity} style={rootStyles} {...props}>
      <Animated.View style={[styles.busy, animation('in')]} pointerEvents="none">
        <ActivityIndicator animating={busy} size="small" color={indicatorColor} />
      </Animated.View>
      <Animated.View style={[styles.content, animation('out')]}>{content}</Animated.View>
    </TouchableOpacity>
  );
};

const createStyleSheet = ({ Colors, Fonts }: Theme) =>
  StyleSheet.create({
    root: {
      height: 50,
      borderRadius: 8,
      overflow: 'hidden',
      paddingHorizontal: 15,
      justifyContent: 'center',
      backgroundColor: Colors.blue,
    },
    content: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    text: {
      ...Fonts.semibold,
      fontSize: 17,
      color: Colors.white,
      marginHorizontal: 5,
    },
    image: {
      width: 20,
      height: 20,
      flexShrink: 0,
      tintColor: Colors.white,
    },
    busy: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
    },
    disabledRoot: {
      backgroundColor: Colors.gray5,
    },
    disabledText: {
      color: Colors.gray2,
    },
    disabledImage: {
      tintColor: Colors.gray2,
    },
  });

export type Props = ButtonProps & WithThemeProps;

export default withTheme(Button, createStyleSheet, 'Button');
