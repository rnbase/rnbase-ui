export type ColorSchemeName = 'light' | 'dark' | 'no-preference';

export type Theme = {
  [key: string]: any;
};

interface ThemeFactoryArgs {
  colorScheme: ColorSchemeName;
  scheme<T>(specifics: { [colorScheme in ColorSchemeName | 'default']?: T }): T | undefined;
}

export type ThemeFactory = Theme | ((args: ThemeFactoryArgs) => Theme);

// Colors based on Apple Human Interface Guidelines
// https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/color/
const defaultTheme: ThemeFactory = ({ scheme }) => {
  const colors = {
    white: '#ffffff',
    black: '#000000',
    blue: scheme({ default: '#007aff', dark: '#0a84ff' }),
    green: scheme({ default: '#34c759', dark: '#30d158' }),
    indigo: scheme({ default: '#5856d6', dark: '#5e5ce6' }),
    orange: scheme({ default: '#ff9500', dark: '#ff9f0a' }),
    pink: scheme({ default: '#ff2d55', dark: '#ff375f' }),
    purple: scheme({ default: '#af52de', dark: '#bf5af2' }),
    red: scheme({ default: '#ff3b30', dark: '#ff453a' }),
    teal: scheme({ default: '#5ac8fa', dark: '#64d2ff' }),
    yellow: scheme({ default: '#ffcc00', dark: '#ffd60a' }),
    gray: scheme({ default: '#838387', dark: '#8e8e93' }),
    gray2: scheme({ default: '#aeaeb2', dark: '#636366' }),
    gray3: scheme({ default: '#c7c7cc', dark: '#48484a' }),
    gray4: scheme({ default: '#d1d1d6', dark: '#3a3a3c' }),
    gray5: scheme({ default: '#e5e5ea', dark: '#2c2c2e' }),
    gray6: scheme({ default: '#f2f2f7', dark: '#1c1c1e' }),
  };

  const fonts = {
    thin: {
      fontWeight: '100',
      fontFamily: 'System',
      includeFontPadding: false,
      textAlignVertical: 'center',
      backgroundColor: 'transparent',
    },
    light: {
      fontWeight: '300',
      fontFamily: 'System',
      includeFontPadding: false,
      textAlignVertical: 'center',
      backgroundColor: 'transparent',
    },
    normal: {
      fontWeight: '400',
      fontFamily: 'System',
      includeFontPadding: false,
      textAlignVertical: 'center',
      backgroundColor: 'transparent',
    },
    semibold: {
      fontWeight: '600',
      fontFamily: 'System',
      includeFontPadding: false,
      textAlignVertical: 'center',
      backgroundColor: 'transparent',
    },
    bold: {
      fontWeight: '700',
      fontFamily: 'System',
      includeFontPadding: false,
      textAlignVertical: 'center',
      backgroundColor: 'transparent',
    },
  };

  const OutlineButton = {
    styles: {
      root: {
        borderWidth: 2,
        borderColor: colors.blue,
        backgroundColor: null,
      },
      text: {
        color: colors.blue,
      },
      icon: {
        tintColor: colors.blue,
      },
      disabledRoot: {
        borderColor: colors.gray3,
        backgroundColor: null,
      },
      disabledText: {
        color: colors.gray2,
      },
      disabledIcon: {
        tintColor: colors.gray2,
      },
    },
  };

  const TextButton = {
    props: {
      hitSlop: {
        top: 5,
        left: 5,
        bottom: 5,
        right: 5,
      },
    },
    styles: {
      root: {
        height: null,
        overflow: null,
        borderRadius: null,
        backgroundColor: null,
        paddingHorizontal: null,
      },
      text: {
        color: colors.blue,
      },
      icon: {
        tintColor: colors.blue,
      },
      disabledRoot: {
        backgroundColor: null,
      },
      disabledText: {
        color: colors.gray2,
      },
      disabledIcon: {
        tintColor: colors.gray2,
      },
    },
  };

  return {
    colors,
    fonts,
    OutlineButton,
    TextButton,
  };
};

export default defaultTheme;
