import CreateMyPostButton from '@/components/Buttons/CreateMyPost'
import CustomHead from '@/components/Head'
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Typography, } from '@mui/material'
import Link from 'next/link'
import ControlButton from '@/components/Buttons/ControlButton'

// export const dynamic = 'force-dynamic' //!

export default async function Posts() {
  // const { userData } = useCheckAuth()

  const state = await getData()

  // const headersList = headers()
  // console.log(headersList);


  return (
    <>
      <CustomHead title='Blog Page' description='This is Blog Page' />
      <CreateMyPostButton />
      <Divider />
      <Typography variant='h4' textAlign='center' py={2}>
        ВСЕ ПОСТЫ
      </Typography>
      {state?.length ? (
        <Grid container spacing={2} pb={2} gap={2} mt={2}>
          {state?.map((post: any) => (
            <Card key={post.id}>
              <CardHeader title={post.title} subheader={post.createdAt} />
              <CardContent>
                <Typography variant='body2' color='text.secondary'>
                  {post.text}
                </Typography>
              </CardContent>
              <CardActions>
                <Box display='flex' justifyContent='space-between' width='100%'>
                  <Link href={`myposts/${post.id}`}>
                    <Button>
                      <Typography variant='body2'>More</Typography>
                    </Button>
                  </Link>
                  <Box display='flex' gap={1}>
                    <ControlButton post={post} />
                  </Box>
                </Box>
              </CardActions>
            </Card>
          ))}
        </Grid>
      ) : (
        <Typography mt={2}>There are no posts yet</Typography>
      )}
    </>
  )
}

export async function generateMetadata() {
  await getData()
  return {
    title: 'Posts',
  }
}

async function getData() {
  const { signal } = new AbortController();

  const res = await fetch(`http://localhost:5000/api/posts`, {
    method: 'GET',
    cache: 'no-store', //!
    // next: { revalidate: 0 }
    // next: { tags: ['allPosts'], revalidate: 0 }
    // signal: signal,
    next: { tags: ['allPosts'] }
  })

  const posts = await res.json()

  if (!posts) {
    return []
  }

  return posts
}




