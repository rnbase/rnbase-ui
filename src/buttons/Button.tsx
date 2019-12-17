import React, { useMemo } from 'react';
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

import { Theme as ThemeType, useTheme } from '../theming';

export interface Props extends TouchableOpacityProps {
  visible?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  imageSource?: ImageSourcePropType;
  imageStyle?: StyleProp<ImageStyle>;
}

const Button: React.FC<Props> = ({
  visible,
  children,
  style,
  textStyle,
  imageSource,
  imageStyle,
  ...props
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyleSheet(theme), [theme]);

  return !visible ? null : (
    <TouchableOpacity activeOpacity={0.5} {...props}>
      <View style={[styles.button, style, props.disabled && styles.disabled]}>
        {children && (
          <Text style={[styles.text, textStyle]} numberOfLines={1}>
            {children}
          </Text>
        )}
        {imageSource && <Image style={[styles.image, imageStyle]} source={imageSource} />}
      </View>
    </TouchableOpacity>
  );
};

const createStyleSheet = ({ Colors, Button: Theme }: ThemeType) =>
  StyleSheet.create({
    button: {
      height: 50,
      borderRadius: 5,
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 15,
      justifyContent: 'center',
      backgroundColor: Colors.gray,
      ...(Theme && Theme.button),
    },
    text: {
      height: 16,
      fontSize: 16,
      lineHeight: 16,
      color: Colors.white,
      textTransform: 'uppercase',
      ...(Theme && Theme.text),
    },
    image: {
      width: 20,
      height: 20,
      flexShrink: 0,
      tintColor: Colors.white,
      ...(Theme && Theme.image),
    },
    disabled: {
      opacity: 0.5,
      ...(Theme && Theme.disabled),
    },
  });

Button.defaultProps = {
  visible: true,
  disabled: false,
};

export default Button;
