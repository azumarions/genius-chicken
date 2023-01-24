import { Box, Grid, IconButton } from '@mui/material'
import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (

    <Box sx={{ width: "100%", position: "relative", bottom: 0, bgcolor: "black" }}>
      {/* <Grid container alignItems='center' justifyContent='center' direction="column" sx={{ padding: 2}}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box>
            <Box sx={{ fontSize: 20, color: "white"}}>Todo app</Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
         
            <IconButton><InstagramIcon sx={{ color: "pink" }}/></IconButton>
        
            <IconButton><TwitterIcon sx={{ color: "blue" }}/></IconButton>
         
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Box>
            <Box sx={{ fontSize: 12, color: "white"}}>お問い合わせ</Box>
          </Box>
        </Grid>
      </Grid> */}
    </Box>
  )
}

export default Footer
