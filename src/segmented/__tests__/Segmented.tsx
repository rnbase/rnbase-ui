import React from 'react';
import { Animated as AnimatedObj, Text } from 'react-native';

// Note: test renderer must be required after react-native.
import TestRenderer, { act } from 'react-test-renderer';

import { Props } from '../Segmented';

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
const { default: Segmented } = jest.requireActual('../Segmented');

jest.mock('react-native/Libraries/Animated/src/Easing', () => ({
  in: (v: any) => `Easing.in(${v})`,
  out: (v: any) => `Easing.out(${v})`,
  exp: 'Easing.exp',
}));

const Animated: any = AnimatedObj;

const onChange = jest.fn();
const buttons = [
  {
    text: 'one',
  },
  {
    text: 'two',
  },
];

const createElement = (props: Props) => <Segmented {...props} />;

const createRenderer = (props: Props) => TestRenderer.create(createElement(props));

it('should render normally', () => {
  expect(createRenderer({ buttons, onChange })).toMatchSnapshot();
});

it('should render icons', () => {
  expect(
    createRenderer({
      buttons: [
        {
          iconSource: { uri: 'icon-one.png' },
        },
        {
          iconSource: { uri: 'icon-two.png' },
        },
      ],
      onChange,
    }),
  ).toMatchSnapshot();
});

it('should render components', () => {
  expect(
    createRenderer({
      buttons: [
        {
          component: <Text>ONE</Text>,
        },
        {
          component: <Text>TWO</Text>,
        },
      ],
      onChange,
    }),
  ).toMatchSnapshot();
});

it('should render as disabled', () => {
  expect(
    createRenderer({
      buttons: [
        {
          text: 'one',
          iconSource: { uri: 'icon-one.png' },
        },
        {
          text: 'two',
          iconSource: { uri: 'icon-two.png' },
        },
      ],
      onChange,
      disabled: true,
    }),
  ).toMatchSnapshot();
});

it('should call onChange', () => {
  const tree = createRenderer({ buttons, onChange });

  const button = tree.root.findAllByType(TouchableOpacity)[0];

  button.props.onPress();

  expect(onChange).toBeCalled();
});

describe('selected button animation', () => {
  const start = jest.fn();

  Animated.timing.mockImplementation(() => ({ start }));

  beforeEach(() => {
    start.mockClear();
  });

  it('should not animate', () => {
    const tree = createRenderer({ buttons, onChange });

    act(() => {});

    Animated.timing.mockClear();

    act(() => {
      tree.update(createElement({ buttons, onChange, selected: 0 }));
    });

    expect(Animated.timing).not.toBeCalled();
  });

  it('should animate to second button', () => {
    const tree = createRenderer({ buttons, onChange });

    act(() => {});

    const width = 300;
    const { onLayout } = tree.root.findByProps({ testID: 'container' }).props;

    act(() => {
      onLayout({ nativeEvent: { layout: { width } } });
    });

    Animated.timing.mockClear();

    act(() => {
      tree.update(createElement({ buttons, onChange, selected: 1 }));
    });

    expect(Animated.timing).toBeCalledWith(expect.objectContaining({ _value: 0 }), {
      toValue: width / buttons.length,
      duration: 500,
      useNativeDriver: true,
      easing: 'Easing.out(Easing.exp)',
    });
    expect(start).toBeCalled();
  });
});
