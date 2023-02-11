export const getCategorys = async () => {
    const res = await fetch(
      new URL("http://52.90.19.119/api/category")
      // new URL("http://host.docker.internal:8080/api/category")
      // (`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/task-list/`)
    )
    const categorys = await res.json()
    return categorys
  }