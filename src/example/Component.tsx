import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewProps, ViewStyle } from 'react-native';

import { Themed, Theme, WithThemeProps, withTheme } from '../theming';

interface ComponentProps extends ViewProps {
  visible?: boolean;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

class Component extends React.Component<Themed<typeof createStyleSheet, ComponentProps>> {
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

export type Props = ComponentProps & WithThemeProps;

export default withTheme(Component, createStyleSheet, 'Component');
