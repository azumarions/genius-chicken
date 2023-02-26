import axios from 'axios'
import React, { createContext, useState, useEffect, Dispatch } from 'react'
import { getMyProf } from '../../api/account'
import { PROFILE } from '../../types'
import Cookie from 'universal-cookie'

const cookie = new Cookie()

// { id: 0, userProfile: "", name: "", statusMessage: "", description: "", img: "", }

type ProfileContextType = {
  editProfile: PROFILE
  setEditProfile: Dispatch<React.SetStateAction<PROFILE>>
  myProfile: PROFILE
  setMyProfile: Dispatch<React.SetStateAction<PROFILE>>
}

interface ProfileContextProviderProps {
  children: React.ReactNode
}

export const ProfileContext = createContext<ProfileContextType>(
  {} as {
    editProfile: PROFILE
    myProfile: PROFILE
    setEditProfile: Dispatch<React.SetStateAction<PROFILE>>
    setMyProfile: Dispatch<React.SetStateAction<PROFILE>>
  }
)

export const ProfileContextProvider = ({
  children,
}: ProfileContextProviderProps) => {
  const [editProfile, setEditProfile] = useState<PROFILE>({
    id: 0,
    userProfile: 0,
    name: '',
    description: '',
    created_at: '',
  })
  const [myProfile, setMyProfile] = useState<PROFILE>({
    id: 0,
    userProfile: 0,
    name: '',
    description: '',
    created_at: '',
  })

  return (
    <ProfileContext.Provider
      value={{
        editProfile,
        setEditProfile,
        myProfile,
        setMyProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}
