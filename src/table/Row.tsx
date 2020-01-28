import React from 'react';
import { StyleSheet, TouchableHighlight, View, ViewProps } from 'react-native';

import { Themed, withTheme } from '../theming';

interface RowProps extends ViewProps {
  children: React.ReactNode;
  onPress?: () => void;
}

const Row: React.FC<Themed<typeof createStyleSheet, RowProps>> = ({
  theme: { styles, colors },
  children,
  style,
  onPress,
  ...props
}) =>
  onPress ? (
    <TouchableHighlight onPress={onPress} activeOpacity={1} underlayColor={colors.underlay}>
      <View {...props} style={[styles.root, style]}>
        {children}
      </View>
    </TouchableHighlight>
  ) : (
    <View {...props} style={[styles.root, style]}>
      {children}
    </View>
  );

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
