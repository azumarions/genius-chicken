import {
  Box,
  Button,
  CssBaseline,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
} from '@mui/material'
import useSWR from 'swr'
import React, { useContext, useEffect, useState } from 'react'
import { GetStaticProps, NextPage } from 'next'
import { getTasks } from '@/api/task'
import { getGroups } from '@/api/group'
import { getMyProf } from '@/api/account'
import { CATEGORY, GROUP, PROFILE, TASK, USER } from '@/types'
import { ProfileContext } from '@/context/profile'
import UserProfile from '@/components/UserProfile'
import UserTask from '@/components/MyTask'
import TaskForm from '@/components/TaskForm'
import { getCategorys } from '@/api/category'
import { TaskContext } from '@/context/task'
import AccountForm from '@/components/AccountForm'
import MyTask from '@/components/MyTask'

interface STATICPROPS {
  staticTasks: any
  staticGroups: GROUP[]
  staticCategorys: CATEGORY[]
}

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json())
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/task-list/`

const AccountPage: NextPage<STATICPROPS> = ({
  staticTasks,
  staticGroups,
  staticCategorys,
}) => {
  const { myProfile, setMyProfile, setEditProfile } = useContext(ProfileContext)
  const { setSelectedTask, setEditTask } = useContext(TaskContext)
  const {
    data: tasks,
    error,
    mutate,
  } = useSWR(apiUrl, fetcher, {
    fallbackData: staticTasks,
    revalidateOnMount: true,
  })
  useEffect(() => {
    const filter = async () => {
      try {
        const resProfile = await getMyProf()
        resProfile && setMyProfile(resProfile[0])
      } catch {
        console.log('error')
      }
    }
    filter()
  }, [])

  const [openTaskForm, setOpenTaskForm] = useState(false)

  const OpenTaskForm = () => () => {
    setOpenTaskForm(true)
  }

  const CloseTaskForm = () => {
    setOpenTaskForm(false)
  }

  const [openAccountForm, setOpenAccountForm] = useState(false)

  const OpenAccountForm = () => () => {
    setOpenAccountForm(true)
  }

  const CloseAccountForm = () => {
    setOpenAccountForm(false)
  }
  return (
    <>
      <CssBaseline />
      <Grid container sx={{ pt: 8 }}>
        <Grid item xs={12} sm={12} md={1} lg={2}></Grid>
        <Grid item xs={12} sm={12} md={10} lg={8}>
          <UserProfile user={myProfile} />
          <Divider variant="middle">
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              direction="column"
            >
              <Button
                size="small"
                variant="outlined"
                color="success"
                onClick={() => {
                  OpenAccountForm()
                  setOpenAccountForm(true)
                }}
              >
                Edit Account
              </Button>
            </Grid>
          </Divider>
        </Grid>
        <Grid item xs={12} sm={12} md={1} lg={2}></Grid>
        <Grid item xs={12} sm={12} md={1} lg={2}></Grid>
        <Grid item xs={12} sm={12} md={10} lg={8}>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Divider variant="middle">
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              direction="column"
            >
              <Button
                size="small"
                variant="outlined"
                color="success"
                onClick={() => {
                  OpenTaskForm()
                  setOpenTaskForm(true)
                  setEditTask({
                    id: 0,
                    userTask: 0,
                    title: '',
                    description: '',
                    status: '1',
                    access: '1',
                    estimate: 1,
                    category: 1,
                    category_item: '',
                  })
                  setSelectedTask({
                    id: 0,
                    userTask: 0,
                    title: '',
                    description: '',
                    status: '1',
                    status_name: '',
                    access: '1',
                    access_name: '',
                    estimate: 1,
                    category: 1,
                    category_item: '',
                    created_at: '',
                    updated_at: '',
                  })
                }}
              >
                Create Task
              </Button>
            </Grid>
          </Divider>
          {tasks &&
            tasks
              .filter((task: TASK) => task.userTask === myProfile.userProfile)
              .map((task: TASK) => (
                <Box key={task.id}>
                  <MyTask
                    key={task.id}
                    task={task}
                    staticCategorys={staticCategorys}
                    taskMutate={mutate}
                  />
                </Box>
              ))}
        </Grid>
      </Grid>

      {/* Task Dialog */}

      <Dialog
        open={openTaskForm}
        onClose={CloseTaskForm}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="scroll-dialog-title"
          sx={{
            fontSize: { xs: 18, sm: 24, md: 26, lg: 28 },
            padding: 2,
            textAlign: 'center',
          }}
        >
          NEW TASK
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <TaskForm
              staticCategorys={staticCategorys}
              taskMutate={mutate}
              CloseTaskForm={CloseTaskForm}
            />
          </Grid>
        </DialogContent>
      </Dialog>

      {/* Account Dialog */}

      <Dialog
        open={openAccountForm}
        onClose={CloseAccountForm}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="scroll-dialog-title"
          sx={{
            fontSize: { xs: 18, sm: 24, md: 26, lg: 28 },
            padding: 2,
            textAlign: 'center',
          }}
        >
          Edit Account
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <AccountForm
              staticAccount={myProfile}
              CloseAccountForm={CloseAccountForm}
            />
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AccountPage

export const getStaticProps: GetStaticProps = async () => {
  const [staticTasks, staticGroups, staticCategorys] = await Promise.all([
    getTasks(),
    getGroups(),
    getCategorys(),
  ])
  return {
    props: { staticTasks, staticGroups, staticCategorys },
    revalidate: 10,
  }
}
