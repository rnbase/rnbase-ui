import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewProps, ViewStyle } from 'react-native';

import { useTheme } from '../theming';

export interface Props extends ViewProps {
  visible?: boolean;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Component: React.FC<Props> = ({ visible, children, style, textStyle, ...props }) => {
  const { colors } = useTheme();

  return !visible ? null : (
    <View style={[styles.wrapper, style, { backgroundColor: colors.blue }]} {...props}>
      {children && (
        <Text style={[styles.text, textStyle]} numberOfLines={1}>
          {children}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: '#DD2222',
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'System',
    textTransform: 'uppercase',
  },
});

Component.defaultProps = {
  visible: true,
};

export default Component;
