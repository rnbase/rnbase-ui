import React from 'react';
import ThemeContext, { createThemeCache } from './ThemeContext';
import { ColorSchemeName, ThemeFactory } from './theme';

interface Props {
  colorScheme?: ColorSchemeName;
  theme?: ThemeFactory;
  children?: React.ReactNode;
}

const ThemeProvider: React.FC<Props> = ({ theme, colorScheme, children }) => {
  const value = React.useMemo(() => createThemeCache(theme, colorScheme), [theme, colorScheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
