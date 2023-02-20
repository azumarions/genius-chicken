export const getUsers = async () => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_DOCKER_URL}/api/profile-list`)
  )
  const users = await res.json()
  return users
}

export const getUserId = async () => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_DOCKER_URL}/api/profile-list/`)
  )
  const users = await res.json()

  return users.map((user: { id: any }) => {
    return {
      params: {
        id: String(user.id),
      },
    }
  })
}
export const getUser = async (id: string) => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_DOCKER_URL}/api/profile-detail/${id}/`)
  )
  const user = await res.json()
  return user
}
