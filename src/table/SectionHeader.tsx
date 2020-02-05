import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewProps } from 'react-native';

import { Theme, Themed, withTheme } from '../theming';

interface SectionHeaderProps extends ViewProps {
  content?: string | React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const SectionHeader: React.FC<Themed<typeof createStyleSheet, SectionHeaderProps>> = ({
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
      <Text style={[styles.text, style]} numberOfLines={1}>
        {content}
      </Text>
    </View>
  );
};

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
