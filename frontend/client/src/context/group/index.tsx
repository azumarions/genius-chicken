import React, { createContext, Dispatch, useState } from 'react'
import { GROUP } from '../../types'

type GroupContextType = {
  selectedGroup: GROUP
  selectedGroups: GROUP[]
  setSelectedGroup: Dispatch<React.SetStateAction<GROUP>>
  setSelectedGroups: Dispatch<React.SetStateAction<GROUP[]>>
}

interface GroupContextProviderProps {
  children: React.ReactNode
}

export const GroupContext = createContext<GroupContextType>(
  {} as {
    selectedGroup: GROUP
    selectedGroups: GROUP[]
    setSelectedGroup: Dispatch<React.SetStateAction<GROUP>>
    setSelectedGroups: Dispatch<React.SetStateAction<GROUP[]>>
  }
)

export default function GroupContextProvider({
  children,
}: GroupContextProviderProps) {
  const [selectedGroup, setSelectedGroup] = useState({
    id: 0,
    userGroup: 0,
    taskGroup: 0,
    created_at: '',
  })
  const [selectedGroups, setSelectedGroups] = useState([
    {
      id: 0,
      userGroup: 0,
      taskGroup: 0,
      created_at: '',
    },
  ])
  return (
    <GroupContext.Provider
      value={{
        selectedGroup,
        setSelectedGroup,
        selectedGroups,
        setSelectedGroups,
        // editTask,
        // setEditTask,
      }}
    >
      {children}
    </GroupContext.Provider>
  )
}
