import type { UserResponseData } from '@/types'
import storageLocal from '@/utils/storageLocal'
import { usecheckAuth, useUser } from '@/utils/swr'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  Typography
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import type { User } from '@prisma/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import FormFieldsWrapper from './Wrapper'
import axiosApi from '@/utils/axios'

type Props = {
  closeModal?: () => void
}

export default function RegisterForm({ closeModal }: Props) {
  const theme = useTheme()
  const router = useRouter()
  const { mutate } = useUser()
  const { refreshUserData } = usecheckAuth()

  const [errors, setErrors] = useState<{
    email?: boolean
    password?: boolean
    passwordConfirm?: boolean
  }>({})

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    ) as unknown as Pick<User, 'username' | 'email' | 'password'> & {
      passwordConfirm?: string
    }
    const _errors: typeof errors = {}
    if (formData.password.length < 6) {
      _errors.password = true
    }
    if (formData.password !== formData.passwordConfirm) {
      _errors.passwordConfirm = true
    }
    if (Object.keys(_errors).length) {
      return setErrors({ ..._errors })
    }

    delete formData.passwordConfirm

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(formData)
      })

      if (res.status === 409) {
        return setErrors({ email: true })
      } else if (!res.ok) {
        throw res
      }

      const data = (await res.json()) as UserResponseData
      mutate(data)

      storageLocal.set('user_has_been_registered', true)

      if (closeModal) {
        closeModal()
      }

      if (router.pathname !== '/') {
        router.push('/')
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleInput: React.FormEventHandler<HTMLFormElement> = () => {
    if (Object.keys(errors).length) {
      setErrors({})
    }
  }

  const handleRegistration = async () => {
    // const res = await fetch('http://localhost:5000/api/registration', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     email: "admin1002@mail.com",
    //     password: "admin"
    //   }),
    //   headers: new Headers({ 'content-type': 'application/json' }),
    //   credentials: 'include', //!БЕЗ ЭТОГО НЕ РАБОТАЕТ
    // })

    const res = await axiosApi.post('/registration', {
      email: "admin1002@mail.com",
      password: "admin"
    })

    let result = await res?.data

    storageLocal.set('token', result?.accessToken) // ЕСТЬ ВАРИАНТ В КУКИ ПОЛОЖИТЬ

    storageLocal.set('isAuth', true) //ЕСТЬ ВАРИАНТ в глобальное хранилище
    storageLocal.set('userInfo', result?.user) //ЕСТЬ ВАРИАНТ в глобальное хранилище

    refreshUserData()
  }


  const handleLogin = async () => {
    // const res = await fetch('http://localhost:5000/api/login', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     email: "admin10@mail.com",
    //     password: "123456"
    //   }),
    //   credentials: 'include', //!БЕЗ ЭТОГО НЕ РАБОТАЕТ
    //   headers: new Headers({ 'content-type': 'application/json', 'withCredentials': 'true' }),
    //   // headers: new Headers({ 'content-type': 'application/json', 'Authorization': `Bearer ${token}` }), //!!!!!!!!!!!!!!!!! КАК ЦЕПЛЯТЬ ТОКЕН для всех запросов?
    // })

    const res = await axiosApi.post('/login', {
      email: "admin1002@mail.com",
      password: "admin"
    })

    let result = await res?.data

    storageLocal.set('token', result?.accessToken)

    storageLocal.set('isAuth', true)
    storageLocal.set('userInfo', result?.user)

    refreshUserData()
  }



  const handleLogout = async () => {
    // const res = await fetch('http://localhost:5000/api/logout', {
    //   method: 'POST',
    //   headers: new Headers({ 'content-type': 'application/json' }),
    //   // headers: new Headers({ 'content-type': 'application/json', 'withCredentials': 'true' }),
    //   credentials: 'include', //!!!!!!!!!!!
    // })

    const res = await axiosApi.post('/logout')
      .then((res) => {
        if (res?.status === 200) {
          storageLocal.remove('token')

          storageLocal.set('isAuth', false)
          storageLocal.set('userInfo', {})
        }
      })

    refreshUserData()
  }

  const handleGetUsers = async () => {
    await axiosApi.get('/users')
  }

  return (
    <>
      <FormFieldsWrapper handleSubmit={handleSubmit} handleInput={handleInput}>
        <Typography variant='h4'>Register</Typography>
        <FormControl required>
          <InputLabel htmlFor='username'>Username</InputLabel>
          <Input
            sx={{ gap: theme.spacing(1) }}
            id='username'
            name='username'
            startAdornment={<PersonOutlineIcon />}
          />
        </FormControl>
        <FormControl required error={errors.email}>
          <InputLabel htmlFor='email'>Email</InputLabel>
          <Input
            sx={{ gap: theme.spacing(1) }}
            id='email'
            type='email'
            name='email'
            startAdornment={<MailOutlineIcon />}
          />
          {errors.email && <FormHelperText>Email already in use</FormHelperText>}
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
          <FormHelperText>
            Password must be at least 6 characters long
          </FormHelperText>
        </FormControl>
        <FormControl required error={errors.passwordConfirm}>
          <InputLabel htmlFor='password-confirm'>Confirm password</InputLabel>
          <Input
            sx={{ gap: theme.spacing(1) }}
            id='password-confirm'
            type='password'
            name='passwordConfirm'
            startAdornment={<VpnKeyIcon />}
          />
          {errors?.passwordConfirm && (
            <FormHelperText>Passwords must be the same</FormHelperText>
          )}
        </FormControl>
        <Button type='submit' variant='contained' color='success'>
          Register
        </Button>
      </FormFieldsWrapper>


      <Grid container xs={12} rowGap={2}>
        <Button fullWidth onClick={handleRegistration} variant='contained' color='success'>
          REGISTARTION
        </Button>

        <Button fullWidth onClick={handleLogin} variant='contained' color='info'>
          LOGIN
        </Button>

        <Button fullWidth onClick={handleLogout} variant='contained' color='error'>
          LOGOUT
        </Button>

        <Button fullWidth onClick={handleGetUsers} variant='contained' color='warning'>
          GET USERS
        </Button>
      </Grid>
    </>
  )
}
