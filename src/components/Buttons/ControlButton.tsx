'use client'
import { useCheckAuth } from '@/utils/swr'
import { Button } from '@mui/material'

export default function ControlButton({ post }: any) {
   const { userData } = useCheckAuth()

   return (
      <>
         {userData?.id === post?.user_id ? <Button>Edit</Button> : null}
         {userData?.id === post?.user_id ? <Button>Remove</Button> : null}
      </>
   )
}
