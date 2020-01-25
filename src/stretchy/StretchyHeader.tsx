import React, { createRef } from 'react';
import {
  Animated,
  Easing,
  GestureResponderEvent,
  LayoutChangeEvent,
  PanResponder,
  PanResponderInstance,
  PanResponderGestureState,
  StyleSheet,
  View,
} from 'react-native';

import { inRange } from '../helpers';
import Pager, { Props as PagerProps } from '../pager/Pager';

export type BackgroundPropType = React.ReactElement | React.ReactElement[];

export interface StretchyHeaderProps {
  height: number;
  scrollY: Animated.Value;
  background: BackgroundPropType;
  backgroundColor?: string;
  showPager?: boolean;
  pagerProps?: PagerProps;
  children?: React.ReactNode;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
  onChange?: (event: { index: number }) => void;
}

interface StretchyHeaderState {
  width: number;
  index: number;
}

class StretchyHeader extends React.PureComponent<StretchyHeaderProps, StretchyHeaderState> {
  static defaultProps = {
    background: [],
    backgroundColor: 'transparent',
    showPager: true,
  };

  state = {
    width: 0,
    index: 0,
  };

  private overflow = 'visible';
  private refRoot = createRef<View>();
  private scrollX = new Animated.Value(0);

  private scrollListener: string | undefined;
  private panResponder: PanResponderInstance;

  constructor(props: StretchyHeaderProps) {
    super(props);

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: this.handleMoveShouldSetPanResponderCapture,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderRelease,
      onPanResponderTerminate: this.handlePanResponderRelease,
    });
  }

  componentDidMount = () => {
    this.scrollListener = this.props.scrollY.addListener(({ value }) => {
      const overflow = value > 0 ? 'hidden' : 'visible';

      if (overflow !== this.overflow) {
        const { current: rootView } = this.refRoot;

        rootView && rootView.setNativeProps({ style: { overflow } });
        this.overflow = overflow;
      }
    });
  };

  componentWillUnmount = () => {
    if (this.scrollListener) {
      this.props.scrollY.removeListener(this.scrollListener);
    }
  };

  render() {
    const {
      scrollX,
      handleLayout,
      panResponder,
      state: { width, index },
      props: { background, height, backgroundColor, children, scrollY, showPager, pagerProps },
    } = this;

    const opacity = scrollY.interpolate({
      inputRange: [0, height],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const scale = scrollY.interpolate({
      inputRange: [-height, 0],
      outputRange: [2, 1],
      extrapolateRight: 'clamp',
    });

    const translateY = scrollY.interpolate({
      inputRange: [0, height],
      outputRange: [0, height / 2],
      extrapolateRight: 'clamp',
    });

    const translateX = scrollX.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -width],
    });

    const elements = Array.isArray(background) ? background : [background];
    const length = elements.length;
    let content = [];

    if (showPager) {
      content.push(
        <Animated.View key="pager" style={[styles.pager, { opacity }]}>
          <Pager {...pagerProps} count={length} selected={index} orientation="horizontal" />
        </Animated.View>,
      );
    }

    if (children) {
      const contentStyles = [
        styles.content,
        {
          opacity,
          transform: [{ translateY }],
        },
      ];

      content.push(
        <Animated.View key="content" style={contentStyles}>
          {children}
        </Animated.View>,
      );
    }

    const backgroundStyles = [
      styles.background,
      {
        height,
        backgroundColor,
        transform: [{ translateY }, { scale }],
      },
    ];

    const wrapperStyles = [
      styles.elements,
      {
        opacity,
        transform: [{ translateX }],
      },
    ];

    return (
      <View ref={this.refRoot} onLayout={handleLayout} {...length > 1 && panResponder.panHandlers}>
        <Animated.View style={backgroundStyles}>
          <Animated.View style={wrapperStyles}>
            {elements.map((element, key) =>
              React.cloneElement(element, { key, style: [element.props.style, styles.element] }),
            )}
          </Animated.View>
        </Animated.View>
        {content}
      </View>
    );
  }

  // Enable responder if the pan mostly horizontal
  private handleMoveShouldSetPanResponderCapture = (
    _event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => {
    return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) * 2;
  };

  // Run callback when touch started
  private handlePanResponderGrant = () => {
    const { onTouchStart } = this.props;

    if (onTouchStart) {
      onTouchStart();
    }
  };

  // Move background items horizontally when panning
  private handlePanResponderMove = (
    _event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => {
    const {
      props: { background },
      state: { width, index },
    } = this;
    const { dx } = gestureState;
    const length = Array.isArray(background) ? background.length : 1;
    const reduce = (index === 0 && dx > 0) || (index === length - 1 && dx < 0) ? 3 : 1;

    this.scrollX.stopAnimation();
    this.scrollX.setOffset(-dx / width / reduce);
  };

  // Set the closest background item when touch released
  private handlePanResponderRelease = (
    _event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => {
    const {
      props: { onTouchEnd },
      state: { width, index },
    } = this;
    const { dx, vx } = gestureState;
    const relativeOffset = dx / width;

    this.scrollX.flattenOffset();

    if (relativeOffset < -0.5 || (relativeOffset < 0 && vx <= -0.3)) {
      this.setBackgroundItem(index + 1);
    } else if (relativeOffset > 0.5 || (relativeOffset > 0 && vx >= 0.3)) {
      this.setBackgroundItem(index - 1);
    } else {
      this.setBackgroundItem(index);
    }

    if (onTouchEnd) {
      onTouchEnd();
    }
  };

  // Animate to the given background item
  private setBackgroundItem(index: number) {
    const {
      props: { background, onChange },
      state: { index: prevIndex },
    } = this;
    const length = Array.isArray(background) ? background.length : 1;
    const newIndex = inRange(index, 0, length - 1);

    this.setState({ index: newIndex });

    Animated.timing(this.scrollX, {
      duration: 500,
      toValue: newIndex,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    }).start(() => {
      if (newIndex !== prevIndex && onChange) {
        onChange({ index: newIndex });
      }
    });
  }

  // Determine header width
  private handleLayout = (event: LayoutChangeEvent) => {
    this.setState({ width: event.nativeEvent.layout.width });
  };
}

const styles = StyleSheet.create({
  background: {
    overflow: 'hidden',
  },
  elements: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  element: {
    width: '100%',
    resizeMode: 'cover',
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pager: {
    left: 0,
    right: 0,
    bottom: 10,
    position: 'absolute',
  },
});

export default StretchyHeader;
