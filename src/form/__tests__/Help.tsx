import React from 'react';

// Note: test renderer must be required after react-native.
import TestRenderer from 'react-test-renderer';

import Help from '../Help';

type Props = React.ComponentProps<typeof Help>;

/**
 * Under test
 */
const createElement = (props: Partial<Props>) => <Help {...props}>help</Help>;

const createRenderer = (props: Partial<Props>) => TestRenderer.create(createElement(props));

it('should render normally', () => {
  expect(createRenderer({})).toMatchSnapshot();
});

it('should render with custom styles', () => {
  expect(createRenderer({ style: { color: 'red' } })).toMatchSnapshot();
});
