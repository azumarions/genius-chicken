import { TaskContext } from '@/context/task'
import { ColorContext } from '@/context/theme'
import { Avatar, Badge, Button, CssBaseline, IconButton, Stack } from '@mui/material'
import { deepOrange, purple, red } from '@mui/material/colors'
import { NextPage } from 'next'
import React, { useContext } from 'react'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import CircleIcon from '@mui/icons-material/Circle';
import { createTheme, ThemeProvider } from '@mui/material/styles'

const color: NextPage = () => {
  const { selectedColor, setSelectedColor } = useContext(ColorContext);
  const theme = createTheme({
    palette: {
        mode: 'light',
         
        }  
  })
  
  return (
    // <ThemeProvider theme={theme}>
    //  <CssBaseline />
    <div>
        <Button onClick={() => setSelectedColor("primary")} variant="contained" color="primary">primary</Button>
        <Button onClick={() => setSelectedColor("purple")} variant="contained" color="secondary">secondary</Button>
        <Button onClick={() => setSelectedColor("orange")} variant="contained" color="warning">warning</Button>
        <Stack direction="row" spacing={2} sx={{m:2, p:2}}>
        <Button onClick={() => setSelectedColor("blue")} variant="contained" color="info">info</Button>
        <Button onClick={() => setSelectedColor("green")} variant="contained" color="success">success</Button>
        </Stack>
        <Button sx={{bgcolor: selectedColor, color: "white"}}>theme</Button>
        </div>
    // </ThemeProvider>
  )
}

export default color
