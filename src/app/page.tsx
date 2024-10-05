// 'use client'
import Animate, { SLIDE_DIRECTION } from '@/components/AnimateIn'
import CustomHead from '@/components/Head'
import { useCheckAuth } from '@/utils/swr'
import { Box, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
// import block from '../../public/data/home.json'
// import Slider from '@/components/Slider'
import { promises as fs } from 'fs'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { ReactElement, JSXElementConstructor, ReactNode, AwaitedReactNode } from 'react'
import { useUserContext } from '@/contexts/user/useContext'
import UserInfo from '@/components/Buttons/UserInfo'


export const dynamic = 'force-dynamic'

export default async function Home() {

  const file = await fs.readFile(process.cwd() + '/public/data/home.json', 'utf8')

  const { blocks } = JSON.parse(file)

  // console.log('blocks', blocks[0]);

  // const { userData } = useCheckAuth()


  return (
    <>
      <CustomHead title='Home Page' description='This is Home Page' />
      {/* <Typography variant='h4' textAlign='center' py={2}>
        Welcome, {userData ? userData.email || userData.email : 'stranger'}
      </Typography> */}

      <UserInfo />
      {/* <Slider slides={blocks} /> */}

      <Box my={2}>
        {blocks.map((block: { title: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined; description: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined; imgSrc: string | StaticImport; imgAlt: string }, i: number) => (
          // <Animate.SlideIn
          //   key={block.id}
          //   direction={i % 2 ? SLIDE_DIRECTION.RIGHT : SLIDE_DIRECTION.LEFT}
          // >
          <Grid container spacing={2} my={4} key={i}>
            {i % 2 ? (
              <>
                <Grid item md={6}>
                  <Typography variant='h5'>{block.title}</Typography>
                  <Typography variant='body1' mt={2}>
                    {block.description}
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Image
                    width={1024}
                    height={320}
                    src={block.imgSrc}
                    alt={block.imgAlt}
                    style={{
                      borderRadius: '6px'
                    }}
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item md={6}>
                  <Image
                    width={1024}
                    height={320}
                    src={block.imgSrc}
                    alt={block.imgAlt}
                    style={{
                      borderRadius: '6px'
                    }}
                  />
                </Grid>
                <Grid item md={6}>
                  <Typography variant='h5'>{block.title}</Typography>
                  <Typography variant='body1' mt={2}>
                    {block.description}
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
          // </Animate.SlideIn>
        ))}
      </Box>
    </>
  )
}