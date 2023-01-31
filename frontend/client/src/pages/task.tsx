import { GetStaticProps, NextPage } from 'next'
import { getTasks } from '../api/task'
import { getCategorys } from '../api/category'
import useSWR from 'swr'
import axios from 'axios'
import { CATEGORY, SORT_STATE, TASK } from '../types'
import { useContext, useEffect, useState } from 'react'
import Task from '@/components/Task'
import { Box, Button, Card, Grid, IconButton, List, ListItem, ListSubheader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material'
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { TaskContext } from '@/context/task'
import TaskForm from '@/components/TaskForm'
import TaskDetail from '@/components/TaskDetail'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface STATICPROPS {
  staticTasks: TASK[]
  staticCategorys: CATEGORY[]
}

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/task-list/`;

const TaskPage: NextPage<STATICPROPS> = ({ staticTasks, staticCategorys }) => {
  const { selectedTask, setSelectedTask, editTask , setEditTask} = useContext(TaskContext);
  const { data: tasks, error, mutate } = useSWR(apiUrl, fetcher, {
    fallbackData: staticTasks,
    revalidateOnMount: true,
  })
  const columns = tasks[0] && Object.keys(tasks[0]);

  const [state, setState] = useState<SORT_STATE>({
    rows: tasks,
    order: "desc",
    activeKey: "",
  });

  const handleClickSortColumn = (column: keyof TASK) => {
    const isDesc = column === state.activeKey && state.order === "desc";
    const newOrder = isDesc ? "asc" : "desc";
    const sortedRows = Array.from(state.rows).sort((a, b) => {
      if (a[column] > b[column]) {
        return newOrder === "asc" ? 1 : -1;
      } else if (a[column] < b[column]) {
        return newOrder === "asc" ? -1 : 1;
      } else {
        return 0;
      }
    });

    setState({
      rows: sortedRows,
      order: newOrder,
      activeKey: column,
    });
  };

  useEffect(() => {
    setState((state) => ({
      ...state,
      rows: tasks,
    }));
  }, [tasks]);

  useEffect(() => {
    mutate();
  }, []);

  if (error) return <span>Error!</span>
  
  return (
    <div title="Todos">
      <Box sx={{ width: '100%', height: '100%' }}>
        <Grid container textAlign="center" justifyItems="center">
        
          <Grid item xs={12} sm={12} md={6} lg={6} sx={{ width: '100%', height: {xs: 265, md: 400}}}>
        <Button size="small" variant="contained" color="primary" onClick={() => {
          setEditTask({
            id: 0,
            userTask: 0,
            title: "",
            description: "",
            status: "1",
            category: 0,
            category_item: "",
          });
          setSelectedTask({
            id: 0,
            userTask: 0,
            title: "",
            description: "",
            status: "1",
            status_name: "",
            category: 0,
            category_item: "",
            created_at: "",
            updated_at: "",
          })}}>
          タスク作成
        </Button>
            {selectedTask.id ? <TaskDetail /> :
            <TaskForm categorys={staticCategorys} mutate={mutate} />
            }
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} sx={{ width: '100%', height: {xs: 300, md: 400,}}}>
            <List sx={{ height: '100%', overflow: 'auto',}}>
            <ListSubheader sx={{ borderBlockColor: "black"}}>
            {columns.map(
                (column: keyof TASK, colIndex: number) =>
                  (
                    column === "id" ||
                    column === "category" ||
                    column === "status" ||
                    column === "created_at"
                    ) && (
                    // <TableCell align="center" key={colIndex}>
                      <TableSortLabel
                      active={state.activeKey === column}
                      direction={state.order}
                        onClick={() => handleClickSortColumn(column)}
                      >
                        <Box sx={{ fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },}}>{column}</Box>
                      </TableSortLabel>
                    // </TableCell>
                  )
              )}
              </ListSubheader>
                  {state.rows &&
                      state.rows.map((row, rowIndex) => (
                          <Task key={rowIndex} task={row} mutate={mutate} />
                    ))}
            </List>
          </Grid>
        </Grid> 
      </Box>
    </div>
  )
}
export default TaskPage

export const getStaticProps: GetStaticProps = async () => {
  const staticTasks = await getTasks()
  const staticCategorys = await getCategorys()
  return {
    props: { staticTasks, staticCategorys },
  }
}