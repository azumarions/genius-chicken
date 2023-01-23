import { Paper } from '@mui/material'
import { Container } from '@mui/system'
import { NextPage } from 'next'
import React from 'react'
import Image from 'next/image'

const TestPage: NextPage = () => {

  return (
    <Container>
      <Paper><Image src="/auth_icon1.jpeg" alt="icon" width={400} height={700} /></Paper>
    </Container>
  )
}

export default TestPage
