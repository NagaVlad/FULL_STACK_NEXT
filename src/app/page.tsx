'use client'
import Animate, { SLIDE_DIRECTION } from '@/components/AnimateIn'
import CustomHead from '@/components/Head'
import { usecheckAuth } from '@/utils/swr'
import { Box, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import block from '../../public/data/home.json'
import Slider from '@/components/Slider'

export default function Home() {
  const { blocks } = block

  const { userData } = usecheckAuth()

  return (
    <>
      <CustomHead title='Home Page' description='This is Home Page' />
      <Typography variant='h4' textAlign='center' py={2}>
        Welcome, {userData ? userData.email || userData.email : 'stranger'}
      </Typography>
      {/* <Slider slides={blocks} /> */}

      <Box my={2}>
        {blocks.map((block, i) => (
          <Animate.SlideIn
            key={block.id}
            direction={i % 2 ? SLIDE_DIRECTION.RIGHT : SLIDE_DIRECTION.LEFT}
          >
            <Grid container spacing={2} my={4}>
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
          </Animate.SlideIn>
        ))}
      </Box>
    </>
  )
}