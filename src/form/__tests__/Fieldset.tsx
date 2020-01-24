import React from 'react';

// Note: test renderer must be required after react-native.
import TestRenderer from 'react-test-renderer';

import Fieldset from '../Fieldset';

type Props = React.ComponentProps<typeof Fieldset>;

const Row = () => React.createElement('Row');

/**
 * Under test
 */
const createElement = (props: Partial<Props>) => (
  <Fieldset {...props}>
    <Row />
  </Fieldset>
);

const createRenderer = (props: Partial<Props>) => TestRenderer.create(createElement(props));

it('should render normally', () => {
  expect(createRenderer({})).toMatchSnapshot();
});

it('should render with custom styles', () => {
  expect(createRenderer({ style: { height: 123 } })).toMatchSnapshot();
});
