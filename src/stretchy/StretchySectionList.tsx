import React from 'react';
import { Animated, SectionListProps } from 'react-native';

import useStretchy, { StretchyProps } from './Stretchy';

export type StretchySectionListProps<ItemT> = SectionListProps<ItemT> & StretchyProps;

function StretchySectionList<ItemT>({
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
}: StretchySectionListProps<ItemT>) {
  const [refSectionList, animatedValue, header] = useStretchy<typeof Animated.SectionList>(
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
    <Animated.SectionList
      {...props}
      ref={refSectionList}
      scrollEventThrottle={scrollEventThrottle}
      ListHeaderComponent={header}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: animatedValue } } }], {
        listener: onScroll,
        useNativeDriver: true,
      })}
    />
  );
}

export default StretchySectionList;
