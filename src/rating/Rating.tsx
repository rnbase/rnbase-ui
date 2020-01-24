import React from 'react';
import {
  Animated,
  GestureResponderEvent,
  PanResponder,
  PanResponderInstance,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { Themed, Theme, WithThemeProps, withTheme } from '../theming';
import { RatingContext, RatingValue } from './RatingContext';
import { inRange } from '../helpers';

import RatingSymbol from './RatingSymbol';

type Type = 'solid' | 'outline';

interface RatingProps {
  size: number;
  type: Type;
  value: number;
  animate: boolean;
  maxValue: number;
  allowDecimals: boolean;
  style?: StyleProp<ViewStyle>;
  symbolStyle?: StyleProp<TextStyle>;
  activeSymbolStyle?: StyleProp<TextStyle>;
  selectedSymbolStyle?: StyleProp<TextStyle>;
  onTouchStart?: () => void;
  onTouchEnd?: (rating: number) => void;
  onChange?: (rating: number) => void;
}

type ThemedRatingProps = Themed<typeof createStyleSheet, RatingProps>;

type State = {
  interactive: boolean;
};

class Rating extends React.PureComponent<ThemedRatingProps, State> {
  public static defaultProps = {
    size: 20,
    type: 'outline' as Type,
    value: 0,
    animate: true,
    maxValue: 5,
    allowDecimals: false,
  };

  state = {
    interactive: false,
  };

  private readonly ratingValue = new RatingValue();
  private readonly overlayWidth = new Animated.Value(0);

  private readonly panResponder: PanResponderInstance;
  private rafHandle: number | undefined;

  constructor(props: ThemedRatingProps) {
    super(props);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderRelease,
    });
  }

  componentDidMount() {
    this.setOverlayWidth(inRange(this.props.value, 0, this.props.maxValue));
  }

  componentDidUpdate(prevProps: ThemedRatingProps) {
    const { value, maxValue } = this.props;

    if (value !== prevProps.value || maxValue !== prevProps.maxValue) {
      this.setOverlayWidth(inRange(value, 0, maxValue));
    }
  }

  componentWillUnmount() {
    if (this.rafHandle) {
      cancelAnimationFrame(this.rafHandle);
    }
  }

  render() {
    const {
      theme: { styles },
      size,
      type,
      animate,
      maxValue,
      style,
      symbolStyle,
      activeSymbolStyle,
      selectedSymbolStyle,
      onTouchStart,
      onTouchEnd,
      onChange,
    } = this.props;

    const { interactive } = this.state;

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
        width: this.overlayWidth,
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
      <View
        {...(onTouchStart || onChange || onTouchEnd) && this.panResponder.panHandlers}
        pointerEvents="box-only"
        style={rootStyles}
      >
        <RatingContext.Provider value={this.ratingValue}>
          {renderSymbols(underlaySymbols, symbolStyles)}
          <Animated.View style={overlayStyles}>
            {renderSymbols(overlaySymbols, overlaySymbolStyles)}
          </Animated.View>
        </RatingContext.Provider>
      </View>
    );
  }

  private setInteractive(interactive: boolean) {
    this.setState({ interactive });
  }

  private setOverlayWidth(rating: number) {
    this.overlayWidth.setValue(rating * this.props.size);
  }

  private handlePanResponderGrant = (event: GestureResponderEvent) => {
    const { onTouchStart } = this.props;

    this.setInteractive(true);
    this.handlePanResponderMove(event);

    if (onTouchStart) {
      onTouchStart();
    }
  };

  private handlePanResponderMove = ({ nativeEvent: { locationX } }: GestureResponderEvent) => {
    const { allowDecimals, size, maxValue } = this.props;

    const eventValue = allowDecimals
      ? Math.round((locationX / size) * 10) / 10
      : Math.ceil(locationX / size);

    const rating = inRange(eventValue, 0, maxValue);

    if (this.ratingValue.value !== rating) {
      this.ratingValue.value = rating;

      if (this.rafHandle) {
        cancelAnimationFrame(this.rafHandle);
      }

      this.rafHandle = requestAnimationFrame(() => {
        const { onChange } = this.props;

        this.setOverlayWidth(rating);

        if (onChange) {
          onChange(rating);
        }
      });
    }
  };

  private handlePanResponderRelease = () => {
    const { onTouchEnd } = this.props;

    if (onTouchEnd) {
      onTouchEnd(this.ratingValue.value);
    }

    this.ratingValue.value = 0;
    this.setInteractive(false);
  };
}

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
