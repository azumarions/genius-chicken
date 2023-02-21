import React, { useContext, useState } from 'react'
import Cookie from 'universal-cookie'
// import { LikeContext } from '../../contexts/like'
// import { UserContext } from '../../contexts/user'
import FavoriteIcon from '@mui/icons-material/Favorite'
import WorkspacesIcon from '@mui/icons-material/Workspaces'
import {
  Avatar,
  AvatarGroup,
  Box,
  ButtonGroup,
  IconButton,
  ListItem,
  ListItemIcon,
} from '@mui/material'

const cookie = new Cookie()

type LikeType = {
  postId: number
  userId: number
}

const Group: React.FC<LikeType> = ({ postId, userId }) => {
  //   const { likes, setLikes } = useContext(LikeContext)
  //   const { users, setUsers } = useContext(UserContext)
  const [group, setGroup] = useState(false)

  //   const filterLikes = Object.values(likes).filter(
  //     (like) => like.postLike === postId
  //   )

  //   const filterUser = Object.values(users).find((user) =>
  //     likes.map((like) => {
  //       return user.userProfile === like.userLike
  //     })
  //   )

  //   const likedId = Object.values(likes).find(
  //     (like) => like.postLike === postId && like.userLike === userId
  //   )

  //   const LIKED = async (e) => {
  //     e.preventDefault()
  //     await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/like/`, {
  //       method: 'POST',
  //       body: JSON.stringify({ postLike: postId }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `JWT ${cookie.get('access_token')}`,
  //       },
  //     })
  //     setLikes([
  //       ...likes,
  //       { id: likedId?.id, userLike: userId, postLike: postId },
  //     ])
  //     setUsers([
  //       ...users,
  //       {
  //         id: filterUser?.id,
  //         name: filterUser?.name,
  //         description: filterUser?.description,
  //         img: filterUser?.img,
  //       },
  //     ])
  //   }

  //   const UNLIKED = async (e) => {
  //     e.preventDefault()
  //     await fetch(
  //       `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/like/${likedId?.id}`,
  //       {
  //         method: 'DELETE',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `JWT ${cookie.get('access_token')}`,
  //         },
  //       }
  //     )
  //     setLikes([
  //       ...likes,
  //       { id: likedId?.id, userLike: userId, postLike: postId },
  //     ])
  //     setUsers([
  //       ...users,
  //       {
  //         id: 0,
  //         userProfile: 0,
  //         name: '',
  //         statusMessage: '',
  //         description: '',
  //         img: '',
  //       },
  //     ])
  //   }

  return (
    <>
      {/* <ButtonGroup>
        <IconButton sx={{ float: 'right' }}>
          <WorkspacesIcon />
        </IconButton>
      </ButtonGroup> */}
      <ListItemIcon>
        <Box onClick={() => setGroup(!group)}>
          {group ? (
            <IconButton>
              <WorkspacesIcon
                sx={{
                  color: 'purple',
                  fontSize: { xs: 30, sm: 40, md: 45, lg: 50 },
                }}
              />
            </IconButton>
          ) : (
            <IconButton>
              <WorkspacesIcon
                sx={{
                  color: 'pink',
                  fontSize: { xs: 30, sm: 40, md: 45, lg: 50 },
                }}
              />
            </IconButton>
          )}
        </Box>
      </ListItemIcon>
    </>
  )
}

export default Group
