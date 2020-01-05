import React from 'react';
import { Animated as AnimatedObj } from 'react-native';

// Note: test renderer must be required after react-native.
import TestRenderer, { act } from 'react-test-renderer';

import { Props } from '../Badge';

jest.doMock('react-native/Libraries/Animated/src/Animated', () => {
  const Animated = jest.requireActual('react-native/Libraries/Animated/src/Animated');

  return {
    ...Animated,
    timing: jest.fn((value: any, { toValue }: any) => {
      value.setValue(toValue);

      return {
        start: jest.fn(),
      };
    }),
  };
});

/**
 * Under test
 */
const { default: Badge } = jest.requireActual('../Badge');

jest.mock('react-native/Libraries/Animated/src/Easing', () => ({
  in: (v: any) => `Easing.in(${v})`,
  out: (v: any) => `Easing.out(${v})`,
  elastic: (v: any) => `Easing.elastic(${v})`,
}));

const Animated: any = AnimatedObj;

const createElement = (props: Props) => <Badge {...props} />;

const createRenderer = (props: Props) => TestRenderer.create(createElement(props));

it('should render normally', () => {
  expect(createRenderer({ value: 12 })).toMatchSnapshot();
});

it('should render without number', () => {
  expect(createRenderer({ value: true })).toMatchSnapshot();
});

it('should render when greather than limit', () => {
  expect(createRenderer({ value: 500, limit: 99 })).toMatchSnapshot();
});

it('should render with custom props', () => {
  expect(createRenderer({ value: 12, size: 16, rounded: false, color: 'red' })).toMatchSnapshot();
});

it('should not render when value = 0', () => {
  expect(createRenderer({ value: 0 })).toMatchSnapshot();
});

it('should not render when value = undefined', () => {
  expect(createRenderer({})).toMatchSnapshot();
});

describe('animation', () => {
  const start = jest.fn();

  Animated.timing.mockImplementation(() => ({ start }));

  beforeEach(() => {
    start.mockClear();
  });

  it('should not animate', () => {
    const tree = createRenderer({ value: 1 });

    act(() => {});

    Animated.timing.mockClear();

    act(() => {
      tree.update(createElement({ value: 2 }));
    });

    expect(Animated.timing).not.toBeCalled();
  });

  it('should animate appearance', () => {
    const tree = createRenderer({ value: 0 });

    act(() => {});

    Animated.timing.mockClear();

    act(() => {
      tree.update(createElement({ value: 1 }));
    });

    expect(Animated.timing).toBeCalledWith(expect.objectContaining({ _value: 0 }), {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: 'Easing.in(Easing.elastic(1))',
    });
    expect(start).toBeCalled();
  });
});
