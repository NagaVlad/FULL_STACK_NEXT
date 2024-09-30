import CreateMyPostButton from '@/components/Buttons/CreateMyPost'
import CustomHead from '@/components/Head'
import { usecheckAuth } from '@/utils/swr'
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Typography, } from '@mui/material'
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType
} from 'next'
import Link from 'next/link'

export default function Posts({
  posts
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { userData } = usecheckAuth()

  return (
    <>
      <CustomHead title='Blog Page' description='This is Blog Page' />
      <CreateMyPostButton />
      <Divider />
      <Typography variant='h4' textAlign='center' py={2}>
        ВСЕ ПОСТЫ
      </Typography>
      {posts.length ? (
        <Grid container spacing={2} pb={2} gap={2} mt={2}>
          {posts.map((post: any) => (
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

                    {userData?.id === post?.user_id ? <Button>Edit</Button> : null}
                    {userData?.id === post?.user_id ? <Button>Remove</Button> : null}
                    {/* {isPostBelongsToUser && (
                      <>
                        <EditPostButton post={post} />
                        <RemovePostButton postId={post.id} authorId={post.authorId} />
                      </>
                    )} */}
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

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const res = await fetch('http://localhost:5000/api/posts', {
      method: 'GET',
    })

    const posts = await res.json()

    return {
      props: {
        posts: posts
      }
    }

  } catch (e) {
    console.log(e)
    return {
      props: {
        posts: []
      }
    }
  }
}




