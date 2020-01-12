import React, { useState, useEffect } from 'react';
import { Animated, StyleProp, TextProps, TextStyle } from 'react-native';

interface RatingSymbolProps extends TextProps {
  selected?: boolean;
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const RatingSymbol: React.FC<RatingSymbolProps> = ({ selected = false, children, style }) => {
  const toValue = selected ? 1.25 : 1;
  const [animatedValue] = useState(() => new Animated.Value(toValue));

  useEffect(() => {
    Animated.spring(animatedValue, {
      tension: 50,
      friction: 3,
      toValue: toValue,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, toValue]);

  return (
    <Animated.Text
      allowFontScaling={false}
      style={[style, { transform: [{ scale: animatedValue }] }]}
    >
      {children}
    </Animated.Text>
  );
};

export type Props = RatingSymbolProps;

export default RatingSymbol;
