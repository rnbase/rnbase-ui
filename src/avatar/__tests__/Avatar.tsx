import React from 'react';
import { Image } from 'react-native';

// Note: test renderer must be required after react-native.
import TestRenderer, { act } from 'react-test-renderer';

/**
 * Under test
 */
import Avatar, { Props } from '../Avatar';

const size = 50;

const createElement = (props: Props) => <Avatar {...props} />;

const createRenderer = (props: Props) => TestRenderer.create(createElement(props));

it('should render default image', () => {
  expect(createRenderer({ size })).toMatchSnapshot();
});

it('should render image', () => {
  expect(createRenderer({ size, image: { uri: 'image.png' } })).toMatchSnapshot();
});

it('should render image as square', () => {
  expect(createRenderer({ size, shape: 'square', image: { uri: 'image.png' } })).toMatchSnapshot();
});

it('should render gravatar', () => {
  expect(createRenderer({ size, email: 'user@email.com' })).toMatchSnapshot();
});

it('should render initials', () => {
  expect(createRenderer({ size, name: 'User Name' })).toMatchSnapshot();
});

it('should fallback to initials', () => {
  const tree = createRenderer({ size, name: 'User Name', email: 'user@email.com' });
  const image = tree.root.findByType(Image);

  act(() => image.props.onError());

  expect(tree).toMatchSnapshot();
});

it('should render default image if no image', () => {
  const tree = createRenderer({
    size,
    image: { uri: 'image.png' },
    defaultImage: { uri: 'default.png' },
  });
  const image = tree.root.findByType(Image);

  act(() => image.props.onError());

  expect(tree).toMatchSnapshot();
});

it('should render default image if no gravatar', () => {
  const tree = createRenderer({
    size,
    email: 'user@email.com',
    defaultImage: { uri: 'default.png' },
  });
  const image = tree.root.findByType(Image);

  act(() => image.props.onError());

  expect(tree).toMatchSnapshot();
});

it('should render default image if empty name', () => {
  const tree = createRenderer({ size, name: '', defaultImage: { uri: 'default.png' } });
  const image = tree.root.findByType(Image);

  act(() => image.props.onError());

  expect(tree).toMatchSnapshot();
});
