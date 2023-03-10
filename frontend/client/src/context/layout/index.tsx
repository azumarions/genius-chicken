import * as React from 'react'
import { createContext } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

interface ColorModeContextProviderProps {
  children: React.ReactNode
}

export const ColorModeContext = createContext({ toggleColorMode: () => {} })

export const ColorModeContextProvider = ({
  children,
}: ColorModeContextProviderProps) => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark')
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    []
  )

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: 'rgba(120,120,120,0.8)',
          },
          secondary: {
            main: '#424242',
          },
          success: {
            // 千歳緑
            main: 'rgba(176,151,097,0.8)',
          },
          error: {
            // 真紅
            main: '#864152',
          },
          warning: {
            main: '#316745',
          },
          info: {
            main: 'rgba(122,044,029)',
          },
        },
      }),
    [mode]
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
