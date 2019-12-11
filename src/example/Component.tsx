import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewProps, ViewStyle } from 'react-native';

import { Theme, useTheme } from '../theming';

export interface Props extends ViewProps {
  visible?: boolean;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Component: React.FC<Props> = ({ visible, children, style, textStyle, ...props }) => {
  const theme = useTheme();

  return !visible ? null : (
    <View style={StyleSheet.flatten([styles.wrapper(theme), style])} {...props}>
      {children && (
        <Text style={StyleSheet.flatten([styles.text(theme), textStyle])} numberOfLines={1}>
          {children}
        </Text>
      )}
    </View>
  );
};

const styles = {
  wrapper: ({ colors }: Theme): StyleProp<ViewStyle> => ({
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: colors.gray2,
  }),
  text: ({ colors }: Theme): StyleProp<TextStyle> => ({
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
    fontFamily: 'System',
    textTransform: 'uppercase',
  }),
};

Component.defaultProps = {
  visible: true,
};

export default Component;
