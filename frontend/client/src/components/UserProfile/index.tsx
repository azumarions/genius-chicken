import { Avatar, Divider, Grid, List, ListItem } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { USER } from '@/types'
import Image from 'next/image'

type UserType = {
  user: USER
}

const UserProfile: React.FC<UserType> = ({ user }) => {
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
              width: { xs: 80, sm: 90, md: 100, lg: 110 },
              height: { xs: 80, sm: 90, md: 100, lg: 110 },
              margin: 1,
            }}
            src={'/default.png?w=248&fit=crop&auto=format'}
            srcSet={'/default.png?w=248&fit=crop&auto=format&dpr=2 2x'}
            alt={'default'}
          />
          <Box
            sx={{ fontSize: { xs: 18, sm: 21, md: 23, lg: 25 }, pt: 2, pb: 1 }}
          >
            {user.name}
          </Box>
          <Box sx={{ fontSize: { xs: 12, sm: 14, md: 16, lg: 18 } }}>
            {user.description}
          </Box>
        </Grid>
      </ListItem>
    </List>
  )
}

export default UserProfile
