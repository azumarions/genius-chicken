import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'

const HomePage: NextPage = () => {
  return (
    <div>
      hello
      <Link href="/task">
        task to page
      </Link>
    </div>
  )
}

export default HomePage
