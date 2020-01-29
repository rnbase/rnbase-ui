import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { Theme, Themed, withTheme } from '../theming';

interface SeparatorProps extends ViewProps {}

const Separator: React.FC<Themed<typeof createStyleSheet, SeparatorProps>> = ({
  theme: { styles },
  style,
  ...props
}) => <View {...props} style={[styles.root, style]} />;

const createStyleSheet = ({ colors }: Theme) =>
  StyleSheet.create({
    root: {
      marginLeft: 20,
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.separator,
    },
  });

export default withTheme(Separator, createStyleSheet, 'Table.Separator');
