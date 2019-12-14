import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewProps, ViewStyle } from 'react-native';

import { Theme, useTheme, useStyles } from '../theming';

export interface Props extends ViewProps {
  visible?: boolean;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Component: React.FC<Props> = ({ visible, children, style, textStyle, ...props }) => {
  const theme = useTheme();
  const styles = useStyles(theme, createStyleSheet);
  const themeStyles = theme.Component || {};

  return !visible ? null : (
    <View style={[styles.wrapper, themeStyles.wrapper, style]} {...props}>
      {children && (
        <Text style={[styles.text, themeStyles.text, textStyle]} numberOfLines={1}>
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
