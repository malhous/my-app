import type { PaletteMode } from '@mui/material';
import {
  alpha,
  createTheme,
  lighten,
  type ThemeOptions,
} from '@mui/material/styles';
import { useMemo, useState } from 'react';

export const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'Segoe UI',
      'Roboto',
      'sans-serif',
    ].join(','),
    fontSize: 16,
    h1: { fontSize: '2.625rem', lineHeight: '3.625rem', fontWeight: 500 },
    h2: { fontSize: '2rem', lineHeight: '2.5rem', fontWeight: 500 },
    h3: { fontSize: '1.5rem', lineHeight: '2.25rem', fontWeight: 500 },
    h4: { fontSize: '1.5rem', lineHeight: '2.25rem' },
    subtitle1: { fontSize: '1.25rem', lineHeight: '1.5rem' },
    subtitle2: { fontSize: '1.125rem', lineHeight: '1.375rem' },
    body1: { fontSize: '1rem', lineHeight: '1.5rem' },
    body2: { fontSize: '0.875rem', lineHeight: '1.375rem', fontWeight: 400 },
    caption: { fontSize: '0.75rem', lineHeight: '1.25rem' },
    button: { textTransform: 'none' },
  },
};

const getDesignTokens = (mode: PaletteMode, color: string): ThemeOptions => ({
  ...themeOptions,
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          background: {
            default: '#FFFFFF',
          },
          text: {
            primary: '#141414',
            secondary: '#858585',
          },
          primary: {
            main: color,
            light: alpha(color, 0.2),
          },
          secondary: {
            main: lighten(color, 0.2),
            light: alpha(lighten(color, 0.2), 0.2),
          },
          divider: '#EBEBEB',
        }
      : {
          background: {
            default: '#242424',
          },
          text: {
            primary: '#FFFFFF',
            secondary: '#858585',
          },
          primary: {
            main: color,
            light: alpha(color, 0.2),
          },
          secondary: {
            main: lighten(color, 0.2),
            light: alpha(lighten(color, 0.2), 0.2),
          },
          divider: 'rgba(255, 255, 255, 0.23)',
        }),
  },
});

export const useCustomTheme = (
  initialThemeMode: PaletteMode,
  initialThemeColor: string
) => {
  const [mode, setMode] = useState<PaletteMode>(initialThemeMode);
  const [color, setColor] = useState<string>(initialThemeColor);

  const handlers = useMemo(
    () => ({
      setThemeMode: (mode: PaletteMode) => {
        setMode(mode);
      },
      setThemeColor: (color: string) => {
        if (color) {
          setColor(color);
        }
      },
    }),
    []
  );

  const theme = useMemo(
    () => createTheme(getDesignTokens(mode, color)),
    [mode, color]
  );

  return { theme, handlers };
};
