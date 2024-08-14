import { ThemeProvider, useMediaQuery } from '@mui/material';
import React from 'react';

import { useCustomTheme } from './theme';

export const CustomThemeProvider: React.FC<{ children?: React.ReactNode }> = (
  props
) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const initialThemeMode = prefersDarkMode ? 'dark' : 'light';

  const { theme } = useCustomTheme(initialThemeMode, '#acc03f');

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};
