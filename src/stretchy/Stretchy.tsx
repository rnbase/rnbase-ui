import React, { useCallback, useRef, useState } from 'react';
import { Animated, ImageSourcePropType, ScrollView, View } from 'react-native';

import StretchyHeader, { StretchyHeaderProps } from './StretchyHeader';

export interface StretchyProps {
  headerHeight: number;
  headerImages?: ImageSourcePropType[];
  headerContent?: React.ReactNode;
  headerBackgroundColor?: string;
  onChangeImage?: (event: { index: number }) => void;
}

interface AnimatedComponent {
  getNode(): View & {
    getScrollResponder(): ScrollView;
  };
}

export default function useStretchy<T extends AnimatedComponent>(
  props: Omit<StretchyHeaderProps, 'scrollY'>,
  scrollEnabled?: boolean,
): [React.RefObject<T>, Animated.Value, React.ReactElement<StretchyHeader>] {
  const refAnimatedComponent = useRef<T>(null);

  const toggleScroll = useCallback(
    (enabled: boolean) => {
      const { current: animatedComponent } = refAnimatedComponent;

      if (animatedComponent) {
        const node = animatedComponent.getNode();

        if (scrollEnabled !== false) {
          node.setNativeProps({ scrollEnabled: enabled });
        }

        if (!enabled) {
          node.getScrollResponder().scrollTo({ x: 0, y: 0 });
        }
      }
    },
    [scrollEnabled],
  );

  const [animatedValue] = useState(() => new Animated.Value(0));

  return [
    refAnimatedComponent,
    animatedValue,
    <StretchyHeader
      {...props}
      scrollY={animatedValue}
      onTouchStart={useCallback(() => toggleScroll(false), [toggleScroll])}
      onTouchEnd={useCallback(() => toggleScroll(true), [toggleScroll])}
    />,
  ];
}
