import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { Theme, Themed, withTheme } from '../theming';

interface SeparatorProps extends ViewProps {
  insetLeft?: number;
  highlighted?: boolean;
}

const Separator: React.FC<Themed<typeof createStyleSheet, SeparatorProps>> = ({
  theme: { styles },
  insetLeft = 20,
  highlighted,
  style,
  ...props
}) => (
  <View
    {...props}
    style={[{ marginLeft: insetLeft }, styles.root, style, highlighted && styles.highlighted]}
  />
);

const createStyleSheet = ({ colors }: Theme) =>
  StyleSheet.create({
    root: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.separator,
    },
    highlighted: {
      opacity: 0,
    },
  });

export default withTheme(Separator, createStyleSheet, 'Table.Separator');
