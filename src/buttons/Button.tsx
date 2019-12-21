import React from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ImageSourcePropType,
  View,
  ViewStyle,
} from 'react-native';

import { Theme, useThemeProps } from '../theming';

export interface Props extends TouchableOpacityProps {
  children?: React.ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  text?: React.ReactNode;
  textStyle?: StyleProp<TextStyle>;
  imageSource?: ImageSourcePropType;
  imageStyle?: StyleProp<ImageStyle>;
  imageAlignment?: 'left' | 'right';
  themeKey?: string;
}

const Button: React.FC<Props> = ({
  children,
  style,
  text,
  textStyle,
  imageSource,
  imageStyle,
  imageAlignment = 'left',
  themeKey = 'Button',
  ...props
}) => {
  const setDisabledStyles = (stylesArray: Array<any>, disabledStyle: StyleProp<any>) => {
    if (props.disabled) {
      stylesArray.push(disabledStyle);
    }

    return stylesArray;
  };

  const { styles, activeOpacity = 0.5 } = useThemeProps(createStyleSheet, themeKey);

  let content;

  if (children) {
    content = children;
  } else {
    content = [];

    if (text) {
      const textStyles = setDisabledStyles([styles.text, textStyle], styles.disabledText);

      content.push(
        <Text key="text" style={textStyles} numberOfLines={1}>
          {text}
        </Text>,
      );
    }

    if (imageSource) {
      const imageStyles = setDisabledStyles([styles.image, imageStyle], styles.disabledImage);
      const image = <Image key="image" style={imageStyles} source={imageSource} />;

      if (imageAlignment === 'left') {
        content.unshift(image);
      } else {
        content.push(image);
      }
    }
  }

  const rootStyles = setDisabledStyles([styles.root, style], styles.disabledRoot);

  return (
    <TouchableOpacity activeOpacity={activeOpacity} {...props}>
      <View style={rootStyles}>{content}</View>
    </TouchableOpacity>
  );
};

const createStyleSheet = ({ Colors, Fonts }: Theme) =>
  StyleSheet.create({
    root: {
      height: 50,
      borderRadius: 8,
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 15,
      justifyContent: 'center',
      backgroundColor: Colors.blue,
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

export default Button;
