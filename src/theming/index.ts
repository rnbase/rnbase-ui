import { useContext } from 'react';
import { ThemeContext, ThemeProps } from './ThemeContext';
import { Theme } from './theme';

export * from './theme';
export * from './withTheme';

export { default as ThemeProvider } from './ThemeProvider';

export type Themed<T extends (...args: any) => any, P> = ThemeProps<ReturnType<T>> & P;

export const useTheme = (): Theme => useContext(ThemeContext).theme;
