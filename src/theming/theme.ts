export type Appearance = 'light' | 'dark';

export type Theme = {
  [key: string]: any;
};

export type ThemeFactory = Theme | ((appearance?: Appearance) => Theme);

// Colors based on Apple Human Interface Guidelines
// https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/color/
const defaultTheme: ThemeFactory = (appearance?: Appearance) => ({
  Colors: {
    white: '#ffffff',
    black: '#000000',
    blue: appearance === 'dark' ? '#0a84ff' : '#007aff',
    green: appearance === 'dark' ? '#30d158' : '#34c759',
    indigo: appearance === 'dark' ? '#5e5ce6' : '#5856d6',
    orange: appearance === 'dark' ? '#ff9f0a' : '#ff9500',
    pink: appearance === 'dark' ? '#ff375f' : '#ff2d55',
    purple: appearance === 'dark' ? '#bf5af2' : '#af52de',
    red: appearance === 'dark' ? '#ff453a' : '#ff3b30',
    teal: appearance === 'dark' ? '#64d2ff' : '#5ac8fa',
    yellow: appearance === 'dark' ? '#ffd60a' : '#ffcc00',
    gray: '#8e8e93',
    gray2: appearance === 'dark' ? '#636366' : '#aeaeb2',
    gray3: appearance === 'dark' ? '#48484a' : '#c7c7cc',
    gray4: appearance === 'dark' ? '#3a3a3c' : '#d1d1d6',
    gray5: appearance === 'dark' ? '#2c2c2e' : '#e5e5ea',
    gray6: appearance === 'dark' ? '#1c1c1e' : '#f2f2f7',
  },
  Fonts: {
    thin: {
      fontWeight: '100',
      fontFamily: 'System',
      includeFontPadding: false,
      backgroundColor: 'transparent',
    },
    light: {
      fontWeight: '300',
      fontFamily: 'System',
      includeFontPadding: false,
      backgroundColor: 'transparent',
    },
    regular: {
      fontWeight: '400',
      fontFamily: 'System',
      includeFontPadding: false,
      backgroundColor: 'transparent',
    },
    semibold: {
      fontWeight: '600',
      fontFamily: 'System',
      includeFontPadding: false,
      backgroundColor: 'transparent',
    },
    bold: {
      fontWeight: '700',
      fontFamily: 'System',
      includeFontPadding: false,
      backgroundColor: 'transparent',
    },
  },
});

export function resolveTheme(theme: ThemeFactory = defaultTheme, appearance?: Appearance): Theme {
  if (theme instanceof Function) {
    return theme(appearance);
  }

  return theme;
}

export default defaultTheme;
