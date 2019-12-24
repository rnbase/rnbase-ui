import React, { useContext } from 'react';

import { Theme } from './theme';
import { ThemeContext, ThemeProps } from './ThemeContext';

export interface WithThemeProps {
  themeKey?: string;
}

export function withTheme<T, P extends ThemeProps<T>>(
  WrappedComponent: React.ComponentType<P>,
  stylesFactory: (theme: Theme) => T,
  defaultThemeKey: string,
) {
  type Props = Omit<P, keyof ThemeProps<T>> & WithThemeProps;

  const ThemedComponent = ({ themeKey = defaultThemeKey, ...props }: Props) => {
    const context = useContext(ThemeContext);
    const themeProps = context.getThemeProps(stylesFactory, themeKey);

    return <WrappedComponent {...themeProps} {...props as P} />;
  };

  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  ThemedComponent.displayName = `withTheme(${displayName})`;

  return ThemedComponent;
}
