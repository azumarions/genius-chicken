import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { getUser, getUserId, getUsers } from '@/api/users'
import { Box } from '@mui/system'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { GROUP, SORT_STATE, TASK, USER } from '@/types'
import { getTasks } from '@/api/task'
import UserProfile from '@/components/UserProfile'
import {
  Divider,
  Grid,
  List,
  ListSubheader,
  Pagination,
  TableSortLabel,
} from '@mui/material'
import { getGroups } from '@/api/group'
import Task from '@/components/Task'

interface STATICPROPS {
  id: number
  staticUser: USER
  staticTasks: TASK[]
  staticGroups: GROUP[]
  staticUsers: USER[]
}

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json())

const UserDetail: NextPage<STATICPROPS> = ({
  id,
  staticUser,
  staticTasks,
  staticGroups,
  staticUsers,
}) => {
  const router = useRouter()
  const { data: user, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/profile-detail/${id}`,
    fetcher,
    {
      fallbackData: staticUser,
    }
  )

  const { data: tasks } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/task-list/`,
    fetcher,
    {
      fallbackData: staticTasks,
    }
  )

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
    setAllItems(state.rows)
    setPageCount(Math.ceil(state.rows.length / displayNum))
    mutate()
  }, [])

  const handleChange = (event: React.ChangeEvent<unknown>, index: number) => {
    setPage(index)
    setState((state) => ({
      ...state,
      rows: allItems.slice((index - 1) * displayNum, index * displayNum),
    }))
  }

  if (router.isFallback || !user) {
    return <div>Loading...</div>
  }

  return (
    <Grid container sx={{ pt: 8 }}>
      <Grid item xs={12} sm={12} md={2} lg={3}></Grid>
      <Grid item xs={12} sm={12} md={8} lg={6}>
        <UserProfile user={user} />
      </Grid>
      <Grid item xs={12} sm={12} md={2} lg={3}></Grid>
      <Grid item xs={12} sm={12} md={2} lg={3}></Grid>
      <Grid item xs={12} sm={12} md={8} lg={6}>
        <Divider>TASK</Divider>
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
            {tasks &&
              tasks
                .filter((task: TASK) => task.userTask === user.userProfile)
                .map((task: TASK) => (
                  <Box key={task.id}>
                    <Task
                      key={task.id}
                      task={task}
                      staticGroups={staticGroups}
                      staticUsers={staticUsers}
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
  )
}

export default UserDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getUserId()
  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const [staticUser, staticTasks, staticGroups, staticUsers] =
    await Promise.all([
      getUser(ctx.params?.id as string),
      getTasks(),
      getGroups(),
      getUsers(),
    ])
  return {
    props: {
      id: staticUser.id,
      staticUser,
      staticTasks,
      staticGroups,
      staticUsers,
    },
    revalidate: 10,
  }
}
