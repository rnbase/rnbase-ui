import React from 'react';
import theme, { ThemeType } from './theme';

const ThemeContext: React.Context<ThemeType> = React.createContext(theme);

export default ThemeContext;
