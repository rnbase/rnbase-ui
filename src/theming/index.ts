import { useContext } from 'react';

import ThemeContext from './ThemeContext';

export { default as ThemeProvider } from './ThemeProvider';

export const useTheme = () => {
  const theme = useContext(ThemeContext);

  return theme;
};
