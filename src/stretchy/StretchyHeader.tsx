import React, { createRef } from 'react';
import {
  Animated,
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
}

class StretchyHeader extends React.PureComponent<StretchyHeaderProps, StretchyHeaderState> {
  static defaultProps = {
    background: [],
    backgroundColor: 'transparent',
    showPager: true,
  };

  state = {
    width: 0,
  };

  private index = 0;
  private overflow = 'visible';
  private refRoot = createRef<View>();
  private animatedIndex = new Animated.Value(this.index);

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
      handleLayout,
      panResponder,
      animatedIndex,
      state: { width },
      props: { background, height, backgroundColor, children, scrollY, showPager, pagerProps },
    } = this;
    const elements = Array.isArray(background) ? background : [background];
    const length = elements.length;

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

    const translateX = animatedIndex.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -width],
    });

    let content = [];

    if (showPager) {
      content.push(
        <Animated.View key="pager" style={[styles.pager, { opacity }]}>
          <Pager {...pagerProps} count={length} current={animatedIndex} orientation="horizontal" />
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

  private getLastIndex = () => {
    return Array.isArray(this.props.background) ? this.props.background.length - 1 : 0;
  };

  // Enable responder if the pan mostly horizontal
  private handleMoveShouldSetPanResponderCapture = (
    _event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => {
    return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
  };

  // Stop animation and run callback when touch started
  private handlePanResponderGrant = () => {
    this.animatedIndex.stopAnimation();

    if (this.props.onTouchStart) {
      this.props.onTouchStart();
    }
  };

  // Move background items horizontally when panning
  private handlePanResponderMove = (
    _event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => {
    const offset = -gestureState.dx / this.state.width;
    const indexOffset = this.index + offset;
    const resistance = indexOffset < 0 || indexOffset > this.getLastIndex() ? 3 : 1;

    this.animatedIndex.setOffset(offset / resistance);
  };

  // Set the closest background item when touch released
  private handlePanResponderRelease = (
    _event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => {
    const { dx, vx } = gestureState;
    let toIndex = this.index;

    if (Math.abs(dx) > this.state.width / 2 || Math.abs(vx) >= 0.3) {
      toIndex = toIndex - Math.sign(dx);
    }

    this.animatedIndex.flattenOffset();
    this.moveToIndex(toIndex, -vx);

    if (this.props.onTouchEnd) {
      this.props.onTouchEnd();
    }
  };

  // Animate to the given background item
  private moveToIndex(index: number, velocity: number) {
    const { index: prevIndex } = this;
    const newIndex = inRange(index, 0, this.getLastIndex());

    Animated.spring(this.animatedIndex, {
      velocity,
      mass: 0.6,
      damping: 500,
      stiffness: 100,
      toValue: newIndex,
      overshootClamping: true,
      useNativeDriver: true,
    }).start(() => {
      this.index = newIndex;

      if (newIndex !== prevIndex && this.props.onChange) {
        this.props.onChange({ index: newIndex });
      }
    });
  }

  // Determine header width
  private handleLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    this.setState({ width: nativeEvent.layout.width });
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
