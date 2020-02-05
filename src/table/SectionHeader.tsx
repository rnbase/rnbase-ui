import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewProps } from 'react-native';

import { Theme, Themed, withTheme } from '../theming';

interface SectionHeaderProps extends ViewProps {
  children?: React.ReactNode;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
}

const SectionHeader: React.FC<Themed<typeof createStyleSheet, SectionHeaderProps>> = ({
  theme: { styles },
  children,
  text,
  style,
  textStyle,
  ...props
}) => (
  <View {...props} style={[styles.root, style]}>
    {children || (
      <Text style={[styles.text, textStyle]} numberOfLines={1}>
        {text}
      </Text>
    )}
  </View>
);

const createStyleSheet = ({ colors, fonts }: Theme) =>
  StyleSheet.create({
    root: {
      marginBottom: 6.5,
      marginHorizontal: 20,
    },
    text: {
      ...fonts.normal,
      fontSize: 13,
      color: colors.gray,
      textTransform: 'uppercase',
    },
  });

export default withTheme(SectionHeader, createStyleSheet, 'Table.SectionHeader');
