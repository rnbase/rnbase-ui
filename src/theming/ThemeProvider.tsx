import React from 'react';
import deepmerge from 'deepmerge';
import defaultTheme, { Appearance, ThemeFactory, resolveTheme } from './theme';
import ThemeContext from './ThemeContext';

interface Props {
  appearance?: Appearance;
  theme?: ThemeFactory;
  children?: React.ReactNode;
}

const ThemeProvider: React.FC<Props> = ({ appearance, theme, children }) => {
  const value = React.useMemo(() => {
    return theme
      ? deepmerge(resolveTheme(defaultTheme, appearance), resolveTheme(theme, appearance))
      : resolveTheme(defaultTheme, appearance);
  }, [appearance, theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

ThemeProvider.defaultProps = {
  appearance: 'light',
};

export default ThemeProvider;
