import React, { useRef, useState } from 'react';
import {
  Animated,
  ImageSourcePropType,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ScrollViewProps,
} from 'react-native';

import StretchyHeader from './StretchyHeader';

interface StretchyScrollViewProps extends ScrollViewProps {
  children: React.ReactNode;
  headerHeight: number;
  headerImages?: ImageSourcePropType[];
  headerContent?: React.ReactNode;
  headerBackgroundColor?: string;
  onChangeImage?: (event: { index: number }) => void;
}

const StretchyScrollView: React.FC<StretchyScrollViewProps> = ({
  children,
  headerImages,
  headerHeight,
  headerContent,
  headerBackgroundColor,
  onChangeImage,
  scrollEventThrottle = 16,
  ...props
}) => {
  const refScrollView = useRef<typeof Animated.ScrollView>(null);
  const [animatedValue] = useState(() => new Animated.Value(0));

  const toggleScroll = (scrollEnabled: boolean) => {
    const scrollView = refScrollView.current.getNode();

    if (scrollView) {
      props.scrollEnabled !== false && scrollView.setNativeProps({ scrollEnabled });
      !scrollEnabled && scrollView.getScrollResponder().scrollTo({ x: 0, y: 0 });
    }
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    props.onScroll && props.onScroll(event);
  };

  return (
    <Animated.ScrollView
      {...props}
      ref={refScrollView}
      scrollEventThrottle={scrollEventThrottle}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: animatedValue } } }], {
        useNativeDriver: true,
        listener: onScroll,
      })}
    >
      <StretchyHeader
        images={headerImages}
        height={headerHeight}
        backgroundColor={headerBackgroundColor}
        scrollY={animatedValue}
        onChange={onChangeImage}
        onTouchEnd={() => toggleScroll(true)}
        onTouchStart={() => toggleScroll(false)}
      >
        {headerContent}
      </StretchyHeader>
      {children}
    </Animated.ScrollView>
  );
};

export default StretchyScrollView;
