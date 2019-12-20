import { ThemeFactory } from '../';

const theme: ThemeFactory = ({ scheme }) => {
  const Colors = {
    red: scheme({ default: '#d00' }),
    blue: scheme({ default: '#00d' }),
    green: '#0d0',
  };

  const Avatar = {
    styles: {
      root: {
        alignSelf: 'center',
      },
    },
  };

  const ActivityButton = {
    style: {
      backgroundColor: Colors.green,
    },
    indicatorColor: Colors.red,
  };

  const ActivityButtonButton = {
    styles: {
      root: {
        margin: 5,
      },
      image: {
        tintColor: Colors.blue,
      },
    },
  };

  const Button = {
    styles: {
      root: {
        backgroundColor: Colors.blue,
        margin: 5,
      },
    },
    activeOpacity: 0.75,
  };

  return {
    Colors,
    Avatar,
    ActivityButton,
    ActivityButtonButton,
    Button,
  };
};

export default theme;
