import React from 'react';
import deepmerge from 'deepmerge';
import { ThemeType } from './theme';
import ThemeContext from './ThemeContext';

interface Props {
  theme?: ThemeType;
  children?: React.ReactNode;
}

const ThemeProvider: React.FC<Props> = ({ theme, children }) => {
  const contextTheme = React.useContext(ThemeContext);
  const value = contextTheme && theme ? deepmerge(contextTheme, theme) : contextTheme || theme;

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
