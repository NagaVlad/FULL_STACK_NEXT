// 'use client'
import CreateMyPostButton from '@/components/Buttons/CreateMyPost'
import CustomHead from '@/components/Head'
import { usecheckAuth } from '@/utils/swr'
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Typography, } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default async function Posts() {
  // const { userData } = usecheckAuth()

  // const [state, setState] = useState([])

  // useEffect(() => {
  //   getData().then((res) => {
  //     console.log('res', res);
  //     setState(res)
  //   })
  // }, [])


  const state = await getData()


  return (
    <>
      <CustomHead title='Blog Page' description='This is Blog Page' />
      <CreateMyPostButton />
      <Divider />
      <Typography variant='h4' textAlign='center' py={2}>
        ВСЕ ПОСТЫ
      </Typography>
      {state.length ? (
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

                    {/* {userData?.id === post?.user_id ? <Button>Edit</Button> : null}
                    {userData?.id === post?.user_id ? <Button>Remove</Button> : null} */}
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

export async function getData() {
  try {
    const res = await fetch(`http://localhost:5000/api/posts`, {
      method: 'GET',
      // cache: 'no-store'
      // next: { revalidate: 30 }
      next: { tags: ['allPosts'] }
    })

    const posts = await res.json()

    if (!posts) {
      return []
    }

    return posts

  } catch (e) {
    console.log(e)
  }
}




