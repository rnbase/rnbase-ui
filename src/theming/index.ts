import { useContext } from 'react';

import { Theme as ThemeType } from './theme';

import ThemeContext from './ThemeContext';

export { default as ThemeProvider } from './ThemeProvider';

export type Theme = ThemeType;

export const useTheme = (): Theme => {
  const theme = useContext(ThemeContext);

  return theme;
};
