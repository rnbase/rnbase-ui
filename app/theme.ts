import { ThemeFactory } from '../';

const theme: ThemeFactory = ({ scheme }) => {
  const BaseColors = {
    white: '#ffffff',
    black: '#000000',
    blue: scheme({ dark: '#0a84ff', default: '#007aff' }),
    green: scheme({ dark: '#30d158', default: '#34c759' }),
    orange: scheme({ dark: '#ff9f0a', default: '#ff9500' }),
    red: scheme({ dark: '#ff453a', default: '#ff3b30' }),
    yellow: scheme({ dark: '#ffd60a', default: '#ffcc00' }),
    gray: '#8e8e93',
    gray2: scheme({ dark: '#636366', default: '#aeaeb2' }),
    gray3: scheme({ dark: '#48484a', default: '#c7c7cc' }),
    gray4: scheme({ dark: '#3a3a3c', default: '#d1d1d6' }),
    gray5: scheme({ dark: '#2c2c2e', default: '#e5e5ea' }),
    gray6: scheme({ dark: '#1c1c1e', default: '#f2f2f7' }),
  };

  const Colors = {
    ...BaseColors,
    primary: BaseColors.blue,
    success: BaseColors.green,
    danger: BaseColors.red,
  };

  const Avatar = {
    styles: {
      root: {
        borderWidth: 3,
        borderColor: 'transparent',
      },
      image: {},
      text: {},
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
