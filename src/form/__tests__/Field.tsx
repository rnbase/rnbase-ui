import React from 'react';

// Note: test renderer must be required after react-native.
import TestRenderer from 'react-test-renderer';

/**
 * Under test
 */
import Field from '../Field';

type Props = React.ComponentProps<typeof Field>;

const Input = (props: any) => React.createElement('Input', props);

const createElement = (props?: Partial<Props>, style?: any) => (
  <Field {...props}>
    <Input style={style} />
  </Field>
);

const createRenderer = (props?: Partial<Props>, style?: any) =>
  TestRenderer.create(createElement(props, style));

it('should render normally', () => {
  expect(createRenderer()).toMatchSnapshot();
});

it('should render with label', () => {
  expect(createRenderer({ label: 'label' })).toMatchSnapshot();
});

it('should render with error', () => {
  expect(createRenderer({ label: 'label', touch: true, error: 'error' })).toMatchSnapshot();
});

it('should render with custom input styles', () => {
  expect(createRenderer({}, { color: 'red' })).toMatchSnapshot();
});
