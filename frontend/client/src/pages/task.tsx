import { GetStaticProps, NextPage } from 'next'
import { getTasks } from '../api/task'
import useSWR from 'swr'
import axios from 'axios'
import { TASK } from '../types'
import { useContext, useEffect, useState } from 'react'
import Task from '@/components/Task'
import { Box, Button, Card, Grid, IconButton, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { TaskContext } from '@/context/task'
import TaskForm from '@/components/TaskForm'
import TaskDetail from '@/components/TaskDetail'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface STATICPROPS {
  staticTasks: TASK[]
}

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/task-list/`;

const TaskPage: NextPage<STATICPROPS> = ({ staticTasks }) => {
  const { selectedTask, setSelectedTask, editTask , setEditTask} = useContext(TaskContext);
  const { data: tasks, error, mutate } = useSWR(apiUrl, fetcher, {
    fallbackData: staticTasks,
    revalidateOnMount: true,
  })

  useEffect(() => {
    mutate();
  }, []);

  if (error) return <span>Error!</span>
  return (
    <div title="Todos">
      <Box sx={{ width: '100%', height: '100%' }}>
        <Grid container textAlign="center" justifyItems="center">
        
          <Grid item xs={12} sm={12} md={6} lg={6} sx={{ width: '100%', height: 265,}}>
        <Button size="small" variant="contained" color="primary" onClick={() => {
          setEditTask({
            id: 0,
            userTask: 0,
            title: "",
            description: "",
            status: "1",
          });
          setSelectedTask({
            id: 0,
            userTask: 0,
            title: "",
            description: "",
            status: "1",
            status_name: "",
            created_at: "",
          })}}>
          タスク作成
        </Button>
            {selectedTask.id ? <TaskDetail /> :
            <TaskForm taskCreated={mutate} />
            }
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} sx={{ width: '100%', height: 280,}}>
            <List sx={{ height: '100%', overflow: 'auto',}}>
                  {tasks &&
                    tasks.map((task: TASK) => (
                      // <ListItem key={task.id} >
                          <Task key={task.id} task={task} mutate={mutate} />
                      // </ListItem>
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
  return {
    props: { staticTasks },
  }
}