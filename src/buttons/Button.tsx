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

import { Theme, useThemeStyles } from '../theming';

export interface Props extends TouchableOpacityProps {
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  text?: React.ReactNode;
  textStyle?: StyleProp<TextStyle>;
  imageSource?: ImageSourcePropType;
  imageStyle?: StyleProp<ImageStyle>;
}

const Button: React.FC<Props> = ({ style, text, textStyle, imageSource, imageStyle, ...props }) => {
  const styles = useThemeStyles(createStyleSheet, 'Button');

  return (
    <TouchableOpacity activeOpacity={0.5} {...props}>
      <View style={[styles.root, style, props.disabled && styles.disabled]}>
        {text && (
          <Text style={[styles.text, textStyle]} numberOfLines={1}>
            {text}
          </Text>
        )}
        {imageSource && <Image style={[styles.image, imageStyle]} source={imageSource} />}
      </View>
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
};

export default Button;
