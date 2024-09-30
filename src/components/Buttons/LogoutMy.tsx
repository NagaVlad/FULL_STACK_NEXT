import axiosApi from '@/utils/axios'
import { usecheckAuth } from '@/utils/swr'
import { Box, Button } from '@mui/material'

type Props = {
  closeModal?: () => void
}

export default function LogoutButton({ closeModal }: Props) {
  const { refreshUserData } = usecheckAuth()

  const onClick = async () => {
    try {

      const result = await axiosApi.post('/logout')

      if (result.status !== 200) {
        throw result
      }

      refreshUserData()

      if (closeModal) {
        closeModal()
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Box display='flex' justifyContent='flex-end' pt={2} pr={2}>
      <Button color='error' variant='contained' onClick={onClick}>
        Logout
      </Button>
    </Box>
  )
}
