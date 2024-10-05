'use client'
import { useCheckAuth } from '@/utils/swr'
import { Button } from '@mui/material'
import { toast } from 'react-toastify'
import Modal from '../Modal'
import CreateMyPostForm from '../Forms/CreatePostForm'

export default function CreatePostForm() {
  const { userData } = useCheckAuth()

  const onClick = () => {
    toast('Authorization required', {
      type: 'warning'
    })
  }

  return userData?.id ? (
    <Modal
      triggerComponent={
        <Button variant='contained' sx={{ my: 2 }}>
          Create new post
        </Button>
      }
      modalContent={<CreateMyPostForm />}
      size='M'
    />
  ) : (
    <Button variant='contained' sx={{ my: 2 }} onClick={onClick}>
      Create new post
    </Button>
  )
}
