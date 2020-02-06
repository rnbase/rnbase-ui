import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';

import { Theme, Themed, withTheme } from '../theming';

interface SectionFooterProps {
  style?: StyleProp<TextStyle>;
}

const SectionFooter: React.FC<Themed<typeof createStyleSheet, SectionFooterProps>> = ({
  theme: { styles },
  children,
  style,
}) => {
  if (!children) {
    return null;
  }

  if (React.isValidElement(children)) {
    return <View style={[styles.root, style]}>{children}</View>;
  }

  return (
    <View style={styles.root}>
      <Text style={[styles.text, style]}>{children}</Text>
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
