import EditMyPostButton from '@/components/Buttons/EditMyPost'
import RemoveMyPostButton from '@/components/Buttons/RemoveMyPost'
import CustomHead from '@/components/Head'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography
} from '@mui/material'
import Link from 'next/link'

export default async function MyPostPage({ params: { id } }: { params: { id: string } }) {
  const post = await getPost(id)

  return (
    <>
      <CustomHead title={post.title} description={post.text.slice(0, 10)} />
      <Box py={2}>
        <Card>
          <CardHeader
            // avatar={<Avatar src={'public/img/user.png'} />}
            action={
              <Link href='/myposts'>
                <Button aria-label='return to about page'>
                  <ArrowBackIosNewIcon fontSize='small' />
                  <Typography variant='body2'>Back</Typography>
                </Button>
              </Link>
            }
            title={post.title}
            subheader={post.createdAt}
          />
          <CardMedia
            component='img'
            height='200'
            image='https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'
            alt=''
          />
          <CardContent>
            <Typography variant='body1'>{post.text}</Typography>
          </CardContent>
          <CardActions>
            <Box display='flex' justifyContent='flex-end' gap={2} width='100%'>
              <>
                <EditMyPostButton post={post} icon={false} />
                <RemoveMyPostButton
                  postId={post.id}
                  userId={post.user_id}
                  icon={false}
                />
              </>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  )
}

async function getPost(id: string) {
  try {
    const res = await fetch(`${process.env.SERVER_URL}posts/${id}`, {
      method: 'GET',
      next: { tags: ['onePosts'] }
    })

    const posts = await res.json()

    if (!posts) {
      return []
    }
    return posts
  } catch (e) {
    console.error(e)
  }
}
