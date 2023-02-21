import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { getUser, getUserId } from '@/api/users'
import { Box } from '@mui/system'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { TASK, USER } from '@/types'
import { getTasks } from '@/api/task'
import UserTask from '@/components/UserTask'
import UserProfile from '@/components/UserProfile'
import { Grid } from '@mui/material'

interface STATICPROPS {
  id: number
  staticUser: USER
  staticTasks: TASK[]
}

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json())

const UserDetail: NextPage<STATICPROPS> = ({ id, staticUser, staticTasks }) => {
  const router = useRouter()
  const { data: user } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/profile-detail/${id}`,
    fetcher,
    {
      fallbackData: staticUser,
    }
  )

  const { data: tasks, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/task-list`,
    fetcher,
    {
      fallbackData: staticTasks,
      revalidateOnMount: true,
    }
  )

  useEffect(() => {
    mutate()
  }, [])
  if (router.isFallback || !user) {
    return <div>Loading...</div>
  }
  return (
    <Grid container sx={{ pt: 8 }}>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <UserProfile user={user} />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        {tasks &&
          tasks
            .filter((task: TASK) => task.userTask === user.userProfile)
            .map((task: TASK) => (
              <Box key={task.id}>
                <UserTask key={task.id} task={task} />
              </Box>
            ))}
      </Grid>
    </Grid>
  )
}

export default UserDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getUserId()
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  //   const staticUser = await getUser(ctx.params?.id as string)
  const [staticUser, staticTasks] = await Promise.all([
    getUser(ctx.params?.id as string),
    getTasks(),
  ])
  return {
    props: {
      id: staticUser.id,
      staticUser,
      staticTasks,
    },
    revalidate: 3,
  }
}
