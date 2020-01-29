import React from 'react';

// Note: test renderer must be required after react-native.
import TestRenderer from 'react-test-renderer';

/**
 * Under test
 */
import Section from '../Section';

type Props = React.ComponentProps<typeof Section>;

const Row = () => React.createElement('Row');

const createElement = (props: Partial<Props>) => (
  <Section {...props}>
    <Row />
  </Section>
);

const createRenderer = (props: Partial<Props>) => TestRenderer.create(createElement(props));

it('should render normally', () => {
  expect(createRenderer({})).toMatchSnapshot();
});

it('should render with header', () => {
  expect(createRenderer({ header: 'HEADER' })).toMatchSnapshot();
});

it('should render with footer', () => {
  expect(createRenderer({ footer: 'FOOTER' })).toMatchSnapshot();
});

it('should render with custom styles', () => {
  expect(
    createRenderer({
      header: 'HEADER',
      footer: 'FOOTER',
      style: { margin: 0 },
      headerStyle: { color: 'red' },
      footerStyle: { color: 'green' },
      contentStyle: { backgroundColor: 'blue' },
    }),
  ).toMatchSnapshot();
});
