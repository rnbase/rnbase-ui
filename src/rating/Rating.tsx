import React, { useCallback, useMemo, useState, useEffect } from 'react';
import {
  Animated,
  PanResponder,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

import { Themed, Theme, WithThemeProps, withTheme } from '../theming';
import { inRange } from '../helpers';
import RatingSymbol from './RatingSymbol';

interface RatingProps extends ViewProps {
  size?: number;
  type?: 'solid' | 'outline';
  value?: number;
  animate?: boolean;
  maxValue?: number;
  allowDecimals?: boolean;
  style?: StyleProp<ViewStyle>;
  symbolStyle?: StyleProp<TextStyle>;
  activeSymbolStyle?: StyleProp<TextStyle>;
  selectedSymbolStyle?: StyleProp<TextStyle>;
  onChange?: Function;
  onFinish?: Function;
}

const Rating: React.FC<Themed<typeof createStyleSheet, RatingProps>> = ({
  theme: { styles },
  size = 20,
  type = 'outline',
  value = 0,
  animate = true,
  maxValue = 5,
  allowDecimals = false,
  style,
  symbolStyle,
  activeSymbolStyle,
  selectedSymbolStyle,
  onChange,
  onFinish,
}) => {
  const [rating, setRating] = useState();
  const [overlayWidth] = useState(() => new Animated.Value(0));
  const setOverlayWidth = useCallback(ratingValue => overlayWidth.setValue(ratingValue * size), [
    overlayWidth,
    size,
  ]);

  useEffect(() => setOverlayWidth(inRange(value, 0, maxValue)), [setOverlayWidth, value, maxValue]);

  const onMove = useCallback(
    ({ nativeEvent }) => {
      const eventValue = allowDecimals
        ? Math.round((nativeEvent.locationX / size) * 10) / 10
        : Math.ceil(nativeEvent.locationX / size);
      const ratingValue = inRange(eventValue, 0, maxValue);

      setRating(ratingValue);
      setOverlayWidth(ratingValue);

      if (onChange) {
        onChange(ratingValue);
      }
    },
    [allowDecimals, size, maxValue, setOverlayWidth, onChange],
  );

  const onRelease = useCallback(() => {
    if (onFinish) {
      onFinish(rating);
    }

    setRating(undefined);
  }, [onFinish, rating]);

  const panResponder = useMemo(() => {
    if (!onChange && !onFinish) {
      return false;
    }

    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: onMove,
      onPanResponderMove: onMove,
      onPanResponderRelease: onRelease,
    });
  }, [onChange, onFinish, onMove, onRelease]);

  const rootStyles = [
    {
      width: size * maxValue,
      height: size,
    },
    styles.root,
    style,
  ];

  const overlayStyles = [
    {
      width: overlayWidth,
      height: size,
    },
    styles.root,
    styles.overlay,
  ];

  const symbolStyles = [
    {
      width: size,
      fontSize: size,
      height: size * 1.25,
      lineHeight: size * 1.25,
    },
    styles.symbol,
    symbolStyle,
  ];

  const overlaySymbolStyles = [symbolStyles, styles.symbolActive, activeSymbolStyle];

  if (rating) {
    overlaySymbolStyles.push(styles.symbolSelected, selectedSymbolStyle);
  }

  const getSymbols = useCallback(
    layer => Array(maxValue).fill(layer === 'overlay' || type === 'solid' ? '\u2605' : '\u2606'),
    [maxValue, type],
  );

  const renderSymbols = (layer: 'underlay' | 'overlay', ratingSymbolStyle: StyleProp<TextStyle>) =>
    getSymbols(layer).map((symbol, index) => (
      <RatingSymbol
        key={index}
        selected={animate && Math.ceil(rating) === index + 1}
        style={ratingSymbolStyle}
      >
        {symbol}
      </RatingSymbol>
    ));

  return (
    <View {...panResponder && panResponder.panHandlers} pointerEvents="box-only" style={rootStyles}>
      {renderSymbols('underlay', symbolStyles)}
      <Animated.View style={overlayStyles}>
        {renderSymbols('overlay', overlaySymbolStyles)}
      </Animated.View>
    </View>
  );
};

const createStyleSheet = ({ Colors }: Theme) =>
  StyleSheet.create({
    root: {
      flexShrink: 0,
      alignItems: 'center',
      flexDirection: 'row',
    },
    overlay: {
      top: 0,
      left: 0,
      overflow: 'hidden',
      position: 'absolute',
    },
    symbol: {
      flexShrink: 0,
      fontWeight: '200',
      color: Colors.gray3,
      textAlign: 'center',
      fontFamily: 'System',
      includeFontPadding: false,
      textAlignVertical: 'center',
      backgroundColor: 'transparent',
    },
    symbolActive: {
      color: Colors.orange,
    },
    symbolSelected: {
      color: Colors.red,
    },
  });

export type Props = RatingProps & WithThemeProps;

export default withTheme(Rating, createStyleSheet, 'Rating');
