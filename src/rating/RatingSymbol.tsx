import React, { useContext, useEffect, useState } from 'react';
import { Animated, StyleProp, TextProps, TextStyle } from 'react-native';
import { RatingContext, RatingValue } from './RatingContext';

export interface Props extends TextProps {
  value: number;
  animate: boolean;
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const scale = (ratingValue: RatingValue, value: number) => (ratingValue.isEqual(value) ? 1.2 : 1);

const RatingSymbol: React.FC<Props> = ({ value, animate, children, style }) => {
  const ratingValue = useContext(RatingContext);
  const [animatedValue] = useState(() => new Animated.Value(scale(ratingValue, value)));

  useEffect(() => {
    if (animate) {
      return ratingValue.addListener(() => {
        Animated.spring(animatedValue, {
          tension: 50,
          friction: 3,
          toValue: scale(ratingValue, value),
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
