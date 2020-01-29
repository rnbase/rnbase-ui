import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { Theme, Themed, withTheme } from '../theming';

interface SeparatorProps extends ViewProps {
  highlighted?: boolean;
}

const Separator: React.FC<Themed<typeof createStyleSheet, SeparatorProps>> = ({
  theme: { styles },
  style,
  highlighted,
  ...props
}) => <View {...props} style={[styles.root, style, highlighted && styles.highlighted]} />;

const createStyleSheet = ({ colors }: Theme) =>
  StyleSheet.create({
    root: {
      marginLeft: 20,
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.separator,
    },
    highlighted: {
      backgroundColor: 'transparent',
    },
  });

export default withTheme(Separator, createStyleSheet, 'Table.Separator');
