import React from 'react';
import { StyleProp, TextStyle, ViewProps } from 'react-native';

import { Themed, withTheme } from '../theming';
import Row from './Row';

interface ButtonProps extends ViewProps {
  color?: string;
  height?: number;
  title: string;
  activeOpacity?: number;
  underlayColor?: string;
  titleStyle?: StyleProp<TextStyle>;
  onPress: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
}

const Button: React.FC<Themed<typeof createStyleSheet, ButtonProps>> = ({
  theme: { colors },
  color = colors.blue,
  height,
  title,
  activeOpacity,
  underlayColor,
  style,
  titleStyle,
  onPress,
  onPressIn,
  onPressOut,
}) => (
  <Row
    height={height}
    title={title}
    activeOpacity={activeOpacity}
    underlayColor={underlayColor}
    disclosure={false}
    style={style}
    titleStyle={[{ color }, titleStyle]}
    onPress={onPress}
    onPressIn={onPressIn}
    onPressOut={onPressOut}
  />
);

const createStyleSheet = () => {};

export default withTheme(Button, createStyleSheet, 'Table.Button');
