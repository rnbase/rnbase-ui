import { useContext } from 'react';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

import { Theme as ThemeType, ThemeFactory as ThemeFactoryType } from './theme';

import ThemeContext from './ThemeContext';

export { default as ThemeProvider } from './ThemeProvider';
export { default as withTheme } from './withTheme';

export type Theme = ThemeType;
export type ThemeFactory = ThemeFactoryType;

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export const useThemeProps = <T extends NamedStyles<T> | NamedStyles<any>, P extends {}>(
  stylesFactory: (theme: Theme) => T,
  themeKey: string,
  props?: P,
) => {
  const themeProps = useContext(ThemeContext).getThemeProps(stylesFactory, themeKey);

  return props ? { ...themeProps, ...props } : themeProps;
};
