import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Easing,
  Image,
  PanResponder,
  PanResponderInstance,
  PanResponderGestureState,
  LayoutChangeEvent,
  GestureResponderEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

interface StretchyHeaderProps {
  children: React.ReactNode;
  images: string[];
  imageHeight: number;
  foreground?: React.ReactNode;
  onImageChanged?: (event: { index: number }) => void;
}

interface StretchyHeaderState {
  imageWidth: number;
  scrollViewHeight: number;
  scrollX: Animated.Value;
  scrollY: Animated.Value;
}

class StretchyHeader extends React.Component<StretchyHeaderProps, StretchyHeaderState> {
  static propTypes = {
    children: PropTypes.any.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    imageHeight: PropTypes.number.isRequired,
    onImageChanged: PropTypes.func,
  };

  static defaultProps = {
    images: [],
    imageHeight: 260,
  };

  private _index: number;
  private _scrollEnabled: boolean;
  private _scrollContentHeight: number;
  private _panResponder: PanResponderInstance;
  private _scrollView: React.RefObject<ScrollView>;

  constructor(props: StretchyHeaderProps) {
    super(props);

    this.state = {
      imageWidth: 0,
      scrollViewHeight: 0,
      scrollX: new Animated.Value(0),
      scrollY: new Animated.Value(0),
    };

    this._index = 0;
    this._scrollEnabled = true;
    this._scrollContentHeight = 0;
    this._scrollView = React.createRef<ScrollView>();
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
    const { children, imageHeight } = this.props;

    return (
      <View style={styles.wrapper}>
        <ScrollView
          style={styles.scrollView}
          ref={this._scrollView}
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="never"
          showsVerticalScrollIndicator={false}
          onScroll={this._onScroll}
          onLayout={this._onScrollViewLayout}
          onContentSizeChange={this._onContentSizeChange}
          scrollEventThrottle={1}
        >
          <View {...this._panResponder.panHandlers} style={[styles.view, { height: imageHeight }]}>
            {this._renderHeader()}
          </View>
          {children}
        </ScrollView>
      </View>
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

    const scrollView = this._scrollView.current;

    if (scrollView) {
      scrollView./* getScrollResponder() */ scrollTo({ x: 0, y: 0 });
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
    const reduce = (index === 0 && dx > 0) || (index === images.length - 1 && dx < 0) ? 2 : 1;

    this.state.scrollX.setValue(-dx / imageWidth / reduce + index);
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

      const scrollView: any = this._scrollView.current;

      if (scrollView) {
        (scrollView as View).setNativeProps({ scrollEnabled });
      }
    }
  }

  // Determine header width
  _onHeaderLayout = (event: LayoutChangeEvent) => {
    this.setState({
      imageWidth: event.nativeEvent.layout.width,
    });
  };

  // Optimizes state.scrollY update since we don't need
  // to update the value when user has scrolled below the image
  _onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { scrollY } = this.state;
    const { imageHeight } = this.props;
    const {
      nativeEvent: {
        contentOffset: { y: offsetY },
      },
    } = event;

    if (offsetY <= imageHeight /* || scrollY._value <= imageHeight * 2 */) {
      scrollY.setValue(offsetY);
    }
  };

  // Spring animation to the given view
  _setView(index: number) {
    const { images } = this.props;

    this._index = Math.max(0, Math.min(index, images.length - 1));

    Animated.timing(this.state.scrollX, {
      toValue: this._index,
      easing: Easing.out(Easing.exp),
    }).start(this._raiseImageChanged);
  }

  // Determine scroll view height
  _onScrollViewLayout = (event: LayoutChangeEvent) => {
    this.setState({ scrollViewHeight: event.nativeEvent.layout.height });
  };

  // Determine content height
  _onContentSizeChange = (_width: number, height: number) => {
    this._scrollContentHeight = height;
  };

  // Render stretchy image header
  _renderHeader() {
    const { scrollX, scrollY, imageWidth } = this.state;
    const { images, imageHeight, foreground } = this.props;
    const width = imageWidth * images.length;
    const scale = scrollY.interpolate({
      inputRange: [-imageHeight, 0, imageHeight],
      outputRange: [2, 1, 1],
    });
    const translateX = scrollX.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -imageWidth],
    });
    const translateY = scrollY.interpolate({
      inputRange: [-imageHeight, 0, imageHeight],
      outputRange: [-imageHeight / 2, 0, imageHeight / 2],
    });
    const opacity = scrollY.interpolate({
      inputRange: [-imageHeight, 0, imageHeight],
      outputRange: [1, 1, 0],
    });

    return (
      <>
        <Animated.View
          onLayout={this._onHeaderLayout}
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
                width,
                opacity,
                transform: [{ translateX }],
              },
            ]}
          >
            {images.map((uri, index) => (
              <Image key={index} style={styles.image} source={{ uri }} />
            ))}
          </Animated.View>
        </Animated.View>
        {foreground && (
          <Animated.View
            style={[
              styles.foregroundContainer,
              {
                height: imageHeight,
                opacity,
                transform: [{ translateY }],
              },
            ]}
          >
            {foreground}
          </Animated.View>
        )}
      </>
    );
  }

  _raiseImageChanged = () => {
    this.props.onImageChanged && this.props.onImageChanged({ index: this._index });
  };
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  imageView: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    backgroundColor: '#30303C',
  },
  foregroundContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  view: {
    backgroundColor: 'transparent',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  footer: {
    left: 0,
    right: 0,
    position: 'absolute',
  },
});

export default StretchyHeader;
