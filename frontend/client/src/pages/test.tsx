import { NextPage } from 'next'
import { Avatar, Button } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { USER } from '@/types'
import { Box } from '@mui/system'
import { TaskContext } from '@/context/task'

type Anchor = 'top' | 'left' | 'bottom' | 'right'

const TestPage: NextPage = () => {
  return (
    <div>
      <Box sx={{ pt: 15 }}>TestPage</Box>
    </div>
  )
}

export default TestPage
