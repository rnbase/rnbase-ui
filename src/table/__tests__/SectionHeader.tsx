import React from 'react';

// Note: test renderer must be required after react-native.
import TestRenderer from 'react-test-renderer';

/**
 * Under test
 */
import SectionHeader from '../SectionHeader';

type Props = React.ComponentProps<typeof SectionHeader>;

const Component = (props: any) => React.createElement('Component', props);

const createElement = (props: Partial<Props>) => <SectionHeader {...props} />;

const createRenderer = (props: Partial<Props>) => TestRenderer.create(createElement(props));

it('should render normally as text', () => {
  expect(createRenderer({ children: 'TEXT' })).toMatchSnapshot();
});

it('should render normally as component', () => {
  expect(createRenderer({ children: <Component /> })).toMatchSnapshot();
});

it('should render normally as text with custom styles', () => {
  expect(createRenderer({ children: 'TEXT', style: { color: 'red' } })).toMatchSnapshot();
});

it('should render normally as component with custom styles', () => {
  expect(createRenderer({ children: <Component />, style: { color: 'red' } })).toMatchSnapshot();
});
