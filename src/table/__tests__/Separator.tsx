import React from 'react';

// Note: test renderer must be required after react-native.
import TestRenderer from 'react-test-renderer';

/**
 * Under test
 */
import Separator from '../Separator';

type Props = React.ComponentProps<typeof Separator>;

const createElement = (props: Partial<Props>) => <Separator {...props} />;

const createRenderer = (props: Partial<Props>) => TestRenderer.create(createElement(props));

it('should render normally', () => {
  expect(createRenderer({})).toMatchSnapshot();
});

it('should render as highlighted', () => {
  expect(createRenderer({ highlighted: true })).toMatchSnapshot();
});

it('should render with custom inset', () => {
  expect(createRenderer({ insetLeft: 123 })).toMatchSnapshot();
});

it('should render with custom styles', () => {
  expect(createRenderer({ style: { backgroundColor: 'red' } })).toMatchSnapshot();
});
