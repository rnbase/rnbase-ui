import deepmerge from 'deepmerge';
import { useContext, useMemo } from 'react';
import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

import { Theme as ThemeType } from './theme';

import ThemeContext from './ThemeContext';

export { default as ThemeProvider } from './ThemeProvider';

export type Theme = ThemeType;

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export const useTheme = (): Theme => {
  return useContext(ThemeContext);
};

export const useStyles = <T extends NamedStyles<T> | NamedStyles<any>>(
  theme: Theme,
  factory: (theme: Theme) => T,
): T => {
  return useMemo(() => factory(theme), [factory, theme]);
};

export const useThemeStyles = (
  styleFactory: (theme: Theme) => Theme,
  componentName?: string,
): NamedStyles<any> => {
  const theme = useTheme();
  const componentTheme = componentName ? theme[componentName] : undefined;

  return useMemo(
    () =>
      StyleSheet.create(
        componentTheme ? deepmerge(styleFactory(theme), componentTheme) : styleFactory(theme),
      ),
    [componentTheme, styleFactory, theme],
  );
};
