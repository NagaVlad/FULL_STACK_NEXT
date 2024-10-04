'use client'
import { useUserContext } from '@/contexts/user/useContext'
import { Typography } from '@mui/material'

export default function UserInfo() {
   const { userData } = useUserContext()

   return (
      <>
         <Typography variant='h4' textAlign='center' py={2}>
            Welcome, {userData ? userData.email || userData.email : 'stranger'}
         </Typography>
      </>
   )
}
