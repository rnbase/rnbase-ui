import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

import { Theme, Themed, withTheme } from '../theming';

interface LabelProps extends TextProps {
  children: React.ReactNode;
}

const Label: React.FC<Themed<typeof createStyleSheet, LabelProps>> = ({
  theme: { styles },
  children,
  style,
  ...props
}) => (
  <Text {...props} style={[styles.root, style]} numberOfLines={1}>
    {children}
  </Text>
);

const createStyleSheet = ({ colors, fonts }: Theme) =>
  StyleSheet.create({
    root: {
      ...fonts.normal,
      height: 16,
      fontSize: 16,
      lineHeight: 16,
      flexShrink: 1,
      marginRight: 20,
      color: colors.gray,
    },
  });

export default withTheme(Label, createStyleSheet, 'Form.Label');
