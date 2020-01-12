import React, { useState, useEffect } from 'react';
import { Animated, StyleProp, TextProps, TextStyle } from 'react-native';

interface Props extends TextProps {
  selected?: boolean;
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const RatingSymbol: React.FC<Props> = ({ selected = false, children, style }) => {
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

export default RatingSymbol;
