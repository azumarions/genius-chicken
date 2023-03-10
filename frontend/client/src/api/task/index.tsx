export const getTasks = async () => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_DOCKER_URL}/api/task-list/`)
  )
  const tasks = await res.json()
  return tasks
}

export const getTaskId = async () => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_DOCKER_URL}/api/task-list/`)
  )
  const tasks = await res.json()

  return tasks.map((task: { id: any }) => {
    return {
      params: {
        id: String(task.id),
      },
    }
  })
}
export const getTaskData = async (id: string) => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_DOCKER_URL}/api/task-detail/${id}/`)
  )
  const task = await res.json()
  return task
}
