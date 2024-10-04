'use client'
import { usecheckAuth } from '@/utils/swr'
import { Button } from '@mui/material'

export default function ControlButton({ post }: any) {
   const { userData } = usecheckAuth()

   return (
      <>
         {userData?.id === post?.user_id ? <Button>Edit</Button> : null}
         {userData?.id === post?.user_id ? <Button>Remove</Button> : null}
      </>
   )
}
