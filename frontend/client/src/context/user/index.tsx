import React, { createContext, useState, Dispatch } from 'react'
import { USER } from '../../types'

type UserContextType = {
  selectedUser: USER
  selectedUsers: USER[]
  setSelectedUsers: Dispatch<React.SetStateAction<USER[]>>
  setSelectedUser: Dispatch<React.SetStateAction<USER>>
}

interface UserContextProviderProps {
  children: React.ReactNode
}

export const UserContext = createContext<UserContextType>(
  {} as {
    selectedUser: USER
    selectedUsers: USER[]
    setSelectedUsers: Dispatch<React.SetStateAction<USER[]>>
    setSelectedUser: Dispatch<React.SetStateAction<USER>>
  }
)

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [selectedUsers, setSelectedUsers] = useState<USER[]>([
    {
      id: 0,
      userProfile: 0,
      name: '',
      description: '',
      created_at: '',
    },
  ])
  const [selectedUser, setSelectedUser] = useState<USER>({
    id: 0,
    userProfile: 0,
    name: '',
    description: '',
    created_at: '',
  })

  return (
    <UserContext.Provider
      value={{
        selectedUsers,
        setSelectedUsers,
        selectedUser,
        setSelectedUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
