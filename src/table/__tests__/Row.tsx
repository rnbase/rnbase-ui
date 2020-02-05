import React from 'react';

// Note: test renderer must be required after react-native.
import TestRenderer from 'react-test-renderer';

const TouchableHighlight = (props: any) => React.createElement('TouchableHighlight', props);

jest.doMock(
  'react-native/Libraries/Components/Touchable/TouchableHighlight',
  () => TouchableHighlight,
);

/**
 * Under test
 */
import Row from '../Row';

type Props = React.ComponentProps<typeof Row>;

const Switch = (props: any) => React.createElement('Switch', props);

/**
 * Under test
 */
const createElement = (props: Partial<Props>) => (
  <Row {...props}>
    <Switch />
  </Row>
);

const createRenderer = (props: Partial<Props>) => TestRenderer.create(createElement(props));

it('should render normally', () => {
  expect(createRenderer({ title: 'title', subtitle: 'subtitle' })).toMatchSnapshot();
});

it('should render with title only', () => {
  expect(createRenderer({ title: 'title' })).toMatchSnapshot();
});

it('should render with image', () => {
  expect(createRenderer({ image: { uri: 'image.png' } })).toMatchSnapshot();
});

it('should render with disclosure indicator', () => {
  expect(createRenderer({ disclosureIndicator: undefined, onPress: jest.fn() })).toMatchSnapshot();
  expect(createRenderer({ disclosureIndicator: true, onPress: undefined })).toMatchSnapshot();
  expect(createRenderer({ onPress: jest.fn() })).toMatchSnapshot();
});

it('should render without disclosure indicator', () => {
  expect(createRenderer({ onPress: undefined })).toMatchSnapshot();
  expect(createRenderer({ disclosureIndicator: false, onPress: jest.fn() })).toMatchSnapshot();
});

it('should render with custom styles', () => {
  expect(
    createRenderer({
      title: 'title',
      titleStyle: { color: 'red' },
      subtitle: 'subtitle',
      subtitleStyle: { color: 'green' },
      image: { uri: 'image.png' },
      imageStyle: { tintColor: 'blue' },
      style: { backgroundColor: 'yellow' },
      activeOpacity: 0.9,
      underlayColor: 'cyan',
      onPress: jest.fn(),
      onPressIn: jest.fn(),
      onPressOut: jest.fn(),
    }),
  ).toMatchSnapshot();
});

it('should handle onPress', () => {
  const onPress = jest.fn();
  const tree = createRenderer({ onPress });

  tree.root.findByType(TouchableHighlight).props.onPress();

  expect(onPress).toBeCalledWith();
});
