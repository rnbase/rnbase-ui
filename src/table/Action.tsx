import React from 'react';
import {
  StyleProp,
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  Text,
  TextProps,
  View,
} from 'react-native';

import { Theme, Themed, withTheme } from '../theming';

interface ActionProps extends TextProps {
  children?: React.ReactNode;
  iconSource?: ImageSourcePropType;
  iconStyle?: StyleProp<ImageStyle>;
}

const Action: React.FC<Themed<typeof createStyleSheet, ActionProps>> = ({
  theme: { styles },
  children,
  style,
  iconSource,
  iconStyle,
  ...props
}) => (
  <View style={styles.root}>
    {children && (
      <Text {...props} style={[styles.text, style]} numberOfLines={1}>
        {children}
      </Text>
    )}
    {!!iconSource && <Image style={[styles.icon, iconStyle]} source={iconSource} />}
  </View>
);

const createStyleSheet = ({ colors, fonts }: Theme) =>
  StyleSheet.create({
    root: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    text: {
      ...fonts.normal,
      height: 16,
      fontSize: 16,
      lineHeight: 16,
      color: colors.blue,
    },
    icon: {
      width: 22,
      height: 22,
      marginRight: -4,
      tintColor: colors.blue,
    },
  });

export default withTheme(Action, createStyleSheet, 'Table.Action');
