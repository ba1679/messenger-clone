'use client';

import { ThemeProvider } from '@emotion/react';
import { CssBaseline, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00b0ff',
    },
    info: {
      main: '#676767',
    },
  },
  spacing: 4,
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: '#ffffff',
        },
      },
    },
  },
});

export default function MuiThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
