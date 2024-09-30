import { usecheckAuth, useUser } from '@/utils/swr'
import { Button } from '@mui/material'
import { toast } from 'react-toastify'
import Modal from '../Modal'
import CreateMyPostForm from '../Forms/CreateMyPost'

export default function () {
  const { userData } = usecheckAuth()

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
