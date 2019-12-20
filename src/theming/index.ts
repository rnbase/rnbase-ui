import { useContext } from 'react';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

import { Theme as ThemeType, ThemeFactory as ThemeFactoryType } from './theme';

import ThemeContext from './ThemeContext';

export { default as ThemeProvider } from './ThemeProvider';

export type Theme = ThemeType;
export type ThemeFactory = ThemeFactoryType;

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export const useThemeStyles = <T extends NamedStyles<T> | NamedStyles<any>>(
  stylesFactory: (theme: Theme) => T,
  componentName: string,
): T => {
  return useContext(ThemeContext).getStyles(stylesFactory, componentName);
};
