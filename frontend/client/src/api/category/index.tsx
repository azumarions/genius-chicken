export const getCategorys = async () => {
    const res = await fetch(
      new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/category/`)
      // new URL(`${process.env.NEXT_PUBLIC_DOCKER_URL}/api/category/`)
    )
    const categorys = await res.json()
    return categorys
  }