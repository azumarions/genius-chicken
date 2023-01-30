import * as React from 'react';
import { createContext } from 'react';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Header from '../../components/Header';


interface ColorModeContextProviderProps {
    children: React.ReactNode
}

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const ColorModeContextProvider = ({ children }: ColorModeContextProviderProps ) => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}