import React from 'react';
import { Animated as AnimatedObj } from 'react-native';

// Note: test renderer must be required after react-native.
import TestRenderer, { act } from 'react-test-renderer';

import { Props } from '../ProgressBar';

jest.doMock('react-native/Libraries/Animated/src/Animated', () => {
  const Animated = jest.requireActual('react-native/Libraries/Animated/src/Animated');

  return {
    ...Animated,
    loop: jest.fn((value: any) => value),
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

const createElement = (props: Partial<Props>) => <ProgressBar {...props} />;

const createRenderer = (props: Partial<Props>) => TestRenderer.create(createElement(props));

it('should render normally', () => {
  const tree = createRenderer({ value: 35 });

  act(() => {
    const root = tree.root.findByProps({ testID: 'root' });
    const event = { nativeEvent: { layout: { width: 100 } } };

    root.props.onLayout(event);
  });

  expect(tree).toMatchSnapshot();
});

it('should render as infinite progress', () => {
  const tree = createRenderer({ value: undefined });

  act(() => {
    const root = tree.root.findByProps({ testID: 'root' });
    const event = { nativeEvent: { layout: { width: 100 } } };

    root.props.onLayout(event);
  });

  expect(tree).toMatchSnapshot();
});

it('should render with custom props', () => {
  const tree = createRenderer({
    value: 35,
    size: 10,
    cornerRadius: 0,
    style: { backgroundColor: 'green' },
    indicatorStyle: { backgroundColor: 'red' },
  });

  act(() => {});

  expect(tree).toMatchSnapshot();
});

describe('animation', () => {
  const animated = { start: jest.fn() };
  const animatedLoop = { start: jest.fn() };

  Animated.timing.mockImplementation(() => animated);
  Animated.loop.mockImplementation(() => animatedLoop);

  beforeEach(() => {
    animated.start.mockClear();
    animatedLoop.start.mockClear();
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
    expect(animated.start).toBeCalled();
  });

  it('should animate to indeterminate', () => {
    const tree = createRenderer({ value: 50 });

    act(() => {});

    Animated.timing.mockClear();

    act(() => {
      tree.update(createElement({ value: undefined }));
    });

    expect(Animated.timing).toBeCalledWith(expect.objectContaining({ _value: 0 }), {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
      easing: 'Easing.inOut(Easing.cubic)',
    });
    expect(Animated.loop).toBeCalledWith(animated);
    expect(animatedLoop.start).toBeCalled();
  });
});
