export const getClusters = async () => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_DOCKER_URL}/api/cluster-list/`)
  )
  const clusters = await res.json()
  return clusters
}

export const getClusterId = async () => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_DOCKER_URL}/api/cluster-list/`)
  )
  const clusters = await res.json()

  return clusters.map((cluster: { id: any }) => {
    return {
      params: {
        id: String(cluster.id),
      },
    }
  })
}
export const getClusterData = async (id: string) => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_DOCKER_URL}/api/cluster-detail/${id}/`)
  )
  const cluster = await res.json()
  return cluster
}
