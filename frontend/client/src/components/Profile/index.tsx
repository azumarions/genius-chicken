import { Avatar, Divider, Grid, List, ListItem } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { USER } from '../../types'

type UserType = {
  user: USER
}

const Profile: React.FC<UserType> = ({ user }) => {
  return (
    <List key={user.id}>
      <ListItem>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Avatar
            sx={{
              width: { xs: 150, sm: 180, md: 200, lg: 220 },
              height: { xs: 150, sm: 180, md: 200, lg: 220 },
              margin: 1,
            }}
            srcSet={'default.png?w=248&fit=crop&auto=format&dpr=2 2x'}
            alt={user.name}
            src={'default.png?w=248&fit=crop&auto=format'}
          ></Avatar>
          <Box
            sx={{ fontSize: { xs: 18, sm: 24, md: 26, lg: 28 }, pt: 2, pb: 1 }}
          >
            {user.name}
          </Box>
          <Divider sx={{ display: 'block' }} />
          <Box
            sx={{ fontSize: { xs: 16, sm: 20, md: 22, lg: 25 }, padding: 0.5 }}
          >
            概要
          </Box>
          <Box sx={{ fontSize: { xs: 12, sm: 16, md: 18, lg: 20 } }}>
            {user.description}
          </Box>
          <Box sx={{ fontSize: { xs: 12, sm: 16, md: 18, lg: 20 } }}>
            {user.description}
          </Box>
        </Grid>
      </ListItem>
    </List>
  )
}

export default Profile
