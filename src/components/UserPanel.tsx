import { Divider } from '@mui/material'
import UploadForm from './Forms/Upload'
import LogoutButton from './Buttons/LogoutMy'

type Props = {
  closeModal?: () => void
}

export default function UserPanel({ closeModal }: Props) {
  return (
    <>
      <UploadForm closeModal={closeModal} />
      <Divider />
      <LogoutButton closeModal={closeModal} />
    </>
  )
}
