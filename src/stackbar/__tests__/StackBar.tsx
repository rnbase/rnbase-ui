import React from 'react';

// Note: test renderer must be required after react-native.
import TestRenderer from 'react-test-renderer';

/**
 * Under test
 */
import StackBar, { Props } from '../StackBar';

const data = [
  {
    value: 1,
    color: 'red',
    label: 'One',
  },
  {
    value: 2,
    color: 'green',
    label: 'Two',
  },
  {
    value: 3,
    color: 'blue',
    label: 'Three',
  },
];

const createElement = (props: Partial<Props>) => <StackBar data={data} {...props} />;

const createRenderer = (props: Partial<Props>) => TestRenderer.create(createElement(props));

it('should render normally', () => {
  expect(createRenderer({})).toMatchSnapshot();
});

it('should render without colors and labels', () => {
  const props = { showLegend: false, data: [{ value: 1 }, { value: 2 }, { value: 3 }] };

  expect(createRenderer(props)).toMatchSnapshot();
});
