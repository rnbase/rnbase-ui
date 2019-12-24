export * from './theme';
export * from './withTheme';

export { default as ThemeProvider } from './ThemeProvider';

export type Stylized<T extends (...args: any) => any, P> = P & {
  styles: ReturnType<T>;
};
