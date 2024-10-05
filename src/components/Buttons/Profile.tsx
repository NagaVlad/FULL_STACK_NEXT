import { useCheckAuth } from '@/utils/swr'
import { ListItemButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import AuthTabs from '../AuthTabs'
import Modal from '../Modal'
import UserPanel from '../UserPanel'
import Image from 'next/image'
import { API_URL_STATIC } from '@/utils/axios'

export default function ProfileButton() {
  const { userData } = useCheckAuth()
  const theme = useTheme()


  const modalContent = userData?.id ? <UserPanel /> : <AuthTabs />

  return (
    <Modal
      triggerComponent={
        <ListItemButton sx={{ borderRadius: '50%', px: theme.spacing(1) }}>
          <Image alt='preview' width={50} height={50} src={`${API_URL_STATIC}/${userData?.avatarUrl ? userData?.avatarUrl.substr(1) : '/user.png'}`} />
        </ListItemButton>
      }
      modalContent={modalContent}
    />
  )
}
