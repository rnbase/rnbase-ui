import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewProps, ViewStyle } from 'react-native';

import { Theme, useThemeStyles } from '../theming';

export interface Props extends ViewProps {
  visible?: boolean;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Component: React.FC<Props> = ({ visible, children, style, textStyle, ...props }) => {
  const styles = useThemeStyles(createStyleSheet, 'Component');

  return !visible ? null : (
    <View style={[styles.wrapper, style]} {...props}>
      {children && (
        <Text style={[styles.text, textStyle]} numberOfLines={1}>
          {children}
        </Text>
      )}
    </View>
  );
};

const createStyleSheet = ({ Colors }: Theme) =>
  StyleSheet.create({
    wrapper: {
      height: 50,
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 15,
      justifyContent: 'center',
      backgroundColor: Colors.gray2,
    },
    text: {
      fontSize: 16,
      color: Colors.white,
      fontWeight: 'bold',
      fontFamily: 'System',
      textTransform: 'uppercase',
    },
  });

Component.defaultProps = {
  visible: true,
};

export default Component;
