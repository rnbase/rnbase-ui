import React from 'react';

import { Theme, ThemeProps } from './theme';

import ThemeContext from './ThemeContext';

export default function withTheme<T, P extends ThemeProps<T>>(
  WrappedComponent: React.ComponentType<P>,
  stylesFactory: (theme: Theme) => T,
  defaultThemeKey: string,
) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  // type WrappedComponentInstance = InstanceType<typeof WrappedComponent>;

  type ThemedComponentProps = Omit<P, keyof ThemeProps<T>> & {
    forwardedRef?: React.Ref<React.Component<P> /* WrappedComponentInstance */>;
    themeKey?: string;
  };

  class ThemedComponent extends React.Component<ThemedComponentProps> {
    public static displayName = `withTheme(${displayName})`;

    public render() {
      return (
        <ThemeContext.Consumer>
          {context => {
            const { forwardedRef, themeKey = defaultThemeKey, ...rest } = this.props;
            const themeProps = context.getThemeProps(stylesFactory, themeKey);

            if (WrappedComponent.prototype && WrappedComponent.prototype.isReactComponent) {
              return <WrappedComponent ref={forwardedRef} {...themeProps} {...rest as P} />;
            }

            return <WrappedComponent {...themeProps} {...rest as P} />;
          }}
        </ThemeContext.Consumer>
      );
    }
  }

  return ThemedComponent;
}
