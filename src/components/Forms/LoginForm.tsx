import type { UserResponseData } from '@/types'
import storageLocal from '@/utils/storageLocal'
import { usecheckAuth, useUser } from '@/utils/swr'
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
import { User } from '@prisma/client'
import { useState } from 'react'
import FormFieldsWrapper from './Wrapper'
import axiosApi from '@/utils/axios'

type Props = {
  closeModal?: () => void
}

export default function LoginForm({ closeModal }: Props) {
  const theme = useTheme()
  const { refreshUserData } = usecheckAuth()

  const [errors, setErrors] = useState<{
    email?: boolean
    password?: boolean
  }>({})

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    ) as unknown as Pick<User, 'email' | 'password'>

    try {
      // const res = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   body: JSON.stringify(formData)
      // })

      const res = await axiosApi.post('/login', formData)

      // if (res.status) {
      //   switch (res.status) {
      //     case 404:
      //       return setErrors({ email: true })
      //     case 403:
      //       return setErrors({ password: true })
      //     default:
      //       throw res
      //   }
      // }

      let result = await res?.data

      // if (!storageLocal.get('token')) {
      storageLocal.set('token', result?.accessToken)
      // }
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
