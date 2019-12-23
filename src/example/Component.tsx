import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewProps, ViewStyle } from 'react-native';

import { Theme, withTheme } from '../theming';

export interface Props extends ViewProps {
  visible?: boolean;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

interface ComponentProps extends Props {
  styles: ReturnType<typeof createStyleSheet>;
}

class Component extends React.Component<ComponentProps> {
  static defaultProps = {
    visible: true,
  };

  render() {
    const { styles, visible, children, style, textStyle, ...props } = this.props;

    return !visible ? null : (
      <View style={[styles.wrapper, style]} {...props}>
        {children && (
          <Text style={[styles.text, textStyle]} numberOfLines={1}>
            {children}
          </Text>
        )}
      </View>
    );
  }
}

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

export default withTheme(Component, createStyleSheet, 'Component');
