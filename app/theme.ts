import { ThemeFactory } from '../';

const theme: ThemeFactory = ({ select }) => {
  const Colors = {
    blue: select({ default: '#00F' }),
    green: '#0E0',
  };

  const Component = {
    wrapper: {
      height: 90,
    },
    text: {
      color: Colors.green,
      textTransform: 'none',
    },
    unused: {
      color: 'transparent',
    },
  };

  return {
    Colors,
    Component,
  };
};

export default theme;
