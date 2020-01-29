import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle, ViewProps } from 'react-native';

import { Theme, Themed, withTheme } from '../theming';

interface SectionProps extends ViewProps {
  header?: string;
  footer?: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<TextStyle>;
  footerStyle?: StyleProp<TextStyle>;
}

const Section: React.FC<Themed<typeof createStyleSheet, SectionProps>> = ({
  theme: { styles },
  header,
  footer,
  children,
  style,
  contentStyle,
  headerStyle,
  footerStyle,
  ...props
}) => {
  const rootStyles = [
    {
      marginTop: header ? 13 : 15,
      marginBottom: footer ? 9 : 20,
    },
    style,
  ];

  return (
    <View {...props} style={rootStyles}>
      {header && (
        <Text style={[styles.header, headerStyle]} numberOfLines={1}>
          {header}
        </Text>
      )}
      <View style={[styles.content, contentStyle]}>{children}</View>
      {footer && <Text style={[styles.footer, footerStyle]}>{footer}</Text>}
    </View>
  );
};

const createStyleSheet = ({ colors, fonts }: Theme) =>
  StyleSheet.create({
    content: {
      backgroundColor: colors.white,
      borderColor: colors.separator,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    header: {
      ...fonts.normal,
      fontSize: 13,
      marginBottom: 6.5,
      marginHorizontal: 20,
      color: colors.gray,
      textTransform: 'uppercase',
    },
    footer: {
      ...fonts.normal,
      fontSize: 13,
      marginTop: 7.5,
      marginHorizontal: 20,
      color: colors.gray,
    },
  });

export default withTheme(Section, createStyleSheet, 'Table.Section');
