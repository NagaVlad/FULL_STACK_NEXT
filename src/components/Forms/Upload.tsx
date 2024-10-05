import { useCheckAuth } from '@/utils/swr'
import { Box, Button, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import FormFieldsWrapper from './Wrapper'
import axiosApi, { API_URL_STATIC } from '@/utils/axios'
import Image from 'next/image'

type Props = {
  closeModal?: () => void
}

export default function UploadForm({ closeModal }: Props) {
  const previewRef = useRef<HTMLImageElement | null>(null)
  const [file, setFile] = useState<File>()
  const { userData, refreshUserData } = useCheckAuth()

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    if (!file) return

    e.preventDefault()

    const formData = new FormData()

    const _file = new File([file], `${userData?.id}.${file.type.split('/')[1]}`, {
      type: file.type
    })
    formData.append('avatar', _file)

    try {
      const res = await axiosApi.post('/upload', formData)

      if (!Boolean(res.status === 200)) {
        throw res
      }

      if (closeModal) {
        closeModal()
      }

      refreshUserData()
    } catch (e) {
      console.error(e)
    }
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && previewRef.current) {
      const _file = e.target.files[0]
      setFile(_file)
      const img = previewRef?.current

      img.src = URL.createObjectURL(_file)

      img.onload = () => {
        URL.revokeObjectURL(img.src)
      }
    }
  }

  return (
    <>
      <FormFieldsWrapper handleSubmit={handleSubmit}>
        <Typography variant='h4'>Avatar</Typography>
        <Box display='flex' alignItems='center' gap={2}>
          <input
            accept='image/*'
            style={{ display: 'none' }}
            id='avatar'
            name='avatar'
            type='file'
            onChange={handleChange}
          />
          <label htmlFor='avatar'>
            <Button component='span'>Choose file</Button>
          </label>
          <Image alt='preview' width={50} height={50} ref={previewRef} src={`${API_URL_STATIC}/${userData?.avatarUrl ? userData?.avatarUrl.substr(1) : '/1727466258624.png'}`} />
          <Button
            type='submit'
            variant='contained'
            color='success'
            disabled={!file}
          >
            Upload
          </Button>
        </Box>
      </FormFieldsWrapper>
    </>
  )
}
