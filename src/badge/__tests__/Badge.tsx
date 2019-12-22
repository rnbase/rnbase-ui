import React from 'react';

// Note: test renderer must be required after react-native.
import TestRenderer from 'react-test-renderer';

/**
 * Under test
 */
import Badge, { Props } from '../Badge';

const createElement = (props: Props) => <Badge {...props} />;

const createRenderer = (props: Props) => TestRenderer.create(createElement(props));

it('should render normally', () => {
  expect(createRenderer({ value: 12 })).toMatchSnapshot();
});

it('should render without number', () => {
  expect(createRenderer({ value: true })).toMatchSnapshot();
});

it('should render when greather than limit', () => {
  expect(createRenderer({ value: 500, limit: 99 })).toMatchSnapshot();
});

it('should render with custom props', () => {
  expect(createRenderer({ value: 12, size: 16, rounded: false, color: 'red' })).toMatchSnapshot();
});

it('should not render when value = 0', () => {
  expect(createRenderer({ value: 0 })).toMatchSnapshot();
});

it('should not render when value = undefined', () => {
  expect(createRenderer({})).toMatchSnapshot();
});
