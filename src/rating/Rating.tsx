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
import { RatingContext, RatingValue } from './RatingContext';
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

// let renders = 0;

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
  // console.log(`Rating, render(${++renders}): `, value);

  const [interactive, setInteractive] = useState(false);
  const [overlayWidth] = useState(() => new Animated.Value(0));
  const [ratingValue] = useState(() => new RatingValue());
  const setOverlayWidth = useCallback(v => overlayWidth.setValue(v * size), [overlayWidth, size]);

  useEffect(() => setOverlayWidth(inRange(value, 0, maxValue)), [setOverlayWidth, value, maxValue]);

  const onMove = useCallback(
    ({ nativeEvent }) => {
      const eventValue = allowDecimals
        ? Math.round((nativeEvent.locationX / size) * 10) / 10
        : Math.ceil(nativeEvent.locationX / size);

      ratingValue.value = inRange(eventValue, 0, maxValue);

      setOverlayWidth(ratingValue.value);

      if (onChange) {
        onChange(ratingValue.value);
      }
    },
    [allowDecimals, size, maxValue, setOverlayWidth, onChange, ratingValue],
  );

  const onGrant = useCallback(
    event => {
      setInteractive(true);
      onMove(event);
    },
    [onMove],
  );

  const onRelease = useCallback(() => {
    if (onFinish) {
      onFinish(ratingValue.value);
    }

    ratingValue.value = 0;

    setInteractive(false);
  }, [onFinish, ratingValue]);

  const panResponder = useMemo(() => {
    if (!onChange && !onFinish) {
      return false;
    }

    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: onGrant,
      onPanResponderMove: onMove,
      onPanResponderRelease: onRelease,
    });
  }, [onChange, onFinish, onGrant, onMove, onRelease]);

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

  if (interactive) {
    overlaySymbolStyles.push(styles.symbolSelected, selectedSymbolStyle);
  }

  const overlaySymbols = Array(maxValue).fill('\u2605');
  const underlaySymbols = type === 'solid' ? overlaySymbols : Array(maxValue).fill('\u2606');

  const renderSymbols = (symbols: string[], ratingSymbolStyle: StyleProp<TextStyle>) =>
    symbols.map((symbol, index) => (
      <RatingSymbol key={index} animate={animate} value={index + 1} style={ratingSymbolStyle}>
        {symbol}
      </RatingSymbol>
    ));

  return (
    <View {...panResponder && panResponder.panHandlers} pointerEvents="box-only" style={rootStyles}>
      <RatingContext.Provider value={ratingValue}>
        {renderSymbols(underlaySymbols, symbolStyles)}
        <Animated.View style={overlayStyles}>
          {renderSymbols(overlaySymbols, overlaySymbolStyles)}
        </Animated.View>
      </RatingContext.Provider>
    </View>
  );
};

const createStyleSheet = ({ colors }: Theme) =>
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
      color: colors.gray3,
      textAlign: 'center',
      fontFamily: 'System',
      includeFontPadding: false,
      textAlignVertical: 'center',
      backgroundColor: 'transparent',
    },
    symbolActive: {
      color: colors.orange,
    },
    symbolSelected: {
      color: colors.red,
    },
  });

export type Props = RatingProps & WithThemeProps;

export default withTheme(Rating, createStyleSheet, 'Rating');
