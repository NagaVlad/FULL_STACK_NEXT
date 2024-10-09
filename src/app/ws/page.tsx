'use client'

import CustomHead from '@/components/Head'
import Ws from '@/components/WS/ws'
import { Typography } from '@mui/material'

export default function About() {
  return (
    <>
      <CustomHead title='About Page' description='This is About Page' />
      <Typography variant='h4' textAlign='center' py={2}>
        WebSokets
      </Typography>
      <Ws />
    </>
  )
}