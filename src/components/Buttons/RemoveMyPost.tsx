import axiosApi from '@/utils/axios'
import { usecheckAuth } from '@/utils/swr'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Button, IconButton } from '@mui/material'
import { useRouter } from 'next/router'

type Props = {
  postId: string
  userId: string
  icon?: boolean
}

export default function RemoveMyPostButton({
  postId,
  userId,
  icon = true
}: Props) {
  const router = useRouter()
  const { userData } = usecheckAuth()

  if (userData?.id !== userId) return null

  const removePost = async () => {
    try {
      await axiosApi.delete(`/delete-post/${postId}`)
        .then((res) => {
          router.push('/myposts')
        })
    } catch (e: unknown) {
      console.error(e)
    }
  }

  return icon ? (
    <IconButton onClick={removePost} color='error'>
      <DeleteOutlineIcon />
    </IconButton>
  ) : (
    <Button variant='contained' color='error' onClick={removePost}>
      Remove
    </Button>
  )
}