import { GetStaticProps, NextPage } from 'next'
import { getTasks } from '../api/task'
import { GROUP, SORT_STATE, TASK, USER } from '../types'
import { useEffect, useState } from 'react'
import Task from '@/components/Task'
import {
  Box,
  Divider,
  Grid,
  List,
  ListSubheader,
  Pagination,
  TableSortLabel,
} from '@mui/material'
import { getGroups } from '@/api/group'
import { getUsers } from '@/api/users'
import useSWR from 'swr'

interface STATICPROPS {
  staticTasks: TASK[]
  staticGroups: GROUP[]
  staticUsers: USER[]
}

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json())
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/task-list/`

const TaskPage: NextPage<STATICPROPS> = ({
  staticTasks,
  staticGroups,
  staticUsers,
}) => {
  const { data: tasks } = useSWR(apiUrl, fetcher, {
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

  return (
    <Grid
      container
      sx={{
        width: '100%',
        height: '100%',
        mt: { xs: 8, sm: 11, md: 12, lg: 14 },
      }}
    >
      <Grid item xs={12} sm={12} md={2} lg={3}></Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={8}
        lg={6}
        sx={{
          width: '100%',
        }}
      >
        <List sx={{ height: '100%', overflow: 'auto', pt: 0 }}>
          <Divider>SORTING</Divider>
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
                    <Box sx={{ fontSize: { xs: 13, sm: 14, md: 16, lg: 18 } }}>
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
                    <Box sx={{ fontSize: { xs: 13, sm: 14, md: 16, lg: 18 } }}>
                      {column}
                    </Box>
                  </TableSortLabel>
                )
            )}
          </ListSubheader>
          <Divider>TASKS</Divider>

          {state.rows &&
            state.rows.map((row, rowIndex) => (
              <Task
                key={rowIndex}
                task={row}
                staticGroups={staticGroups}
                staticUsers={staticUsers}
              />
            ))}
          <Box sx={{ textAlign: 'center', justifyItems: 'center' }}>
            <Pagination
              sx={{ textAlign: 'center' }}
              count={pageCount}
              page={page}
              variant="text"
              color="secondary"
              size="small"
              onChange={handleChange}
            />
          </Box>
        </List>
      </Grid>
    </Grid>
  )
}
export default TaskPage

export const getStaticProps: GetStaticProps = async () => {
  const [staticTasks, staticGroups, staticUsers] = await Promise.all([
    getTasks(),
    getGroups(),
    getUsers(),
  ])
  return {
    props: { staticTasks, staticGroups, staticUsers },
    revalidate: 10,
  }
}
