import React, { useContext } from 'react';

import { Theme } from './theme';
import { ThemeContext, ThemeProps } from './ThemeContext';

export type Themed<T extends (...args: any) => any, P> = ThemeProps<ReturnType<T>> & P;

export interface WithThemeProps {
  themeKey?: string;
}

export function useTheme<T>(stylesFactory: (theme: Theme) => T, themeKey: string): ThemeProps<T> {
  return useContext(ThemeContext).getThemeProps(stylesFactory, themeKey);
}

export function withTheme<
  S,
  C extends React.ComponentType<React.ComponentProps<C> & ThemeProps<S>>,
  T = JSX.LibraryManagedAttributes<C, Omit<React.ComponentProps<C>, keyof ThemeProps<S>>>
>(WrappedComponent: C, stylesFactory: (theme: Theme) => S, defaultThemeKey: string) {
  const ThemedComponent = ({ themeKey = defaultThemeKey, ...props }: T & WithThemeProps) => (
    <WrappedComponent
      {...useTheme(stylesFactory, themeKey)}
      {...props as JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>}
    />
  );

  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  ThemedComponent.displayName = `withTheme(${displayName})`;

  return ThemedComponent;
}
