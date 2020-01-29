import React from 'react';
import { StyleSheet, TouchableHighlight, View, ViewProps } from 'react-native';

import { Themed, withTheme } from '../theming';

interface RowProps extends ViewProps {
  children: React.ReactNode;
  activeOpacity?: number;
  underlayColor?: string;
  onPress?: () => void;
}

const Row: React.FC<Themed<typeof createStyleSheet, RowProps>> = ({
  theme: { styles, colors },
  children,
  activeOpacity = 1,
  underlayColor = colors.underlay,
  style,
  onPress,
  ...props
}) => {
  const content = (
    <View {...props} style={[styles.root, style]}>
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableHighlight
        onPress={onPress}
        activeOpacity={activeOpacity}
        underlayColor={underlayColor}
      >
        {content}
      </TouchableHighlight>
    );
  }

  return content;
};

const createStyleSheet = () =>
  StyleSheet.create({
    root: {
      minHeight: 43,
      flexWrap: 'nowrap',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      justifyContent: 'space-between',
    },
  });

export default withTheme(Row, createStyleSheet, 'Form.Row');
