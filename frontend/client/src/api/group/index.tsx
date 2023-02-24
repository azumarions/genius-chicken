export const getGroups = async () => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_DOCKER_URL}/api/group-list/`)
  )
  const groups = await res.json()
  return groups
}

export const getGroupId = async () => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_DOCKER_URL}/api/group-list/`)
  )
  const groups = await res.json()

  return groups.map((group: { id: any }) => {
    return {
      params: {
        id: String(group.id),
      },
    }
  })
}
export const getGroupData = async (id: string) => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_DOCKER_URL}/api/group-detail/${id}/`)
  )
  const group = await res.json()
  return group
}
