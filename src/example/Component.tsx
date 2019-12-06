import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

export interface Props extends ViewProps {
  visible?: boolean;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Component: React.FC<Props> = ({
  visible,
  children,
  style,
  textStyle,
  ...props
}) => {
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
    height: 16,
    fontSize: 16,
    lineHeight: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

Component.defaultProps = {
  visible: true,
};

export default Component;
