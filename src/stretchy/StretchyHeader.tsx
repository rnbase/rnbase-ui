import React from 'react';
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
  overflow?: 'visible' | 'hidden';
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
    overflow: undefined,
  };

  private scrollX = new Animated.Value(0);

  private scrollListener: string | undefined;
  private panResponder: PanResponderInstance;

  constructor(props: StretchyHeaderProps) {
    super(props);

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: this.onMoveCapture,
      onPanResponderGrant: this.onGrant,
      onPanResponderMove: this.onMove,
      onPanResponderRelease: this.onRelease,
      onPanResponderTerminate: this.onRelease,
    });
  }

  componentDidMount = () => {
    this.scrollListener = this.props.scrollY.addListener(({ value }) => {
      const overflow = value > 0 ? 'hidden' : 'visible';

      if (overflow !== this.state.overflow) {
        this.setState({ overflow });
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
      onLayout,
      panResponder,
      state: { width, index, overflow },
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
      <View style={{ overflow }} onLayout={onLayout} {...length > 1 && panResponder.panHandlers}>
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

  // Claim responder if it's a horizontal pan
  private onMoveCapture = (
    _event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => {
    return Math.abs(gestureState.dx) * 2 >= Math.abs(gestureState.dy);
  };

  // Run touch started callback
  private onGrant = () => {
    const { onTouchStart } = this.props;

    if (onTouchStart) {
      onTouchStart();
    }
  };

  // Move images horizontally when panning
  private onMove = (_event: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    const {
      props: { background },
      state: { width, index },
    } = this;
    const { dx } = gestureState;
    const length = Array.isArray(background) ? background.length : 1;
    const reduce = (index === 0 && dx > 0) || (index === length - 1 && dx < 0) ? 3 : 1;

    this.scrollX.setValue(-dx / width / reduce + index);
  };

  // Set the closest image when touch released
  private onRelease = (_event: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    const {
      props: { onTouchEnd },
      state: { width, index },
    } = this;
    const { dx, vx } = gestureState;
    const relativeDistance = dx / width;

    if (relativeDistance < -0.5 || (relativeDistance < 0 && vx <= -0.5)) {
      this.setBackgroundItem(index + 1);
    } else if (relativeDistance > 0.5 || (relativeDistance > 0 && vx >= 0.5)) {
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
      toValue: newIndex,
      useNativeDriver: true,
      easing: Easing.out(Easing.exp),
    }).start(() => {
      if (newIndex !== prevIndex && onChange) {
        onChange({ index: newIndex });
      }
    });
  }

  // Determine header width
  private onLayout = (event: LayoutChangeEvent) => {
    this.setState({
      width: event.nativeEvent.layout.width,
    });
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
