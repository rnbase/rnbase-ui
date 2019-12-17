import React from 'react';
import { Animated as AnimatedObj, Text } from 'react-native';

// Note: test renderer must be required after react-native.
import TestRenderer, { act } from 'react-test-renderer';

import { Props } from '../ActivityButton';

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

const Button = (props: any) => React.createElement('Button', props);

jest.doMock('../Button', () => Button);

/**
 * Under test
 */
const { default: ActivityButton } = jest.requireActual('../ActivityButton');

jest.mock('react-native/Libraries/Animated/src/Easing', () => ({
  in: (v: any) => `Easing.in(${v})`,
  out: (v: any) => `Easing.out(${v})`,
  exp: 'Easing.exp',
}));

jest.mock('../Button', () => 'Button');

const Animated: any = AnimatedObj;

const createElement = (props: Props) => (
  <ActivityButton {...props}>
    <Text>TEXT</Text>
  </ActivityButton>
);

const createRenderer = (props: Props) => TestRenderer.create(createElement(props));

it('should render normally', () => {
  expect(createRenderer({})).toMatchSnapshot();
});

it('should render as busy', () => {
  expect(createRenderer({ busy: true })).toMatchSnapshot();
});

it('should render as disabled', () => {
  expect(createRenderer({ disabled: true })).toMatchSnapshot();
});

it('should render with custom styles', () => {
  expect(
    createRenderer({
      style: { backgroundColor: '#000000' },
      textStyle: { color: '#ffffff' },
    }),
  ).toMatchSnapshot();
});

it('should call onPress', () => {
  const onPress = jest.fn();
  const tree = createRenderer({ onPress });

  const button = tree.root.findByType(Button);

  button.props.onPress();

  expect(onPress).toBeCalled();
});

describe('busy animation', () => {
  const start = jest.fn();

  Animated.timing.mockImplementation(() => ({ start }));

  beforeEach(() => {
    start.mockClear();
  });

  it('should not animate', () => {
    const tree = createRenderer({});

    act(() => {});

    Animated.timing.mockClear();

    act(() => {
      tree.update(createElement({ indicatorColor: '#ffffff' }));
    });

    expect(Animated.timing).not.toBeCalled();
  });

  it('should animate to busy', () => {
    const tree = createRenderer({});

    act(() => {});

    Animated.timing.mockClear();

    act(() => {
      tree.update(createElement({ busy: true }));
    });

    expect(Animated.timing).toBeCalledWith(expect.objectContaining({ _value: 0 }), {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
      easing: 'Easing.out(Easing.exp)',
    });
    expect(start).toBeCalled();
  });

  it('should animate from busy', () => {
    const tree = createRenderer({ busy: true });

    act(() => {});

    Animated.timing.mockClear();

    act(() => {
      tree.update(createElement({ busy: false }));
    });

    expect(Animated.timing).toBeCalledWith(expect.objectContaining({ _value: 1 }), {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
      easing: 'Easing.out(Easing.exp)',
    });
    expect(start).toBeCalled();
  });
});
