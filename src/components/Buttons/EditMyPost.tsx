'use client'
import { usecheckAuth } from '@/utils/swr'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import { Button, IconButton } from '@mui/material'
import Modal from '../Modal'
import EditMyPostForm from '../Forms/EditPostForm'

type Props = {
  post: {
    user_id: string
  }
  icon?: boolean
}

export default function EditMyPostButton({ post, icon = true }: Props) {
  const { userData } = usecheckAuth()

  if (userData?.id !== post.user_id) return null

  return (
    <Modal
      triggerComponent={
        icon ? (
          <IconButton color='info'>
            <DriveFileRenameOutlineIcon />
          </IconButton>
        ) : (
          <Button variant='contained' color='info'>
            Edit
          </Button>
        )
      }
      modalContent={<EditMyPostForm post={post} />}
      size='M'
    />
  )
}
