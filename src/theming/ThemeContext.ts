import React from 'react';
import { StyleSheet } from 'react-native';
import deepmerge from 'deepmerge';
import defaultTheme, { Theme, ThemeFactory, ColorSchemeName } from './theme';

function resolveTheme(theme: ThemeFactory, colorScheme: ColorSchemeName): Theme {
  if (theme instanceof Function) {
    return theme({
      colorScheme,
      scheme: spec => (colorScheme in spec ? spec[colorScheme] : spec.default),
    });
  }

  return theme;
}

export interface ThemeProps<T> {
  styles: T;
}

interface ThemeCache {
  theme: Theme;
  getThemeProps<T>(stylesFactory: (theme: Theme) => T, themeKey: string): ThemeProps<T>;
}

export function createThemeCache(
  customTheme: ThemeFactory = defaultTheme,
  colorScheme: ColorSchemeName = 'no-preference',
): ThemeCache {
  var cache: any = {};
  var theme = customTheme
    ? deepmerge(resolveTheme(defaultTheme, colorScheme), resolveTheme(customTheme, colorScheme))
    : resolveTheme(defaultTheme, colorScheme);

  return {
    theme,
    getThemeProps(stylesFactory, themeKey) {
      if (!cache[themeKey]) {
        const styles = stylesFactory(theme);
        const props = theme[themeKey];

        cache[themeKey] = {
          ...props,
          styles:
            props && props.styles
              ? StyleSheet.create(deepmerge(styles, props.styles) as any)
              : styles,
        };
      }

      return cache[themeKey];
    },
  };
}

export const ThemeContext: React.Context<ThemeCache> = React.createContext(createThemeCache());
