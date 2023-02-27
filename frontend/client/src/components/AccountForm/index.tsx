import React, { useContext } from 'react'
import Cookie from 'universal-cookie'
import { Box, Button, Container, TextField } from '@mui/material'
import { USER } from '@/types'
import { ProfileContext } from '@/context/profile'

const cookie = new Cookie()

type Type = {
  staticAccount: USER
  CloseAccountForm: any
}

const AccountForm: React.FC<Type> = ({ staticAccount, CloseAccountForm }) => {
  const { myProfile, setMyProfile } = useContext(ProfileContext)

  const update = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/profile/${myProfile.id}/`,
      {
        method: 'PUT',
        body: JSON.stringify({
          name: myProfile.name,
          description: myProfile.description,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${cookie.get('access_token')}`,
        },
      }
    ).then((res) => {
      if (res.status === 401) {
        alert('JWT Token not valid')
      } else {
      }
    })
  }

  return (
    <Container component="main">
      <Box
        component="form"
        onSubmit={update}
        sx={{ width: '100%', flexDirection: 'column', alignItems: 'center' }}
      >
        <TextField
          id="standard-helperText"
          label="Name"
          fullWidth
          variant="standard"
          sx={{ fontSize: { xs: 16, sm: 16, md: 16, lg: 18 } }}
          inputProps={{ style: { fontSize: 16 } }}
          value={myProfile.name}
          onChange={(e) => setMyProfile({ ...myProfile, name: e.target.value })}
        />
        <TextField
          id="standard-helperText"
          label="Description"
          fullWidth
          multiline
          variant="standard"
          sx={{ fontSize: { xs: 16, sm: 16, md: 16, lg: 18 }, mt: 1 }}
          inputProps={{ style: { fontSize: 16 } }}
          value={myProfile.description}
          onChange={(e) =>
            setMyProfile({ ...myProfile, description: e.target.value })
          }
        />
        <Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={myProfile.name.length === 0}
            color="success"
            sx={{ mt: 2 }}
            onClick={() => {
              CloseAccountForm()
            }}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default AccountForm
