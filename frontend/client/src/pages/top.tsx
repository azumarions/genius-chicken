import { GetStaticProps, NextPage } from 'next'
import { getTasks } from '../api/task'
import { getCategorys } from '../api/category'
import useSWR from 'swr'
import { CATEGORY, CLUSTER, GROUP, SORT_STATE, TASK, USER } from '../types'
import { useContext, useEffect, useState } from 'react'
import Task from '@/components/Task'
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  List,
  ListItem,
  ListSubheader,
  Pagination,
  Stack,
  TableSortLabel,
  TextField,
} from '@mui/material'
import { TaskContext } from '@/context/task'
import TaskForm from '@/components/TaskForm'
import TaskDetail from '@/components/TaskDetail'
import { getClusters } from '@/api/cluster'
import { ProfileContext } from '@/context/profile'
import { getGroups } from '@/api/group'
import { getUsers } from '@/api/users'

interface STATICPROPS {
  staticTasks: any
  staticCategorys: CATEGORY[]
  staticGroups: GROUP[]
  staticUsers: USER[]
}

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json())
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/task-list/`

const TaskPage: NextPage<STATICPROPS> = ({
  staticTasks,
  staticCategorys,
  staticGroups,
  staticUsers,
}) => {
  const columns = staticTasks[0] && Object.keys(staticTasks[0])

  const [page, setPage] = useState<number>(1) //ページ番号
  const [pageCount, setPageCount] = useState<number>() //ページ数
  const [allItems, setAllItems] = useState<TASK[]>([]) //全データ
  const displayNum = 20 //1ページあたりの項目数

  const [state, setState] = useState<SORT_STATE>({
    rows: staticTasks,
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
      rows: staticTasks.slice((page - 1) * displayNum, page * displayNum),
    }))
  }, [staticTasks])

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

  const { myProfile, setMyProfile } = useContext(ProfileContext)
  // if (error) return <span>Error!</span>

  return (
    <div title="Todos">
      <Box
        sx={{
          width: '100%',
          height: '100%',
          mt: { xs: 8, sm: 11, md: 12, lg: 14 },
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          sx={{
            width: '100%',
            // height: { xs: 280, sm: 310, md: 600, lg: 600 },
          }}
        >
          <List sx={{ height: '100%', overflow: 'auto', pt: 0 }}>
            <ListSubheader sx={{ borderBlockColor: 'black', height: '10' }}>
              {columns.map(
                (column: keyof TASK, colIndex: number) =>
                  (column === 'title' ||
                    column === 'category' ||
                    column === 'status' ||
                    column === 'created_at') && (
                    <TableSortLabel
                      key={colIndex}
                      active={state.activeKey === column}
                      direction={state.order}
                      onClick={() => handleClickSortColumn(column)}
                    >
                      <Box
                        sx={{ fontSize: { xs: 11, sm: 14, md: 16, lg: 18 } }}
                      >
                        {column}
                      </Box>
                    </TableSortLabel>
                  )
              )}
            </ListSubheader>
            {state.rows &&
              state.rows.map((row, rowIndex) => (
                <Task
                  key={rowIndex}
                  task={row}
                  staticGroups={staticGroups}
                  staticUsers={staticUsers}
                  // taskMutate={mutate}
                />
              ))}
            <Box sx={{ textAlign: 'center', justifyItems: 'center' }}>
              <Pagination
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
        {/* </Grid> */}
      </Box>
    </div>
  )
}
export default TaskPage

export const getStaticProps: GetStaticProps = async () => {
  const [staticTasks, staticCategorys, staticGroups, staticUsers] =
    await Promise.all([getTasks(), getCategorys(), getGroups(), getUsers()])
  return {
    props: { staticTasks, staticCategorys, staticGroups, staticUsers },
    revalidate: 10,
  }
}
