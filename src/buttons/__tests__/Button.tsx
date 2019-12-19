import React from 'react';

// Note: test renderer must be required after react-native.
import TestRenderer from 'react-test-renderer';

import { Props } from '../Button';

const TouchableOpacity = (props: any) => React.createElement('TouchableOpacity', props);

jest.doMock('react-native/Libraries/Components/Touchable/TouchableOpacity', () => TouchableOpacity);

/**
 * Under test
 */
const { default: Button } = jest.requireActual('../Button');

const createElement = (props: Props) => <Button {...props} text="TEXT" />;

const createRenderer = (props: Props) => TestRenderer.create(createElement(props));

it('should render normally', () => {
  expect(createRenderer({})).toMatchSnapshot();
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

it('should render with icon', () => {
  expect(
    createRenderer({ imageSource: { uri: 'image.png' }, imageStyle: { tintColor: '#ffffff' } }),
  ).toMatchSnapshot();
});

it('should call onPress', () => {
  const onPress = jest.fn();
  const tree = createRenderer({ onPress });
  const button = tree.root.findByType(TouchableOpacity);

  button.props.onPress();

  expect(onPress).toBeCalled();
});
