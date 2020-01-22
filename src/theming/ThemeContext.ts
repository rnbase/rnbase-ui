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
    Colors: Theme;
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
      let themeKey: PropertyKey;

      if (!explicitThemeKey) {
        let propertyDescriptor = Object.getOwnPropertyDescriptor(stylesFactory, propertyKey);

        if (!propertyDescriptor) {
          propertyDescriptor = {
            value: Symbol(),
            writable: false,
          };

          Object.defineProperty(stylesFactory, propertyKey, propertyDescriptor);
        }

        themeKey = propertyDescriptor.value;
      } else {
        themeKey = explicitThemeKey;
      }

      if (!cache[themeKey]) {
        const styles = stylesFactory(theme);
        const props = typeof themeKey === 'symbol' ? undefined : theme[themeKey];

        cache[themeKey] = {
          ...props,
          styles: undefined,
          theme: {
            Colors: theme.Colors,
            styles:
              props && props.styles
                ? StyleSheet.create(deepmerge(styles, props.styles) as any)
                : styles,
          },
        };
      }

      return cache[themeKey];
    },
  };
}

export const ThemeContext: React.Context<ThemeCache> = React.createContext(createThemeCache());
