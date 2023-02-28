import {
  Box,
  Button,
  CssBaseline,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  List,
  ListSubheader,
  Pagination,
  TableSortLabel,
} from '@mui/material'
import useSWR from 'swr'
import React, { useContext, useEffect, useState } from 'react'
import { GetStaticProps, NextPage } from 'next'
import { getTasks } from '@/api/task'
import { getGroups } from '@/api/group'
import { getMyProf } from '@/api/account'
import { CATEGORY, GROUP, SORT_STATE, TASK, USER } from '@/types'
import { ProfileContext } from '@/context/profile'
import UserProfile from '@/components/UserProfile'
import TaskForm from '@/components/TaskForm'
import { getCategorys } from '@/api/category'
import { TaskContext } from '@/context/task'
import AccountForm from '@/components/AccountForm'
import MyTask from '@/components/MyTask'
import { getUsers } from '@/api/users'

interface STATICPROPS {
  staticTasks: TASK[]
  staticGroups: GROUP[]
  staticCategorys: CATEGORY[]
  staticUsers: USER[]
}

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json())
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/task-list/`

const AccountPage: NextPage<STATICPROPS> = ({
  staticTasks,
  staticGroups,
  staticCategorys,
  staticUsers,
}) => {
  const { myProfile, setMyProfile } = useContext(ProfileContext)
  const { setSelectedTask, setEditTask } = useContext(TaskContext)
  const {
    data: tasks,
    error,
    mutate,
  } = useSWR(apiUrl, fetcher, {
    fallbackData: staticTasks,
    revalidateOnMount: true,
  })

  const columns = tasks[0] && Object.keys(tasks[0])

  const [page, setPage] = useState<number>(1) //ページ番号
  const [pageCount, setPageCount] = useState<number>() //ページ数
  const [allItems, setAllItems] = useState<TASK[]>([]) //全データ
  const displayNum = 20 //1ページあたりの項目数

  const [state, setState] = useState<SORT_STATE>({
    rows: tasks,
    order: 'desc',
    activeKey: '',
  })

  const handleClickSortColumn = (column: keyof TASK) => {
    const isDesc = column === state.activeKey && state.order === 'desc'
    const newOrder = isDesc ? 'asc' : 'desc'
    const sortedRows = Array.from(state.rows).sort((a, b) => {
      if (a[column] > b[column]) {
        return newOrder === 'asc' ? 1 : -1
      } else if (a[column] < b[column]) {
        return newOrder === 'asc' ? -1 : 1
      } else {
        return 0
      }
    })

    setState({
      rows: sortedRows,
      order: newOrder,
      activeKey: column,
    })
  }

  useEffect(() => {
    setState((state) => ({
      ...state,
      rows: tasks.slice((page - 1) * displayNum, page * displayNum),
    }))
  }, [tasks])

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
    setAllItems(state.rows)
    setPageCount(Math.ceil(state.rows.length / displayNum))
  }, [])

  const handleChange = (event: React.ChangeEvent<unknown>, index: number) => {
    setPage(index)
    setState((state) => ({
      ...state,
      rows: allItems.slice((index - 1) * displayNum, index * displayNum),
    }))
  }

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
        <Grid item xs={12} sm={12} md={2} lg={3}></Grid>
        <Grid item xs={12} sm={12} md={8} lg={6}>
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
                EDIT ACCOUNT
              </Button>
            </Grid>
          </Divider>
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={3}></Grid>
        <Grid item xs={12} sm={12} md={2} lg={3}></Grid>
        <Grid item xs={12} sm={12} md={8} lg={6} sx={{ height: 100 }}>
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
                Create task
              </Button>
            </Grid>
          </Divider>
          {state.rows ? (
            <List>
              <ListSubheader
                sx={{
                  textAlign: 'center',
                  borderBlockColor: 'black',
                  height: '10',
                  display: { xs: 'block', sm: 'block', md: 'none' },
                }}
              >
                {columns.map(
                  (column: keyof TASK, colIndex: number) =>
                    (column === 'title' ||
                      column === 'status' ||
                      column === 'estimate' ||
                      column === 'access') && (
                      <TableSortLabel
                        key={colIndex}
                        active={state.activeKey === column}
                        direction={state.order}
                        onClick={() => handleClickSortColumn(column)}
                      >
                        <Box
                          sx={{ fontSize: { xs: 13, sm: 14, md: 16, lg: 18 } }}
                        >
                          {column}
                        </Box>
                      </TableSortLabel>
                    )
                )}
              </ListSubheader>
              <ListSubheader
                sx={{
                  textAlign: 'center',
                  borderBlockColor: 'black',
                  height: '10',
                  display: { xs: 'none', sm: 'none', md: 'block' },
                }}
              >
                {columns.map(
                  (column: keyof TASK, colIndex: number) =>
                    (column === 'title' ||
                      column === 'category' ||
                      column === 'status' ||
                      column === 'estimate' ||
                      column === 'created_at' ||
                      column === 'access') && (
                      <TableSortLabel
                        key={colIndex}
                        active={state.activeKey === column}
                        direction={state.order}
                        onClick={() => handleClickSortColumn(column)}
                      >
                        <Box
                          sx={{ fontSize: { xs: 13, sm: 14, md: 16, lg: 18 } }}
                        >
                          {column}
                        </Box>
                      </TableSortLabel>
                    )
                )}
              </ListSubheader>
              {state.rows &&
                state.rows
                  .filter(
                    (task: TASK) => task.userTask === myProfile.userProfile
                  )
                  .map((task: TASK) => (
                    <Box key={task.id}>
                      <MyTask
                        key={task.id}
                        task={task}
                        staticCategorys={staticCategorys}
                        staticGroups={staticGroups}
                        staticUsers={staticUsers}
                        taskMutate={mutate}
                      />
                    </Box>
                  ))}
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                direction="column"
              >
                {/* <Pagination
                  count={pageCount}
                  page={page}
                  variant="text"
                  color="secondary"
                  size="small"
                  onChange={handleChange}
                /> */}
              </Grid>
            </List>
          ) : (
            <Box>タスクがありません。</Box>
          )}
        </Grid>
      </Grid>

      {/* Task Dialog */}

      <Dialog
        open={openTaskForm}
        onClose={CloseTaskForm}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
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
  const [staticTasks, staticGroups, staticCategorys, staticUsers] =
    await Promise.all([getTasks(), getGroups(), getCategorys(), getUsers()])
  return {
    props: { staticTasks, staticGroups, staticCategorys, staticUsers },
    revalidate: 10,
  }
}
