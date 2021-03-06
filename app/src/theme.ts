import { ThemeFactory } from 'rnbase-ui';

const theme: ThemeFactory = ({ scheme }) => {
  const baseColors = {
    white: '#ffffff',
    black: '#000000',
    blue: scheme({ default: '#007aff', dark: '#0a84ff' }),
    green: scheme({ default: '#34c759', dark: '#30d158' }),
    orange: scheme({ default: '#ff9500', dark: '#ff9f0a' }),
    red: scheme({ default: '#ff3b30', dark: '#ff453a' }),
    yellow: scheme({ default: '#ffcc00', dark: '#ffd60a' }),
    gray: scheme({ default: '#838387', dark: '#8e8e93' }),
    gray2: scheme({ default: '#aeaeb2', dark: '#636366' }),
    gray3: scheme({ default: '#c7c7cc', dark: '#48484a' }),
    gray4: scheme({ default: '#d1d1d6', dark: '#3a3a3c' }),
    gray5: scheme({ default: '#e5e5ea', dark: '#2c2c2e' }),
    gray6: scheme({ default: '#f2f2f7', dark: '#1c1c1e' }),
  };

  const colors = {
    ...baseColors,
    primary: baseColors.blue,
    success: baseColors.green,
    danger: baseColors.red,
    underlay: scheme({ default: '#0001', dark: '#fff1' }),
    separator: scheme({ default: '#0003', dark: '#fff3' }),
  };

  const Avatar = {
    styles: {
      root: {
        //padding: 2,
      },
      image: {},
      text: {},
    },
  };

  const HomeButton = {
    props: {
      iconAlignment: 'right',
      iconSource: require('./assets/chevron-right.png'),
    },
    styles: {
      root: {
        borderRadius: null,
        backgroundColor: null,
        paddingHorizontal: null,
      },
      text: {
        flexGrow: 1,
        color: colors.black,
      },
      icon: {
        tintColor: colors.blue,
      },
    },
  };

  const Component = {
    styles: {
      wrapper: {
        height: 90,
      },
      text: {
        color: colors.blue,
      },
    },
  };

  return {
    colors,
    Avatar,
    HomeButton,
    Component,
  };
};

export default theme;
