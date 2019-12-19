import React from 'react';
import { StyleSheet } from 'react-native';
import deepmerge from 'deepmerge';
import defaultTheme, { Theme, ThemeFactory, ColorSchemeName } from './theme';

function resolveTheme(theme: ThemeFactory, colorScheme: ColorSchemeName): Theme {
  if (theme instanceof Function) {
    return theme(colorScheme);
  }

  return theme;
}

interface ThemeCache {
  theme: Theme;
  getStyles<T>(stylesFactory: (theme: Theme) => T, stylesKey: string): T;
}

export function createThemeCache(
  customTheme: ThemeFactory = defaultTheme,
  colorScheme: ColorSchemeName = 'no-preference',
): ThemeCache {
  var styles: any = {};
  var theme = customTheme
    ? deepmerge(resolveTheme(defaultTheme, colorScheme), resolveTheme(customTheme, colorScheme))
    : resolveTheme(defaultTheme, colorScheme);

  return {
    theme,
    getStyles(stylesFactory, stylesKey) {
      if (!styles[stylesKey]) {
        const defaultStyles = stylesFactory(theme);

        styles[stylesKey] =
          stylesKey && theme[stylesKey]
            ? StyleSheet.create(deepmerge(defaultStyles, theme[stylesKey]))
            : defaultStyles;
      }

      return styles[stylesKey];
    },
  };
}

const ThemeContext: React.Context<ThemeCache> = React.createContext(createThemeCache());

export default ThemeContext;
