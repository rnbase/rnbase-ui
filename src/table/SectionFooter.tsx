import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewProps } from 'react-native';

import { Theme, Themed, withTheme } from '../theming';

interface SectionFooterProps extends ViewProps {
  content?: string | React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const SectionFooter: React.FC<Themed<typeof createStyleSheet, SectionFooterProps>> = ({
  theme: { styles },
  content,
  style,
}) => {
  if (!content) {
    return null;
  }

  if (React.isValidElement(content)) {
    return <View style={[styles.root, style]}>{content}</View>;
  }

  return (
    <View style={styles.root}>
      <Text style={[styles.text, style]}>{content}</Text>
    </View>
  );
};

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
