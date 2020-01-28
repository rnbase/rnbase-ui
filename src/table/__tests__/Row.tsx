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

const Label = () => React.createElement('Label');
const Action = () => React.createElement('Action');
/**
 * Under test
 */
const createElement = (props: Partial<Props>) => (
  <Row {...props}>
    <Label />
    <Action />
  </Row>
);

const createRenderer = (props: Partial<Props>) => TestRenderer.create(createElement(props));

it('should render normally', () => {
  expect(createRenderer({})).toMatchSnapshot();
});

it('should render with custom styles', () => {
  expect(createRenderer({ style: { backgroundColor: 'red' } })).toMatchSnapshot();
});

it('should render as touchable', () => {
  expect(createRenderer({ onPress: jest.fn() })).toMatchSnapshot();
});

it('should handle onPress', () => {
  const onPress = jest.fn();
  const tree = createRenderer({ onPress });

  tree.root.findByType(TouchableHighlight).props.onPress();

  expect(onPress).toBeCalledWith();
});
