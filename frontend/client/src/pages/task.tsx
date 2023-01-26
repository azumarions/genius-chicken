import { GetStaticProps, NextPage } from 'next'
import { getTasks } from '../api/task'
import useSWR from 'swr'
import axios from 'axios'
import { TASK } from '../types'
import { useEffect } from 'react'
import Task from '@/components/Task'

interface STATICPROPS {
  staticTasks: TASK[]
}

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/task-list/`;

const TaskPage: NextPage<STATICPROPS> = ({ staticTasks }) => {
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
      <ul>
        {tasks &&
          tasks.map((task: TASK) => (
            <Task key={task.id} task={task} mutate={mutate} />
          ))}
      </ul>
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