import Animate from '@/components/AnimateIn'
import CustomHead from '@/components/Head'
import NewsPreview from '@/components/NewsPreview'
import type { NewsArr } from '@/types'
import { Grid, Typography } from '@mui/material'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

export default function About({
   data
}: InferGetStaticPropsType<typeof getStaticProps>) {

   const { news } = data

   return (
      <>
         <CustomHead title='News Page' description='This is News Page' />
         <Typography variant='h4' textAlign='center' py={2} >
            News
         </Typography>

         <Typography variant='h5' textAlign='center' py={2} >
            News
         </Typography>
         <Grid container spacing={2} pb={2} >
            {
               news.map((item) => (
                  <Grid item md={6} lg={4} key={item.id} >
                     <Animate.FadeIn>
                        <NewsPreview news={item} />
                     </Animate.FadeIn>
                  </Grid>
               ))
            }
         </Grid>
      </>
   )
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
   let data = {
      news: [] as NewsArr
   }

   try {
      const response = await fetch(
         `https://api.jsonbin.io/v3/b/${process.env.JSONBIN_BIN_ID}?meta=false`,
         {
            headers: {
               'X-Master-Key': process.env.JSONBIN_X_MASTER_KEY
            }
         }
      )
      if (!response.ok) {
         throw response
      }
      data = await response.json()

   } catch (e) {
      console.error(e)
   }

   return {
      props: {
         data
      },
      revalidate: 60 * 60 * 12
   }
}
