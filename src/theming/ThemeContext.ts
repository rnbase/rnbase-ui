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
  theme: {
    colors: Theme;
    styles: T;
  };
}

interface ThemeCache {
  getThemeProps<T>(stylesFactory: (theme: Theme) => T, explicitThemeKey?: string): ThemeProps<T>;
}

const propertyKey = Symbol();

export function createThemeCache(
  customTheme: ThemeFactory = defaultTheme,
  colorScheme: ColorSchemeName = 'no-preference',
): ThemeCache {
  let cache: any = {};
  let theme = customTheme
    ? deepmerge(resolveTheme(defaultTheme, colorScheme), resolveTheme(customTheme, colorScheme))
    : resolveTheme(defaultTheme, colorScheme);

  return {
    getThemeProps(stylesFactory, explicitThemeKey) {
      let themeKey;

      if (explicitThemeKey) {
        themeKey = explicitThemeKey;
      } else {
        let propertyDescriptor = Object.getOwnPropertyDescriptor(stylesFactory, propertyKey);

        if (!propertyDescriptor) {
          propertyDescriptor = {
            value: Symbol(),
            writable: false,
          };

          Object.defineProperty(stylesFactory, propertyKey, propertyDescriptor);
        }

        themeKey = propertyDescriptor.value;
      }

      if (!cache[themeKey]) {
        const { props, styles } = theme[themeKey] || {};

        cache[themeKey] = {
          ...props,
          theme: {
            colors: theme.colors,
            styles: styles
              ? StyleSheet.create(deepmerge<Theme>(stylesFactory(theme), styles))
              : stylesFactory(theme),
          },
        };
      }

      return cache[themeKey];
    },
  };
}

export const ThemeContext: React.Context<ThemeCache> = React.createContext(createThemeCache());
