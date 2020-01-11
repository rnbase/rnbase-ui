import React, { useCallback, useMemo, useState, useEffect } from 'react';
import {
  Animated,
  PanResponder,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

import { Themed, Theme, WithThemeProps, withTheme } from '../theming';

const inRange = (value: number, maxValue: number) => Math.max(0, Math.min(value, maxValue));

interface RatingProps extends ViewProps {
  size?: number;
  type?: 'solid' | 'outline';
  value?: number;
  maxValue?: number;
  activeColor?: string;
  ratingColor?: string;
  underlayColor?: string;
  allowDecimals?: boolean;
  style?: StyleProp<ViewStyle>;
  onChange?: Function;
  onFinish?: Function;
}

const Rating: React.FC<Themed<typeof createStyleSheet, RatingProps>> = ({
  styles,
  size = 20,
  type = 'outline',
  value = 0,
  maxValue = 5,
  activeColor,
  ratingColor,
  underlayColor,
  allowDecimals = false,
  style,
  onChange,
  onFinish,
}) => {
  const [rating, setRating] = useState();
  const [overlayWidth] = useState(() => new Animated.Value(0));
  const setOverlayWidth = useCallback(ratingValue => overlayWidth.setValue(ratingValue * size), [
    overlayWidth,
    size,
  ]);

  useEffect(() => setOverlayWidth(inRange(value, maxValue)), [setOverlayWidth, value, maxValue]);

  const onMove = useCallback(
    ({ nativeEvent }) => {
      const eventValue = allowDecimals
        ? Math.round((nativeEvent.locationX / size) * 10) / 10
        : Math.ceil(nativeEvent.locationX / size);
      const ratingValue = inRange(eventValue, maxValue);

      setRating(ratingValue);
      setOverlayWidth(ratingValue);
      onChange && onChange(ratingValue);
    },
    [allowDecimals, size, maxValue, setOverlayWidth, onChange],
  );

  const onRelease = useCallback(() => {
    if (onFinish) {
      onFinish(rating);
      setRating(undefined);
    }
  }, [onFinish, rating]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: onMove,
        onPanResponderMove: onMove,
        onPanResponderRelease: onRelease,
      }),
    [onMove, onRelease],
  );

  const symbols = {
    solid: '\u2605',
    outline: '\u2606',
  };

  const rootStyles = [
    styles.root,
    style,
    {
      width: size * maxValue,
      height: size,
    },
  ];

  const overlayStyles = [
    styles.root,
    styles.overlay,
    {
      width: overlayWidth,
      height: size,
    },
  ];

  const textStyle = {
    width: size,
    fontSize: size,
    height: size * 1.25,
    lineHeight: size * 1.25,
  };

  const underlaySymbolStyles = [textStyle, styles.symbol, styles.symbolUnderlay];
  const overlaySymbolStyles = [textStyle, styles.symbol, styles.symbolOverlay];

  if (underlayColor) {
    underlaySymbolStyles.push({ color: underlayColor });
  }

  if (ratingColor) {
    overlaySymbolStyles.push({ color: ratingColor });
  }

  if (rating) {
    overlaySymbolStyles.push(activeColor ? { color: activeColor } : styles.symbolActive);
  }

  const renderSymbols = (symbol: string, symbolStyle: StyleProp<TextStyle>) =>
    Array(maxValue)
      .fill(symbol)
      .map((item, index) => (
        <Text key={index} allowFontScaling={false} style={symbolStyle}>
          {item}
        </Text>
      ));

  return (
    <View {...panResponder.panHandlers} pointerEvents="box-only" style={rootStyles}>
      {renderSymbols(symbols[type], underlaySymbolStyles)}
      <Animated.View style={overlayStyles}>
        {renderSymbols(symbols.solid, overlaySymbolStyles)}
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
      textAlign: 'center',
      fontFamily: 'System',
      includeFontPadding: false,
      textAlignVertical: 'center',
      backgroundColor: 'transparent',
    },
    symbolUnderlay: {
      color: Colors.gray3,
    },
    symbolOverlay: {
      color: Colors.orange,
    },
    symbolActive: {
      color: Colors.red,
    },
  });

export type Props = RatingProps & WithThemeProps;

export default withTheme(Rating, createStyleSheet, 'Rating');
