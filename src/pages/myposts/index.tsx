import Animate from '@/components/AnimateIn'
import CreatePostButton from '@/components/Buttons/CreatePost'
import CustomHead from '@/components/Head'
import PostPreview from '@/components/PostPreview'
import axiosApi from '@/utils/axios'
import prisma from '@/utils/prisma'
import { Divider, Grid, Typography } from '@mui/material'
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType
} from 'next'

export default function Posts({
  posts
}: InferGetServerSidePropsType<typeof getServerSideProps>) {


  console.log('posts', posts);

  return (
    <>
      <CustomHead title='Blog Page' description='This is Blog Page' />
      <CreatePostButton />
      <Divider />
      <Typography variant='h4' textAlign='center' py={2}>
        My Posts
      </Typography>
      {/* {posts.length ? (
        <Grid container spacing={2} pb={2}>
          {posts.map((post) => (
            <Grid item md={6} lg={4} key={post.id}>
              <Animate.FadeIn>
                <PostPreview post={post} />
              </Animate.FadeIn>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography mt={2}>There are no posts yet</Typography>
      )} */}
    </>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    // const res = await axiosApi.get('http://localhost:5000/api/posts')
    const res = await fetch('http://localhost:5000/api/posts')

    console.log('res1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', res);


    return {
      props: {
        posts: []
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
