import FormFieldsWrapper from '@/components/Forms/Wrapper'
import axiosApi from '@/utils/axios'
import { usecheckAuth } from '@/utils/swr'
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

type Props = {
  closeModal?: () => void
  postId?: string
}

export default function CreatePostForm({ closeModal, postId }: Props) {
  const theme = useTheme()
  const { userData, accessToken } = usecheckAuth()
  const router = useRouter()

  const [errors, setErrors] = useState<{
    text?: number
  }>({})

  if (!userData?.id) return null

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    if (!userData?.id) return
    e.preventDefault()


    const formData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    ) as unknown as any

    const requestData: any = {
      ...formData,
      date: new Date().toLocaleDateString(),
      userId: userData?.id
    }

    if (formData.text.length < 10) {
      return setErrors({ text: formData.text.length })
    }

    try {
      const result = await axiosApi.post(`/add-post`, requestData)

      if (result.status !== 200) {
        throw result
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
      <Typography variant='h4'>Create post</Typography>
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
        />
      </FormControl>
      <Box>
        <InputLabel>
          Text * <Typography variant='body2'>(50 symbols min)</Typography>
          <CssVarsProvider>
            <Textarea
              name='text'
              required
              minRows={5}
              sx={{ mt: 1 }}
              onInput={onInput}
              defaultValue='Lorem ipsum dolor sit amet consectetur adipisicing elit.'
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
        Create
      </Button>
    </FormFieldsWrapper>
  )
}
