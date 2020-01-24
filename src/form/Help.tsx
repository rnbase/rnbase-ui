import React from 'react';
import { Platform, StyleSheet, Text, TextProps } from 'react-native';

import { Theme, Themed, withTheme } from '../theming';

interface HelpProps extends TextProps {
  children: React.ReactNode;
}

const Help: React.FC<Themed<typeof createStyleSheet, HelpProps>> = ({
  theme: { styles },
  children,
  style,
  ...props
}) => (
  <Text {...props} style={[styles.root, style]}>
    {children}
  </Text>
);

const createStyleSheet = ({ colors, fonts }: Theme) =>
  StyleSheet.create({
    root: {
      ...fonts.normal,
      margin: 15,
      marginTop: 0,
      fontSize: 12,
      color: colors.gray2,
      lineHeight: Platform.select({
        ios: 14,
        android: 18,
      }),
    },
  });

export default withTheme(Help, createStyleSheet, 'Form.Help');
