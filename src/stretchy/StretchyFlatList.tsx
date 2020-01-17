import React from 'react';
import { Animated, FlatListProps, Image } from 'react-native';

import useStretchy, { StretchyProps } from './Stretchy';

export type StretchyFlatListProps<ItemT> = FlatListProps<ItemT> & StretchyProps;

function StretchyFlatList<ItemT>({
  headerImages = [],
  headerHeight,
  headerContent,
  headerBackgroundColor,
  onScroll,
  onChangeImage,
  scrollEventThrottle = 16,
  ...props
}: StretchyFlatListProps<ItemT>) {
  const [refFlatList, animatedValue, header] = useStretchy<typeof Animated.FlatList>(
    {
      children: headerContent,
      background: headerImages.map(source => <Image source={source} />),
      height: headerHeight,
      backgroundColor: headerBackgroundColor,
      onChange: onChangeImage,
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
