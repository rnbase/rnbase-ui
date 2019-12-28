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

interface ButtonGroupProps extends TouchableOpacityProps {
  buttons: ButtonProps[];
  selected?: number;
  animationDuration?: number;
  style?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  selectorStyle?: StyleProp<ViewStyle>;
  onSelect: Function;
}

const ButtonGroup: React.FC<Themed<typeof createStyleSheet, ButtonGroupProps>> = ({
  styles,
  buttons,
  selected = 0,
  animationDuration = 500,
  activeOpacity = 0.5,
  onSelect,
  style,
  buttonStyle,
  textStyle,
  imageStyle,
  selectorStyle,
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

  const selectorStyles = [
    styles.selector,
    selectorStyle,
    {
      width: buttonWidth,
      transform: [{ translateX: animatedValue }],
    },
  ];

  const renderButton = (button: ButtonProps, index: number) => {
    if (button.component) {
      return button.component;
    }

    let content = [];

    if (button.iconSource) {
      const imageStyles = [styles.image, imageStyle, index === selected && styles.selectedImage];
      content.push(<Image key="image" style={imageStyles} source={button.iconSource} />);
    }

    if (button.text) {
      const textStyles = [styles.text, textStyle, index === selected && styles.selectedText];
      content.push(
        <Text key="text" style={textStyles} numberOfLines={1}>
          {button.text}
        </Text>,
      );
    }

    return content;
  };

  return (
    <View style={[styles.root, style]}>
      <Animated.View style={selectorStyles} />
      <View style={styles.content} onLayout={onLayout}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={activeOpacity}
            style={[styles.button, buttonStyle]}
            onPress={() => onSelect(index)}
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
      borderWidth: 3,
      borderRadius: 8,
      borderColor: Colors.gray5,
      backgroundColor: Colors.gray5,
    },
    content: {
      flexGrow: 1,
      flexDirection: 'row',
    },
    selector: {
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
    image: {
      width: 18,
      height: 18,
      tintColor: Colors.gray,
    },
    selectedText: {
      color: Colors.blue,
    },
    selectedImage: {
      tintColor: Colors.blue,
    },
  });

export type Props = ButtonGroupProps & WithThemeProps;

export default withTheme(ButtonGroup, createStyleSheet, 'ButtonGroup');
