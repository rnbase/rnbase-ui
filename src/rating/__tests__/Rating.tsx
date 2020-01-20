import React from 'react';

// Note: test renderer must be required after react-native.
import TestRenderer, { act } from 'react-test-renderer';

/**
 * Under test
 */
import Rating, { Props } from '../Rating';

jest.mock('../RatingSymbol', () => 'RatingSymbol');

const createElement = (props: Props) => <Rating {...props} />;

const createRenderer = (props: Props) => TestRenderer.create(createElement(props));

it('should render normally', () => {
  const tree = createRenderer({ value: 3 });

  act(() => {});

  expect(tree).toMatchSnapshot();
});

it('should render with custom props', () => {
  const tree = createRenderer({
    value: 3,
    size: 30,
    type: 'solid',
    maxValue: 10,
  });

  act(() => {});

  expect(tree).toMatchSnapshot();
});

it('should render with custom styles', () => {
  const tree = createRenderer({
    value: 3,
    symbolStyle: { color: 'black' },
    activeSymbolStyle: { color: 'blue' },
    selectedSymbolStyle: { color: 'green' },
  });

  act(() => {});

  expect(tree).toMatchSnapshot();
});
