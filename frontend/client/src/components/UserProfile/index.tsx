import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'
import React from 'react'
import { USER } from '@/types'

type UserType = {
  user: USER
}

const UserProfile: React.FC<UserType> = ({ user }) => {
  return (
    <List key={user.id}>
      <ListItem>
        <ListItemAvatar>
          <Avatar
            sx={{
              width: { xs: 70, sm: 75, md: 80, lg: 90 },
              height: { xs: 70, sm: 75, md: 80, lg: 90 },
              margin: 1,
            }}
            src={'/default.png?w=248&fit=crop&auto=format'}
            srcSet={'/default.png?w=248&fit=crop&auto=format&dpr=2 2x'}
            alt={'default'}
          />
        </ListItemAvatar>
        <ListItemText primary={user.name} secondary={user.description} />
      </ListItem>
    </List>
  )
}

export default UserProfile
