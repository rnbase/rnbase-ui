import React from 'react';
import { Text } from 'react-native';

// Note: test renderer must be required after react-native.
import TestRenderer from 'react-test-renderer';

import { Props } from '../Button';

const TouchableOpacity = (props: any) => React.createElement('TouchableOpacity', props);

jest.doMock('react-native/Libraries/Components/Touchable/TouchableOpacity', () => TouchableOpacity);

/**
 * Under test
 */
const { default: Button } = jest.requireActual('../Button');

const createElement = (props: Props) => <Button {...props} />;

const createRenderer = (props: Props) => TestRenderer.create(createElement(props));

it('should render with custom styles', () => {
  expect(createRenderer({ style: { backgroundColor: '#000000' } })).toMatchSnapshot();
});

it('should render as disabled', () => {
  expect(createRenderer({ disabled: true })).toMatchSnapshot();
});

it('should render text only', () => {
  expect(createRenderer({ text: 'Button' })).toMatchSnapshot();
});

it('should render text with custom styles', () => {
  expect(createRenderer({ text: 'Button', textStyle: { color: '#aaa' } })).toMatchSnapshot();
});

it('should render with image only', () => {
  expect(createRenderer({ imageSource: { uri: 'image.png' } })).toMatchSnapshot();
});

it('should render with left image', () => {
  expect(
    createRenderer({
      text: 'Right Text',
      imageSource: { uri: 'left.png' },
      imageAlignment: 'left',
    }),
  ).toMatchSnapshot();
});

it('should render with right image', () => {
  expect(
    createRenderer({
      text: 'Left Text',
      imageSource: { uri: 'right.png' },
      imageAlignment: 'right',
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
