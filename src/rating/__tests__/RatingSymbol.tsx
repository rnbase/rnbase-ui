import React from 'react';
import { Animated as AnimatedObj } from 'react-native';

// Note: test renderer must be required after react-native.
import TestRenderer, { act } from 'react-test-renderer';

import { Props } from '../RatingSymbol';

jest.doMock('react-native/Libraries/Animated/src/Animated', () => {
  const Animated = jest.requireActual('react-native/Libraries/Animated/src/Animated');

  return {
    ...Animated,
    spring: jest.fn((value: any, { toValue }: any) => {
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
const { default: RatingSymbol } = jest.requireActual('../RatingSymbol');

const Animated: any = AnimatedObj;

const createElement = (props: Partial<Props>) => <RatingSymbol {...props} />;

const createRenderer = (props: Partial<Props>) => TestRenderer.create(createElement(props));

it('should render normally', () => {
  const tree = createRenderer({ children: '\u2605' });

  act(() => {});

  expect(tree).toMatchSnapshot();
});

it('should render with custom style', () => {
  const tree = createRenderer({
    children: '\u2605',
    style: { color: 'blue' },
  });

  act(() => {});

  expect(tree).toMatchSnapshot();
});

describe('animation', () => {
  const start = jest.fn();

  Animated.spring.mockImplementation(() => ({ start }));

  beforeEach(() => {
    start.mockClear();
  });

  it('should animate to selected', () => {
    const tree = createRenderer({ children: '\u2605' });

    act(() => {});

    Animated.spring.mockClear();

    act(() => {
      tree.update(createElement({ children: '\u2605', selected: true }));
    });

    expect(Animated.spring).toBeCalledWith(expect.objectContaining({ _value: 1 }), {
      toValue: 1.25,
      friction: 3,
      tension: 50,
      useNativeDriver: true,
    });
    expect(start).toBeCalled();
  });

  it('should animate from selected', () => {
    const tree = createRenderer({ children: '\u2605', selected: true });

    act(() => {});

    Animated.spring.mockClear();

    act(() => {
      tree.update(createElement({ children: '\u2605' }));
    });

    expect(Animated.spring).toBeCalledWith(expect.objectContaining({ _value: 1.25 }), {
      toValue: 1,
      friction: 3,
      tension: 50,
      useNativeDriver: true,
    });
    expect(start).toBeCalled();
  });
});
