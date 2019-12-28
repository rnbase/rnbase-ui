import React from 'react';
import { Animated as AnimatedObj, Text } from 'react-native';

// Note: test renderer must be required after react-native.
import TestRenderer, { act } from 'react-test-renderer';

import { Props } from '../Button';

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

const TouchableOpacity = (props: any) => React.createElement('TouchableOpacity', props);

jest.doMock('react-native/Libraries/Components/Touchable/TouchableOpacity', () => TouchableOpacity);

/**
 * Under test
 */
const { default: Button } = jest.requireActual('../Button');

jest.mock('react-native/Libraries/Animated/src/Easing', () => ({
  in: (v: any) => `Easing.in(${v})`,
  out: (v: any) => `Easing.out(${v})`,
  exp: 'Easing.exp',
}));

const Animated: any = AnimatedObj;

const createElement = (props: Props) => <Button {...props} />;

const createRenderer = (props: Props) => TestRenderer.create(createElement(props));

it('should render text only', () => {
  expect(createRenderer({ text: 'Button' })).toMatchSnapshot();
});

it('should render image only', () => {
  expect(createRenderer({ imageSource: { uri: 'image.png' } })).toMatchSnapshot();
});

it('should render as disabled', () => {
  expect(
    createRenderer({
      text: 'Button',
      imageSource: { uri: 'image.png' },
      disabled: true,
    }),
  ).toMatchSnapshot();
});

it('should render image at the left', () => {
  expect(
    createRenderer({
      text: 'Right Text',
      imageSource: { uri: 'left.png' },
      imageAlignment: 'left',
    }),
  ).toMatchSnapshot();
});

it('should render image at the right', () => {
  expect(
    createRenderer({
      text: 'Left Text',
      imageSource: { uri: 'right.png' },
      imageAlignment: 'right',
    }),
  ).toMatchSnapshot();
});

it('should render with custom styles', () => {
  expect(
    createRenderer({
      text: 'Button',
      imageSource: { uri: 'image.png' },
      style: { backgroundColor: 'red' },
      textStyle: { color: 'green' },
      imageStyle: { tintColor: 'blue' },
    }),
  ).toMatchSnapshot();
});

it('should render with custom content', () => {
  expect(
    createRenderer({
      children: <Text>CUSTOM CONTENT</Text>,
    }),
  ).toMatchSnapshot();
});

it('should call onPress', () => {
  const onPress = jest.fn();
  const tree = createRenderer({ onPress });
  const button = tree.root.findByType(TouchableOpacity);

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
      tree.update(createElement({ busyIndicatorColor: '#ffffff' }));
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
      duration: 500,
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
      duration: 500,
      useNativeDriver: true,
      easing: 'Easing.out(Easing.exp)',
    });
    expect(start).toBeCalled();
  });
});
