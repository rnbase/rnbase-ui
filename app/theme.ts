import { ThemeFactory } from '../';

const theme: ThemeFactory = ({ scheme }) => {
  const BaseColors = {
    white: '#ffffff',
    black: '#000000',
    blue: scheme({ default: '#007aff', dark: '#0a84ff' }),
    green: scheme({ default: '#34c759', dark: '#30d158' }),
    orange: scheme({ default: '#ff9500', dark: '#ff9f0a' }),
    red: scheme({ default: '#ff3b30', dark: '#ff453a' }),
    yellow: scheme({ default: '#ffcc00', dark: '#ffd60a' }),
    gray: '#8e8e93',
    gray2: scheme({ default: '#aeaeb2', dark: '#636366' }),
    gray3: scheme({ default: '#c7c7cc', dark: '#48484a' }),
    gray4: scheme({ default: '#d1d1d6', dark: '#3a3a3c' }),
    gray5: scheme({ default: '#e5e5ea', dark: '#2c2c2e' }),
    gray6: scheme({ default: '#f2f2f7', dark: '#1c1c1e' }),
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
        padding: 2,
      },
      image: {},
      text: {},
    },
  };

  const ActivityButton = {
    style: {
      backgroundColor: Colors.red,
    },
    indicatorColor: Colors.black,
  };

  const ActivityButtonButton = {
    styles: {
      root: {},
      text: {},
      image: {},
    },
  };

  const Button = {
    styles: {
      root: {},
      text: {},
      image: {},
    },
    activeOpacity: 0.75,
  };

  const Component = {
    styles: {
      wrapper: {
        height: 90,
      },
      text: {
        color: Colors.blue,
      },
    },
  };

  return {
    Colors,
    Avatar,
    ActivityButton,
    ActivityButtonButton,
    Button,
    Component,
  };
};

export default theme;
