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
}

const Button: React.FC<Props> = ({
  children,
  style,
  text,
  textStyle,
  imageSource,
  imageStyle,
  imageAlignment,
  ...props
}) => {
  const { styles, activeOpacity = 0.5 } = useThemeProps(createStyleSheet, 'Button');

  let content;

  if (children) {
    content = children;
  } else {
    content = [];

    if (text) {
      content.push(
        <Text key="text" style={[styles.text, textStyle]} numberOfLines={1}>
          {text}
        </Text>,
      );
    }

    if (imageSource) {
      const image = <Image key="image" style={[styles.image, imageStyle]} source={imageSource} />;

      if (imageAlignment === 'left') {
        content.unshift(image);
      } else {
        content.push(image);
      }
    }
  }

  const rootStyle = [styles.root, style];

  if (props.disabled) {
    rootStyle.push(styles.disabled);
  }

  return (
    <TouchableOpacity activeOpacity={activeOpacity} {...props}>
      <View style={rootStyle}>{content}</View>
    </TouchableOpacity>
  );
};

const createStyleSheet = ({ Colors }: Theme) =>
  StyleSheet.create({
    root: {
      height: 50,
      borderRadius: 5,
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 15,
      justifyContent: 'center',
      backgroundColor: Colors.gray,
    },
    text: {
      height: 16,
      fontSize: 16,
      lineHeight: 16,
      color: Colors.white,
      textTransform: 'uppercase',
    },
    image: {
      width: 20,
      height: 20,
      flexShrink: 0,
      tintColor: Colors.white,
      marginHorizontal: 5,
    },
    disabled: {
      opacity: 0.5,
    },
  });

Button.defaultProps = {
  disabled: false,
  imageAlignment: 'left',
};

export default Button;
