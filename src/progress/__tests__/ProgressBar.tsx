import React from 'react';
import { Animated as AnimatedObj } from 'react-native';

// Note: test renderer must be required after react-native.
import TestRenderer, { act } from 'react-test-renderer';

import { Props } from '../ProgressBar';

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
const { default: ProgressBar } = jest.requireActual('../ProgressBar');

jest.mock('react-native/Libraries/Animated/src/Easing', () => ({
  out: (v: any) => `Easing.out(${v})`,
  inOut: (v: any) => `Easing.inOut(${v})`,
  cubic: 'Easing.cubic',
}));

const Animated: any = AnimatedObj;

const createElement = (props: Props) => <ProgressBar {...props} />;

const createRenderer = (props: Props) => TestRenderer.create(createElement(props));

it('should render normally', () => {
  const tree = createRenderer({ value: 35 });

  act(() => {});

  expect(tree).toMatchSnapshot();
});

it('should render with custom props', () => {
  const tree = createRenderer({
    value: 35,
    height: 10,
    rounded: false,
    trackColor: 'green',
    indicatorColor: 'red',
  });

  act(() => {});

  expect(tree).toMatchSnapshot();
});

describe('animation', () => {
  const start = jest.fn();

  Animated.timing.mockImplementation(() => ({ start }));

  beforeEach(() => {
    start.mockClear();
  });

  it('should animate value change', () => {
    const oldValue = 0;
    const newValue = 50;
    const tree = createRenderer({ value: oldValue });

    act(() => {});

    Animated.timing.mockClear();

    act(() => {
      tree.update(createElement({ value: newValue }));
    });

    expect(Animated.timing).toBeCalledWith(expect.objectContaining({ _value: oldValue }), {
      toValue: newValue,
      duration: 200,
      useNativeDriver: true,
      easing: 'Easing.out(Easing.cubic)',
    });
    expect(start).toBeCalled();
  });
});