import Layout from '../components/Layout'
import { getUsers } from '../api/users'
import { GetStaticProps } from 'next'
import { TASK, USER } from '../types'
import React from 'react'
import { Box } from '@mui/system'
import { Grid } from '@mui/material'
import User from '@/components/User'
import { getTasks } from '@/api/task'
import useSWR from 'swr'
import Link from 'next/link'

interface STATICPROPS {
  staticUsers: USER[]
}

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json())
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/profile-list/`

const UserPage: React.FC<STATICPROPS> = ({ staticUsers }) => {
  const {
    data: users,
    error,
    mutate,
  } = useSWR(apiUrl, fetcher, {
    fallbackData: staticUsers,
    revalidateOnMount: true,
  })

  return (
    <Box
      sx={{
        width: '99%',
        margin: '20px auto',
        mt: { xs: 8, sm: 11, md: 12, lg: 14 },
      }}
    >
      <Grid container spacing={0.2}>
        {users.map((user: USER) => (
          <User key={user.id} user={user} />
          // <Link href={`/user/${user.id}`}>{user.name}</Link>
        ))}
      </Grid>
    </Box>
  )
}
export default UserPage

export const getStaticProps: GetStaticProps = async () => {
  const staticUsers = await getUsers()
  return {
    props: { staticUsers },
  }
}
