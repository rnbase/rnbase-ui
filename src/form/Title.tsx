import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

import { Theme, Themed, withTheme } from '../theming';

interface TitleProps extends TextProps {
  children: React.ReactNode;
}

const Title: React.FC<Themed<typeof createStyleSheet, TitleProps>> = ({
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
      ...fonts.bold,
      margin: 15,
      height: 13,
      fontSize: 13,
      lineHeight: 13,
      marginBottom: -10,
      color: colors.black,
      textTransform: 'uppercase',
      backgroundColor: colors.transparent,
    },
  });

export default withTheme(Title, createStyleSheet, 'Form.Title');
