import React from 'react';

// Note: test renderer must be required after react-native.
import TestRenderer from 'react-test-renderer';

/**
 * Under test
 */
import Component, { Props } from '../Component';

const createElement = (props: Props) => (
  <Component {...props}>TEXT</Component>
);

const createRenderer = (props: Props) => TestRenderer.create(createElement(props));

it('should render normally', () => {
  expect(createRenderer({})).toMatchSnapshot();
});

it('should not render', () => {
  expect(createRenderer({ visible: false })).toMatchSnapshot();
});

it('should render with custom styles', () => {
  expect(
    createRenderer({
      style: { backgroundColor: '#FFFFFF' },
      textStyle: { color: '#000000' },
    }),
  ).toMatchSnapshot();
});
