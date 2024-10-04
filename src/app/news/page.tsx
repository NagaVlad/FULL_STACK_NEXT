import Animate from '@/components/AnimateIn'
import CustomHead from '@/components/Head'
import NewsPreview from '@/components/NewsPreview'
import { Grid, Typography } from '@mui/material'
import { Key } from 'react'
import type { News } from '../../types'

export async function generateMetadata() {
   return {
      title: 'News',
   }
}

export default async function News() {

   const data = await getNews()

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
               news?.map((item: { id: Key | null | undefined }) => (
                  <Grid item md={6} lg={4} key={item.id} >
                     {/* <Animate.FadeIn> */}
                     <NewsPreview news={item as News} />
                     {/* </Animate.FadeIn> */}
                  </Grid>
               ))
            }
         </Grid>
      </>
   )
}

async function getNews() {
   try {
      const response = await fetch(
         `https://api.jsonbin.io/v3/b/${process.env.JSONBIN_BIN_ID}?meta=false`,
         {
            headers: {
               // 'X-Master-Key': process.env.JSONBIN_X_MASTER_KEY
            },
            next: { revalidate: 60 * 60 * 12 }
         }
      )
      if (!response.ok) {
         throw response
      }
      return await response.json()

   } catch (e) {
      console.error(e)
      return []

   }
}
