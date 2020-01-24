import React, { useCallback, useRef, useState } from 'react';
import { Animated, ScrollView, View } from 'react-native';

import StretchyHeader, { BackgroundPropType } from './StretchyHeader';
import { Props as PagerProps } from '../pager/Pager';

export interface StretchyProps {
  headerHeight: number;
  headerBackground?: BackgroundPropType;
  headerContent?: React.ReactNode;
  headerBackgroundColor?: string;
  headerShowPager?: boolean;
  headerPagerProps?: PagerProps;
  onHeaderChange?: (event: { index: number }) => void;
}

interface AnimatedComponent {
  getNode(): View & {
    getScrollResponder(): ScrollView;
  };
}

export default function useStretchy<T extends AnimatedComponent>(
  props: JSX.LibraryManagedAttributes<
    typeof StretchyHeader,
    Omit<React.ComponentProps<typeof StretchyHeader>, 'scrollY'>
  >,
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
