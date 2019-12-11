import React from 'react';
import { Theme, resolveTheme } from './theme';

const ThemeContext: React.Context<Theme> = React.createContext(resolveTheme());

export default ThemeContext;
