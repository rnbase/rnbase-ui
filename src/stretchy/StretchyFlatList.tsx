import React from 'react';
import { Animated, FlatListProps } from 'react-native';

import useStretchy, { StretchyProps } from './Stretchy';

export type StretchyFlatListProps<ItemT> = FlatListProps<ItemT> & StretchyProps;

function StretchyFlatList<ItemT>({
  headerBackground,
  headerHeight,
  headerContent,
  headerBackgroundColor,
  headerShowPager,
  headerPagerProps,
  onHeaderChange,
  scrollEventThrottle = 16,
  onScroll,
  ...props
}: StretchyFlatListProps<ItemT>) {
  const [refFlatList, animatedValue, header] = useStretchy<typeof Animated.FlatList>(
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
    <Animated.FlatList
      {...props}
      ref={refFlatList}
      scrollEventThrottle={scrollEventThrottle}
      ListHeaderComponent={header}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: animatedValue } } }], {
        listener: onScroll,
        useNativeDriver: true,
      })}
    />
  );
}

export default StretchyFlatList;
