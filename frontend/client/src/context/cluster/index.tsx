import React, { createContext, Dispatch, useState } from 'react'
import { CLUSTER } from '../../types'

type ClusterContextType = {
  selectedCluster: CLUSTER[]
  setSelectedCluster: Dispatch<React.SetStateAction<CLUSTER[]>>
  //   editTask: EDIT_GROUP
  //   setEditTask: Dispatch<React.SetStateAction<EDIT_GROUP>>
}

interface ClusterContextProviderProps {
  children: React.ReactNode
}

export const ClusterContext = createContext<ClusterContextType>(
  {} as {
    selectedCluster: CLUSTER[]
    setSelectedCluster: Dispatch<React.SetStateAction<CLUSTER[]>>
    // editTask: EDIT_TASK
    // setEditTask: Dispatch<React.SetStateAction<EDIT_TASK>>
  }
)

export default function ClusterContextProvider({
  children,
}: ClusterContextProviderProps) {
  const [selectedCluster, setSelectedCluster] = useState([
    {
      id: 0,
      userCluster: 0,
      taskCluster: 0,
      task_title: '',
      task_description: '',
      task_status: '',
      task_access: '',
      task_category: 0,
      task_estimate: 0,
      task_created_at: '',
      task_updated_at: '',
      user_name: '',
      user_description: '',
      created_at: '',
    },
  ])
  //   const [editTask, setEditTask] = useState({
  //     id: 0,
  //     userGroup: 0,
  //     taskGroup: 0,
  //   })
  return (
    <ClusterContext.Provider
      value={{
        selectedCluster,
        setSelectedCluster,
        // editTask,
        // setEditTask,
      }}
    >
      {children}
    </ClusterContext.Provider>
  )
}
