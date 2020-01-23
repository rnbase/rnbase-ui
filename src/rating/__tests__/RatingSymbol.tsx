import React from 'react';
import { Animated as AnimatedObj } from 'react-native';

// Note: test renderer must be required after react-native.
import TestRenderer, { act } from 'react-test-renderer';

import { Props } from '../RatingSymbol';

import { RatingContext, RatingValue } from '../RatingContext';

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

let ratingValue: RatingValue;

beforeEach(() => {
  ratingValue = new RatingValue();
});

const createElement = (props: Partial<Props>) => (
  <RatingContext.Provider value={ratingValue}>
    <RatingSymbol value={1} {...props}>
      {'\u2605'}
    </RatingSymbol>
  </RatingContext.Provider>
);

const createRenderer = (props: Partial<Props>) => TestRenderer.create(createElement(props));

it('should render normally', () => {
  const tree = createRenderer({});

  act(() => {});

  expect(tree).toMatchSnapshot();
});

it('should render scaled', () => {
  ratingValue.value = 1;

  const tree = createRenderer({ value: ratingValue.value });

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
    const value = ratingValue.value + 1;

    createRenderer({ animate: true, value });

    act(() => {});

    Animated.spring.mockClear();

    ratingValue.value = value;

    expect(Animated.spring).toBeCalledWith(expect.objectContaining({ _value: 1 }), {
      toValue: 1.25,
      friction: 3,
      tension: 50,
      useNativeDriver: true,
    });
    expect(start).toBeCalled();
  });

  it('should animate from selected', () => {
    createRenderer({ animate: true, value: ratingValue.value });

    act(() => {});

    Animated.spring.mockClear();

    ratingValue.value++;

    expect(Animated.spring).toBeCalledWith(expect.objectContaining({ _value: 1.25 }), {
      toValue: 1,
      friction: 3,
      tension: 50,
      useNativeDriver: true,
    });
    expect(start).toBeCalled();
  });
});
