import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewProps } from 'react-native';

import { Theme, Themed, withTheme } from '../theming';

interface SectionFooterProps extends ViewProps {
  children?: React.ReactNode;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
}

const SectionFooter: React.FC<Themed<typeof createStyleSheet, SectionFooterProps>> = ({
  theme: { styles },
  children,
  text,
  style,
  textStyle,
  ...props
}) => (
  <View {...props} style={[styles.root, style]}>
    {children || <Text style={[styles.text, textStyle]}>{text}</Text>}
  </View>
);

const createStyleSheet = ({ colors, fonts }: Theme) =>
  StyleSheet.create({
    root: {
      marginTop: 7.5,
      marginHorizontal: 20,
    },
    text: {
      ...fonts.normal,
      fontSize: 13,
      color: colors.gray,
    },
  });

export default withTheme(SectionFooter, createStyleSheet, 'Table.SectionFooter');
