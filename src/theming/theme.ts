export type Appearance = 'light' | 'dark';

export type Theme = {
  [key: string]: any;
};

export type ThemeFactory = Theme | ((appearance?: Appearance) => Theme);

const defaultTheme: ThemeFactory = (appearance?: Appearance) => ({
  colors: {
    white: '#FFFFFF',
    black: '#030303',
    blue: '#3E88C5',
    gray2: appearance === 'dark' ? '#636366' : '#AEAEB2',
  },
});

export function resolveTheme(theme: ThemeFactory = defaultTheme, appearance?: Appearance): Theme {
  if (theme instanceof Function) {
    return theme(appearance);
  }

  return theme;
}

export default defaultTheme;
