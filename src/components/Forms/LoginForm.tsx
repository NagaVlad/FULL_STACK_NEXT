import storageLocal from '@/utils/storageLocal'
import { useCheckAuth } from '@/utils/swr'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
import FormFieldsWrapper from './Wrapper'
import axiosApi from '@/utils/axios'

type Props = {
  closeModal?: () => void
}

export default function LoginForm({ closeModal }: Props) {
  const theme = useTheme()
  const { refreshUserData } = useCheckAuth()

  const [errors, setErrors] = useState<{
    email?: boolean
    password?: boolean
  }>({})

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    )

    try {
      const res = await axiosApi.post('/login', formData)

      let result = await res?.data

      storageLocal.set('token', result?.accessToken)
      storageLocal.set('isAuth', true)
      storageLocal.set('userInfo', result?.user)

      refreshUserData()

      if (closeModal) {
        closeModal()
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <FormFieldsWrapper handleSubmit={handleSubmit}>
      <Typography variant='h4'>Login</Typography>
      <FormControl required error={errors.email}>
        <InputLabel htmlFor='email'>Email</InputLabel>
        <Input
          sx={{ gap: theme.spacing(1) }}
          id='email'
          type='email'
          name='email'
          startAdornment={<MailOutlineIcon />}
        />
        {errors.email && (
          <FormHelperText>
            Пользователь с указанным email не найден
          </FormHelperText>
        )}
      </FormControl>
      <FormControl required error={errors.password}>
        <InputLabel htmlFor='password'>Password</InputLabel>
        <Input
          sx={{ gap: theme.spacing(1) }}
          id='password'
          type='password'
          name='password'
          startAdornment={<VpnKeyIcon />}
        />
        {errors.password && <FormHelperText>Wrong credentials</FormHelperText>}
      </FormControl>
      <Button type='submit' variant='contained' color='success'>
        Login
      </Button>
    </FormFieldsWrapper>
  )
}
