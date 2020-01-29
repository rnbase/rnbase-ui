import React from 'react';

// Note: test renderer must be required after react-native.
import TestRenderer from 'react-test-renderer';

/**
 * Under test
 */
import Field from '../Field';

type Props = React.ComponentProps<typeof Field>;

const createElement = (props: Partial<Props>) => <Field {...props}>input</Field>;

const createRenderer = (props: Partial<Props>) => TestRenderer.create(createElement(props));

it('should render normally', () => {
  expect(createRenderer({})).toMatchSnapshot();
});

it('should render with label', () => {
  expect(createRenderer({ label: 'label' })).toMatchSnapshot();
});

it('should render with error', () => {
  expect(createRenderer({ label: 'label', touch: true, error: 'error' })).toMatchSnapshot();
});

it('should render without separator', () => {
  expect(createRenderer({ separator: false })).toMatchSnapshot();
});
