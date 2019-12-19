export type ColorSchemeName = 'light' | 'dark' | 'no-preference';

export type Theme = {
  [key: string]: any;
};

export type ThemeFactory = Theme | ((colorScheme?: ColorSchemeName) => Theme);

// Colors based on Apple Human Interface Guidelines
// https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/color/
const defaultTheme: ThemeFactory = (colorScheme?: ColorSchemeName) => ({
  Colors: {
    white: '#ffffff',
    black: '#000000',
    blue: colorScheme === 'dark' ? '#0a84ff' : '#007aff',
    green: colorScheme === 'dark' ? '#30d158' : '#34c759',
    indigo: colorScheme === 'dark' ? '#5e5ce6' : '#5856d6',
    orange: colorScheme === 'dark' ? '#ff9f0a' : '#ff9500',
    pink: colorScheme === 'dark' ? '#ff375f' : '#ff2d55',
    purple: colorScheme === 'dark' ? '#bf5af2' : '#af52de',
    red: colorScheme === 'dark' ? '#ff453a' : '#ff3b30',
    teal: colorScheme === 'dark' ? '#64d2ff' : '#5ac8fa',
    yellow: colorScheme === 'dark' ? '#ffd60a' : '#ffcc00',
    gray: '#8e8e93',
    gray2: colorScheme === 'dark' ? '#636366' : '#aeaeb2',
    gray3: colorScheme === 'dark' ? '#48484a' : '#c7c7cc',
    gray4: colorScheme === 'dark' ? '#3a3a3c' : '#d1d1d6',
    gray5: colorScheme === 'dark' ? '#2c2c2e' : '#e5e5ea',
    gray6: colorScheme === 'dark' ? '#1c1c1e' : '#f2f2f7',
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
