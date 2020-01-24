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

export type BackgroundPropType = React.ReactElement | React.ReactElement[];

export interface StretchyHeaderProps {
  height: number;
  scrollY: Animated.Value;
  background: BackgroundPropType;
  backgroundColor?: string;
  children?: React.ReactNode;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
  onChange?: (event: { index: number }) => void;
}

interface StretchyHeaderState {
  width: number;
  overflow?: 'visible' | 'hidden';
}

class StretchyHeader extends React.PureComponent<StretchyHeaderProps, StretchyHeaderState> {
  static defaultProps = {
    background: [],
    backgroundColor: 'transparent',
  };

  state = {
    width: 0,
    overflow: undefined,
  };

  private index = 0;
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
      state: { width, overflow },
      props: { background, height, backgroundColor, children, scrollY },
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

    return (
      <View
        style={{ overflow }}
        onLayout={onLayout}
        {...elements.length > 1 && panResponder.panHandlers}
      >
        <Animated.View
          style={[
            styles.background,
            {
              height,
              backgroundColor,
              transform: [{ translateY }, { scale }],
            },
          ]}
        >
          <Animated.View
            style={[
              styles.elements,
              {
                opacity,
                transform: [{ translateX }],
              },
            ]}
          >
            {elements.map((element, index) =>
              React.cloneElement(element, {
                key: index,
                style: {
                  ...element.props.style,
                  ...styles.element,
                },
              }),
            )}
          </Animated.View>
        </Animated.View>
        {children && (
          <Animated.View
            style={[
              styles.content,
              {
                opacity,
                transform: [{ translateY }],
              },
            ]}
          >
            {children}
          </Animated.View>
        )}
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
      index,
      props: { background },
      state: { width },
    } = this;
    const { dx } = gestureState;
    const length = Array.isArray(background) ? background.length : 1;
    const reduce = (index === 0 && dx > 0) || (index === length - 1 && dx < 0) ? 3 : 1;

    this.scrollX.setValue(-dx / width / reduce + index);
  };

  // Set the closest image when touch released
  private onRelease = (_event: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    const {
      index,
      props: { onTouchEnd },
      state: { width },
    } = this;
    const { dx, vx } = gestureState;
    const relativeDistance = dx / width;

    if (relativeDistance < -0.5 || (relativeDistance < 0 && vx <= -0.5)) {
      this.setImage(index + 1);
    } else if (relativeDistance > 0.5 || (relativeDistance > 0 && vx >= 0.5)) {
      this.setImage(index - 1);
    } else {
      this.setImage(index);
    }

    if (onTouchEnd) {
      onTouchEnd();
    }
  };

  // Animate to the given image
  private setImage(index: number) {
    const {
      index: prevIndex,
      props: { background, onChange },
    } = this;
    const length = Array.isArray(background) ? background.length : 1;

    this.index = Math.max(0, Math.min(index, length - 1));

    Animated.timing(this.scrollX, {
      toValue: this.index,
      useNativeDriver: true,
      easing: Easing.out(Easing.exp),
    }).start(() => {
      if (this.index !== prevIndex && onChange) {
        onChange({ index: this.index });
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
});

export default StretchyHeader;
