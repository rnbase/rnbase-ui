import React from 'react';
import {
  Animated,
  Easing,
  Image,
  ImageSourcePropType,
  PanResponder,
  PanResponderInstance,
  PanResponderGestureState,
  LayoutChangeEvent,
  GestureResponderEvent,
  StyleSheet,
  View,
} from 'react-native';

interface StretchyHeaderProps {
  children: React.ReactNode;
  images: ImageSourcePropType[];
  imageHeight: number;
  foreground?: React.ReactNode;
  onImageChanged?: (event: { index: number }) => void;
}

interface StretchyHeaderState {
  imageWidth: number;
}

class StretchyHeader extends React.Component<StretchyHeaderProps, StretchyHeaderState> {
  static defaultProps = {
    images: [],
    imageHeight: 260,
  };

  public state = {
    imageWidth: 0,
  };

  private _index = 0;
  private _scrollEnabled = true;
  private _scrollView = React.createRef<typeof Animated.ScrollView>();
  private _scrollX = new Animated.Value(0);
  private _scrollY = new Animated.Value(0);

  private _panResponder: PanResponderInstance;

  constructor(props: StretchyHeaderProps) {
    super(props);

    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: this._onMoveShouldSetPanResponderCapture,
      onPanResponderGrant: this._onPanResponderGrant,
      onPanResponderMove: this._onPanResponderMove,
      onPanResponderRelease: this._onPanResponderRelease,
      onPanResponderTerminate: this._onPanResponderRelease,
    });
  }

  componentDidMount() {
    this._raiseImageChanged();
  }

  render() {
    return (
      <Animated.ScrollView
        ref={this._scrollView}
        style={styles.root}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustContentInsets={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this._scrollY } } }], {
          useNativeDriver: true,
        })}
      >
        {this._renderHeader()}
        {this.props.children}
      </Animated.ScrollView>
    );
  }

  // Claim responder if it's a horizontal pan
  _onMoveShouldSetPanResponderCapture = (
    _event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => {
    return Math.abs(gestureState.dx) * 2 >= Math.abs(gestureState.dy);
  };

  // Disable scroll and scroll to top
  _onPanResponderGrant = () => {
    this._toggleScroll(false);

    const scrollView = this._scrollView.current.getNode();

    if (scrollView) {
      scrollView.getScrollResponder().scrollTo({ x: 0, y: 0 });
    }
  };

  // Dragging, continuously move the view
  _onPanResponderMove = (_event: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    const { dx } = gestureState;
    const {
      _index: index,
      props: { images },
      state: { imageWidth },
    } = this;
    const reduce = (index === 0 && dx > 0) || (index === images.length - 1 && dx < 0) ? 3 : 1;

    this._scrollX.setValue(-dx / imageWidth / reduce + index);
  };

  // Touch is released, set the closest view
  _onPanResponderRelease = (
    _event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => {
    const { dx, vx } = gestureState;
    const {
      _index: index,
      state: { imageWidth },
    } = this;
    const relativeGestureDistance = dx / imageWidth;

    if (relativeGestureDistance < -0.5 || (relativeGestureDistance < 0 && vx <= -0.5)) {
      this._setView(index + 1);
    } else if (relativeGestureDistance > 0.5 || (relativeGestureDistance > 0 && vx >= 0.5)) {
      this._setView(index - 1);
    } else {
      this._setView(index);
    }

    this._toggleScroll(true);
  };

  // Toggle scrollEnabled for the main ScrollView
  _toggleScroll(scrollEnabled: boolean) {
    if (this._scrollEnabled !== scrollEnabled) {
      this._scrollEnabled = scrollEnabled;

      const scrollView = this._scrollView.current;

      if (scrollView) {
        scrollView.setNativeProps({ scrollEnabled });
      }
    }
  }

  // Determine header width
  _onHeaderLayout = (event: LayoutChangeEvent) => {
    this.setState({
      imageWidth: event.nativeEvent.layout.width,
    });
  };

  // Spring animation to the given view
  _setView(index: number) {
    const { images } = this.props;

    this._index = Math.max(0, Math.min(index, images.length - 1));

    Animated.timing(this._scrollX, {
      toValue: this._index,
      useNativeDriver: true,
      easing: Easing.out(Easing.exp),
    }).start(this._raiseImageChanged);
  }

  // Render stretchy image header
  _renderHeader() {
    const { imageWidth } = this.state;
    const { images, imageHeight, foreground } = this.props;
    const scale = this._scrollY.interpolate({
      inputRange: [-imageHeight, 0, imageHeight],
      outputRange: [2, 1, 1],
    });
    const translateX = this._scrollX.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -imageWidth],
    });
    const translateY = this._scrollY.interpolate({
      inputRange: [-imageHeight, 0, imageHeight],
      outputRange: [-imageHeight / 2, 0, imageHeight / 2],
    });
    const opacity = this._scrollY.interpolate({
      inputRange: [-imageHeight, 0, imageHeight],
      outputRange: [1, 1, 0],
    });

    return (
      <View {...this._panResponder.panHandlers} onLayout={this._onHeaderLayout}>
        <Animated.View
          style={[
            styles.imageView,
            {
              height: imageHeight,
              transform: [{ translateY }, { scale }],
            },
          ]}
        >
          <Animated.View
            style={[
              styles.imageContainer,
              {
                opacity,
                transform: [{ translateX }],
              },
            ]}
          >
            {images.map((image, index) => (
              <Image key={index} style={styles.image} source={image} />
            ))}
          </Animated.View>
        </Animated.View>
        {foreground && (
          <Animated.View
            style={[
              styles.foregroundContainer,
              {
                opacity,
                transform: [{ translateY }],
              },
            ]}
          >
            {foreground}
          </Animated.View>
        )}
      </View>
    );
  }

  _raiseImageChanged = () => {
    this.props.onImageChanged && this.props.onImageChanged({ index: this._index });
  };
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  imageView: {
    overflow: 'hidden',
    backgroundColor: '#30303C',
  },
  imageContainer: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  image: {
    width: '100%',
    resizeMode: 'cover',
  },
  foregroundContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StretchyHeader;
