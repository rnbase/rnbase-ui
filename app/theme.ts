import { ThemeFactory } from '../';

const theme: ThemeFactory = ({ select }) => {
  const Colors = {
    blue: select({ default: '#00F' }),
    green: '#0E0',
  };

  const Component = {
    styles: {
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
    },
  };

  const Button = {
    styles: {
      root: {
        backgroundColor: Colors.blue,
      },
    },
    activeOpacity: 0.75,
  };

  return {
    Colors,
    Button,
    Component,
  };
};

export default theme;
