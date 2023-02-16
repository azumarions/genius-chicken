import React, { createContext, Dispatch, useState } from 'react'
import { EDIT_TASK, TASK } from '../../types'

type TaskContextType = {
  selectedTask: TASK
  setSelectedTask: Dispatch<React.SetStateAction<TASK>>
  editTask: EDIT_TASK
  setEditTask: Dispatch<React.SetStateAction<EDIT_TASK>>
}

interface TaskContextProviderProps {
  children: React.ReactNode
}

export const TaskContext = createContext<TaskContextType>(
  {} as {
    selectedTask: TASK
    setSelectedTask: Dispatch<React.SetStateAction<TASK>>
    editTask: EDIT_TASK
    setEditTask: Dispatch<React.SetStateAction<EDIT_TASK>>
  }
)

export default function TaskContextProvider({
  children,
}: TaskContextProviderProps) {
  const [selectedTask, setSelectedTask] = useState({
    id: 0,
    userTask: 0,
    title: '',
    description: '',
    status: '',
    status_name: '',
    category: 0,
    category_item: '',
    created_at: '',
    updated_at: '',
  })
  const [editTask, setEditTask] = useState({
    id: 0,
    userTask: 0,
    title: '',
    description: '',
    status: '',
    category: 0,
    category_item: '',
  })
  return (
    <TaskContext.Provider
      value={{
        selectedTask,
        setSelectedTask,
        editTask,
        setEditTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
