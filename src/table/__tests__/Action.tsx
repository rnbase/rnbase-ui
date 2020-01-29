import React from 'react';

// Note: test renderer must be required after react-native.
import TestRenderer from 'react-test-renderer';

/**
 * Under test
 */
import Action from '../Action';

type Props = React.ComponentProps<typeof Action>;

const createElement = (props: Partial<Props>) => <Action {...props}>text</Action>;

const createRenderer = (props: Partial<Props>) => TestRenderer.create(createElement(props));

const iconSource = {
  uri: '../../assets/star.png',
};

it('should render normally', () => {
  expect(createRenderer({})).toMatchSnapshot();
});

it('should render with custom styles', () => {
  expect(createRenderer({ style: { color: 'red' } })).toMatchSnapshot();
});

it('should render with icon', () => {
  expect(createRenderer({ iconSource })).toMatchSnapshot();
});

it('should render with icon and custom icon styles', () => {
  expect(createRenderer({ iconSource, iconStyle: { tintColor: 'red' } })).toMatchSnapshot();
});
