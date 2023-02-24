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
  myProfile: PROFILE[]
  setMyProfile: Dispatch<React.SetStateAction<PROFILE[]>>
}

interface ProfileContextProviderProps {
  children: React.ReactNode
}

export const ProfileContext = createContext<ProfileContextType>(
  {} as {
    editProfile: PROFILE
    myProfile: PROFILE[]
    setEditProfile: Dispatch<React.SetStateAction<PROFILE>>
    setMyProfile: Dispatch<React.SetStateAction<PROFILE[]>>
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
  })
  const [myProfile, setMyProfile] = useState<PROFILE[]>([
    {
      id: 0,
      userProfile: 0,
      name: '',
      description: '',
    },
  ])

  useEffect(() => {
    const filter = async () => {
      try {
        const resProfile = await getMyProf()
        resProfile && setMyProfile(resProfile)
      } catch {
        console.log('error')
      }
      //   try {
      //     const res = await axios.get(
      //       `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/myprofile/`,
      //       {
      //         headers: {
      //           "Content-Type": "application/json",
      //           Authorization: `JWT ${cookie.get('access_token')}`,
      //         },
      //       }
      //     );
      //     setMyProfile(res.data[0]);
      //     setEditProfile({ id: res.data[0].id, userProfile: res.data[0].userProfile, name: res.data[0].name, statusMessage: res.data[0].statusMessage, description: res.data[0].description, img: res.data[0].img, editImage: res.data[0].editImage})
      //   } catch {
      //     console.log("error");
      //   }
    }
    filter()
  }, [])

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
