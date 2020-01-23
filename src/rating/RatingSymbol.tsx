import React, { useContext, useEffect, useState } from 'react';
import { Animated, StyleProp, TextProps, TextStyle } from 'react-native';
import { RatingContext } from './RatingContext';

export interface Props extends TextProps {
  animate: boolean;
  value: number;
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

// let renders = 0;

const RatingSymbol: React.FC<Props> = ({ animate, value, children, style }) => {
  // console.log(`RatingSymbol, render(${++renders}): `, value);

  const ratingValue = useContext(RatingContext);

  const [animatedValue] = useState(() => new Animated.Value(ratingValue.scale(value)));

  useEffect(() => {
    if (animate) {
      return ratingValue.addListener(() => {
        Animated.spring(animatedValue, {
          tension: 50,
          friction: 3,
          toValue: ratingValue.scale(value),
          useNativeDriver: true,
        }).start();
      });
    }
  }, [animate, animatedValue, ratingValue, value]);

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
