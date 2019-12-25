import { ThemeProps } from './ThemeContext';

export * from './theme';
export * from './withTheme';

export { default as ThemeProvider } from './ThemeProvider';

export type Themed<T extends (...args: any) => any, P> = ThemeProps<ReturnType<T>> & P;
