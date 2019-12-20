import { ThemeFactory } from '../';

const theme: ThemeFactory = ({ scheme }) => {
  const Colors = {
    blue: scheme({ default: '#00F' }),
    green: '#0E0',
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
  };
};

export default theme;
