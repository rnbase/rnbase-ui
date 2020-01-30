import React, { Children } from 'react';
import {
  Image,
  ImageStyle,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { Theme, Themed, withTheme } from '../theming';

interface FieldProps extends ViewStyle {
  children: React.ReactElement;
  error?: React.ReactNode;
  touch?: boolean;
  label?: string;
  style?: StyleProp<ViewStyle>;
  headingStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  fieldStyle?: StyleProp<ViewStyle>;
  errorStyle?: StyleProp<TextStyle>;
  errorIconStyle?: StyleProp<ImageStyle>;
  errorIconSource?: ImageSourcePropType;
}

const Field: React.FC<Themed<typeof createStyleSheet, FieldProps>> = ({
  theme: { styles },
  error,
  touch,
  label,
  children,
  style,
  headingStyle,
  fieldStyle,
  labelStyle,
  errorStyle,
  errorIconStyle,
  errorIconSource = require('./assets/error.png'),
  ...props
}) => (
  <View {...props} style={[styles.root, style]}>
    {label && (
      <View style={[styles.heading, headingStyle]}>
        <Text style={[styles.label, labelStyle]} numberOfLines={1}>
          {label}
        </Text>
        {error && touch && (
          <Text style={[styles.label, styles.error, errorStyle]} numberOfLines={1}>
            {error}
          </Text>
        )}
      </View>
    )}
    <View style={[styles.field, fieldStyle]}>
      {React.cloneElement(Children.only(children), {
        style: children.props.style
          ? StyleSheet.flatten([styles.input, children.props.style])
          : styles.input,
      })}
      {error && touch && (
        <Image style={[styles.errorIcon, errorIconStyle]} source={errorIconSource} />
      )}
    </View>
  </View>
);

const createStyleSheet = ({ colors, fonts }: Theme) =>
  StyleSheet.create({
    root: {
      marginBottom: 20,
    },
    heading: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    label: {
      ...fonts.semibold,
      height: 11,
      fontSize: 11,
      lineHeight: 11,
      flexShrink: 1,
      marginBottom: 8,
      color: colors.black,
      textTransform: 'uppercase',
      backgroundColor: colors.white,
    },
    error: {
      flexShrink: 0,
      marginLeft: 10,
      color: colors.red,
      textTransform: 'none',
    },
    field: {
      borderRadius: 5,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: colors.gray6,
    },
    input: {
      ...fonts.normal,
      height: 50,
      flexGrow: 1,
      fontSize: 18,
      flexShrink: 1,
      borderWidth: 0,
      paddingVertical: 0,
      paddingHorizontal: 15,
      backgroundColor: colors.transparent,
    },
    errorIcon: {
      width: 21,
      height: 21,
      marginRight: 8,
    },
  });

export default withTheme(Field, createStyleSheet, 'Field');
