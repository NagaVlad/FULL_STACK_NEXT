import { usecheckAuth, useUser } from '@/utils/swr'
import { CssVarsProvider } from '@mui/joy/styles'
import Textarea from '@mui/joy/Textarea'
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography
} from '@mui/material'
import { red } from '@mui/material/colors'
import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { useState } from 'react'
import FormFieldsWrapper from './Wrapper'
import axiosApi from '@/utils/axios'


type Props = {
  closeModal?: () => void
  post: {
    user_id?: string
    text?: string
    date?: string
    id?: string,
    title?: string
  }
}

export default function EditMyPostForm({ closeModal, post }: Props) {
  const theme = useTheme()
  const router = useRouter()

  const [errors, setErrors] = useState<{
    text?: number
  }>({})

  const { userData } = usecheckAuth()

  if (userData?.id !== post.user_id) return null


  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    const formData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    ) as unknown as any & {
      user_id?: string
      text?: string
      date?: string
      id?: string,
      title?: string
    }

    if (formData.text.length < 10) {
      return setErrors({ text: formData.text.length })
    }

    try {
      const result = await axiosApi.put(`/edit-post/${post?.id}`, formData)

      if (result.status !== 200) {
        throw result.statusText
      }

      if (closeModal) {
        closeModal()
      }
      router.reload()
    } catch (e) {
      console.error(e)
    }
  }

  const onInput = () => {
    if (Object.keys(errors).length) {
      setErrors({ text: undefined })
    }
  }

  return (
    <FormFieldsWrapper handleSubmit={handleSubmit}>
      <Typography variant='h4'>Edit post</Typography>
      <input type='hidden' name='postId' defaultValue={post.id} />
      <FormControl required>
        <InputLabel htmlFor='title'>Title</InputLabel>
        <Input
          sx={{ gap: theme.spacing(1) }}
          id='title'
          type='text'
          name='title'
          inputProps={{
            minLength: 3
          }}
          defaultValue={post.title}
        />
      </FormControl>
      <Box>
        <InputLabel>
          Content * <Typography variant='body2'>(11 symbols min)</Typography>
          <CssVarsProvider>
            <Textarea
              name='text'
              required
              minRows={5}
              sx={{ mt: 1 }}
              onInput={onInput}
              defaultValue={post.text}
            />
          </CssVarsProvider>
        </InputLabel>
        {errors.text && (
          <FormHelperText sx={{ color: red[500] }}>
            {10 - errors.text} symbols left
          </FormHelperText>
        )}
      </Box>
      <Button type='submit' variant='contained' color='success'>
        Update
      </Button>
    </FormFieldsWrapper>
  )
}