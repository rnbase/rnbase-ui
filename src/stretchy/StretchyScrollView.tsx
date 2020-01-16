import React from 'react';
import { Animated, ScrollViewProps } from 'react-native';

import useStretchy, { StretchyProps } from './Stretchy';

export type StretchyScrollViewProps = ScrollViewProps & StretchyProps;

const StretchyScrollView: React.FC<StretchyScrollViewProps> = ({
  children,
  headerImages = [],
  headerHeight,
  headerContent,
  headerBackgroundColor,
  onScroll,
  onChangeImage,
  scrollEventThrottle = 16,
  ...props
}) => {
  const [refScrollView, animatedValue, header] = useStretchy<typeof Animated.ScrollView>(
    {
      children: headerContent,
      images: headerImages,
      height: headerHeight,
      backgroundColor: headerBackgroundColor,
      onChange: onChangeImage,
    },
    props.scrollEnabled,
  );

  return (
    <Animated.ScrollView
      {...props}
      ref={refScrollView}
      scrollEventThrottle={scrollEventThrottle}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: animatedValue } } }], {
        listener: onScroll,
        useNativeDriver: true,
      })}
    >
      {header}
      {children}
    </Animated.ScrollView>
  );
};

export default StretchyScrollView;
