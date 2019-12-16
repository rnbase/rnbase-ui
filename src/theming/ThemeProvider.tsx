import React from 'react';
import deepmerge from 'deepmerge';
import defaultTheme, { ColorSchemeName, ThemeFactory, resolveTheme } from './theme';
import ThemeContext from './ThemeContext';

interface Props {
  colorScheme?: ColorSchemeName;
  theme?: ThemeFactory;
  children?: React.ReactNode;
}

const ThemeProvider: React.FC<Props> = ({ colorScheme, theme, children }) => {
  const value = React.useMemo(() => {
    return theme
      ? deepmerge(resolveTheme(defaultTheme, colorScheme), resolveTheme(theme, colorScheme))
      : resolveTheme(defaultTheme, colorScheme);
  }, [colorScheme, theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

ThemeProvider.defaultProps = {
  colorScheme: 'no-preference',
};

export default ThemeProvider;
