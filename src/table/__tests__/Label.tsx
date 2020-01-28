import React from 'react';

// Note: test renderer must be required after react-native.
import TestRenderer from 'react-test-renderer';

import Label from '../Label';

type Props = React.ComponentProps<typeof Label>;

/**
 * Under test
 */
const createElement = (props: Partial<Props>) => <Label {...props}>label</Label>;

const createRenderer = (props: Partial<Props>) => TestRenderer.create(createElement(props));

it('should render normally', () => {
  expect(createRenderer({})).toMatchSnapshot();
});

it('should render with custom styles', () => {
  expect(createRenderer({ style: { color: 'red' } })).toMatchSnapshot();
});
