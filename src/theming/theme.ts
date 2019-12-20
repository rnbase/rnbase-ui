export type ColorSchemeName = 'light' | 'dark' | 'no-preference';

export type Theme = {
  [key: string]: any;
};

export type ThemeProps<T> = {
  styles: T;
  [key: string]: any;
};

interface ThemeFactoryArgs {
  colorScheme: ColorSchemeName;
  scheme<T>(specifics: { [colorScheme in ColorSchemeName | 'default']?: T }): T | undefined;
}

export type ThemeFactory = Theme | ((args: ThemeFactoryArgs) => Theme);

// Colors based on Apple Human Interface Guidelines
// https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/color/
const defaultTheme: ThemeFactory = ({ scheme }) => ({
  Colors: {
    white: '#ffffff',
    black: '#000000',
    blue: scheme({ dark: '#0a84ff', default: '#007aff' }),
    green: scheme({ dark: '#30d158', default: '#34c759' }),
    indigo: scheme({ dark: '#5e5ce6', default: '#5856d6' }),
    orange: scheme({ dark: '#ff9f0a', default: '#ff9500' }),
    pink: scheme({ dark: '#ff375f', default: '#ff2d55' }),
    purple: scheme({ dark: '#bf5af2', default: '#af52de' }),
    red: scheme({ dark: '#ff453a', default: '#ff3b30' }),
    teal: scheme({ dark: '#64d2ff', default: '#5ac8fa' }),
    yellow: scheme({ dark: '#ffd60a', default: '#ffcc00' }),
    gray: '#8e8e93',
    gray2: scheme({ dark: '#636366', default: '#aeaeb2' }),
    gray3: scheme({ dark: '#48484a', default: '#c7c7cc' }),
    gray4: scheme({ dark: '#3a3a3c', default: '#d1d1d6' }),
    gray5: scheme({ dark: '#2c2c2e', default: '#e5e5ea' }),
    gray6: scheme({ dark: '#1c1c1e', default: '#f2f2f7' }),
  },
  Fonts: {
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
  },
});

export default defaultTheme;
