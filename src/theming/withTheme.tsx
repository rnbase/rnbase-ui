import React, { useContext } from 'react';

import { Theme } from './theme';
import { ThemeContext, ThemeProps } from './ThemeContext';

export interface WithThemeProps {
  themeKey?: string;
}

type Subtract<T extends K, K> = Omit<T, keyof K>;

export function withTheme<
  S,
  C extends React.ComponentType<React.ComponentProps<C> & ThemeProps<S>>,
  T = JSX.LibraryManagedAttributes<C, Subtract<React.ComponentProps<C>, ThemeProps<S>>>
>(WrappedComponent: C, stylesFactory: (theme: Theme) => S, defaultThemeKey: string) {
  const ThemedComponent = ({ themeKey = defaultThemeKey, ...props }: T & WithThemeProps) => {
    const context = useContext(ThemeContext);
    const themeProps = context.getThemeProps(stylesFactory, themeKey);

    return (
      <WrappedComponent
        {...themeProps}
        {...props as JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>}
      />
    );
  };

  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  ThemedComponent.displayName = `withTheme(${displayName})`;

  return ThemedComponent;
}
