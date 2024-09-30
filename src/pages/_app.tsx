import ErrorFallback from '@/components/ErrorFallback'
import Footer from '@/components/Footer'
import CustomHead from '@/components/Head'
import Header from '@/components/Header'
import '@/global.scss'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import { ErrorBoundary } from 'react-error-boundary'
import { ToastContainer } from 'react-toastify'
import { theme } from './theme'
import 'react-toastify/dist/ReactToastify.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'


export default function App({
  Component,
  pageProps,
}: AppProps) {
  const [animationParent] = useAutoAnimate()

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CustomHead
          title='Default Title'
          description='This is default description'
        />
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => window.location.reload()}
        >
          <Container
            maxWidth='xl'
            sx={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            <Header />
            <Box component='main' flexGrow={1} ref={animationParent}>
              <Component {...pageProps} />
            </Box>
            <Footer />
          </Container>
          <ToastContainer autoClose={2000} hideProgressBar theme='colored' />
        </ErrorBoundary>
      </ThemeProvider>
    </>
  )
}
