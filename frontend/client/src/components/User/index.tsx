import React from 'react'
import router from 'next/router'
import { USER } from '../../types'
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import Image from 'next/image'

type UserType = {
  user: USER
}

const User: React.FC<UserType> = ({ user }) => {
  const userDetail = () => {
    router.push(`/user/${user.id}`)
  }

  return (
    <>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <List key={user.id}>
          <ListItem onClick={userDetail}>
            <ListItemAvatar>
              <Avatar
                sx={{
                  width: { xs: 50, sm: 70, md: 80, lg: 90 },
                  height: { xs: 50, sm: 70, md: 80, lg: 90 },
                  mr: 2,
                }}
                src={'/default.png?w=248&fit=crop&auto=format'}
                srcSet={'/default.png?w=248&fit=crop&auto=format&dpr=2 2x'}
                alt={'default'}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontSize: { xs: 15, sm: 20, md: 23, lg: 25 },
                    padding: 0,
                  }}
                >
                  {user.name}
                </Typography>
              }
              // secondary={
              //   <Typography
              //     sx={{
              //       fontSize: { xs: 12, sm: 17, md: 20, lg: 22 },
              //       padding: 0,
              //     }}
              //   >
              //     {user.description}
              //   </Typography>
              // }
            />
          </ListItem>
        </List>
      </Grid>
    </>
  )
}
export default User