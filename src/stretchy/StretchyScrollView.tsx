import React from 'react';
import { Animated, ScrollViewProps } from 'react-native';

import useStretchy, { StretchyProps } from './Stretchy';

export type StretchyScrollViewProps = ScrollViewProps & StretchyProps;

const StretchyScrollView: React.FC<StretchyScrollViewProps> = ({
  headerBackground,
  headerHeight,
  headerContent,
  headerBackgroundColor,
  headerShowPager,
  headerPagerProps,
  onHeaderChange,
  children,
  scrollEventThrottle = 16,
  onScroll,
  ...props
}) => {
  const [refScrollView, animatedValue, header] = useStretchy<typeof Animated.ScrollView>(
    {
      background: headerBackground,
      height: headerHeight,
      children: headerContent,
      backgroundColor: headerBackgroundColor,
      showPager: headerShowPager,
      pagerProps: headerPagerProps,
      onChange: onHeaderChange,
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
