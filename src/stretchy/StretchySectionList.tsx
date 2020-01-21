import React from 'react';
import { Animated, SectionListProps } from 'react-native';

import useStretchy, { StretchyProps } from './Stretchy';

export type StretchySectionListProps<ItemT> = SectionListProps<ItemT> & StretchyProps;

function StretchySectionList<ItemT>({
  headerBackground,
  headerHeight,
  headerContent,
  headerBackgroundColor,
  onScroll,
  onChangeImage,
  scrollEventThrottle = 16,
  ...props
}: StretchySectionListProps<ItemT>) {
  const [refSectionList, animatedValue, header] = useStretchy<typeof Animated.SectionList>(
    {
      children: headerContent,
      background: headerBackground,
      height: headerHeight,
      backgroundColor: headerBackgroundColor,
      onChange: onChangeImage,
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
