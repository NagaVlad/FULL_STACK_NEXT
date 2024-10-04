import CustomHead from '@/components/Head'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography
} from '@mui/material'
import { blue, red } from '@mui/material/colors'
import Link from 'next/link'

export default async function ArticlePage({ params: { id } }: { params: { id: string } }) {

  const news = await getNews(id)

  if (!news) return null

  return (
    <>
      <CustomHead title={news?.title} description={news.text?.slice(0, 10)} />
      <Box py={2}>
        <Card>
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: news.id % 2 === 0 ? red[500] : blue[500] }}
                aria-label='author avatar'
              >
                {news.author?.slice(0, 1)}
              </Avatar>
            }
            action={
              <Link href='/news'>
                <Button aria-label='return to news page'>
                  <ArrowBackIosNewIcon fontSize='small' />
                  <Typography variant='body2'>Back new page</Typography>
                </Button>
              </Link>
            }
            title={news.title}
            subheader={new Date(news.datePublished).toDateString()}
          />
          <CardMedia
            component='img'
            height='300'
            image={news.imgSrc}
            alt={news.imgAlt}
          />
          <CardContent>
            <Typography variant='body1'>{news.text}</Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}

async function getNews(id: string) {
  try {
    const response = await fetch(
      `https://api.jsonbin.io/v3/b/${process.env.JSONBIN_BIN_ID}?meta=false`,
      {
        headers: {
          // 'X-Master-Key': process.env.JSONBIN_X_MASTER_KEY,
          // 'X-JSON-Path': `news[${Number(id) - 1}]`
        },
        next: { revalidate: 60 * 60 * 12 }
      }
    )
    if (!response.ok) {
      throw response
    }
    const data = await response.json()

    if (!data[0]) {
      return undefined
    }
    return data[0]
  } catch (e) {
    console.error(e)
    return undefined
  }
}
