import React from 'react';
import { theme, ThemeType } from './';

export const ThemeContext: React.Context<ThemeType> = React.createContext(theme);
