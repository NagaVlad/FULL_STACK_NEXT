"use client"
import React from "react";
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../theme'
import ErrorFallback from "@/components/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import Footer from "@/components/Footer";
import { Box, Container } from "@mui/material";
import Header from "@/components/Header";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ToastContainer } from "react-toastify";
import { UserContextProvider } from "@/contexts/user/provider";
import { WSProvider } from "@/contexts/ws/provider";

export default function MyAppProvider({ children }: {
   children: React.ReactNode
}) {

   const [animationParent] = useAutoAnimate()
   return (
      <ThemeProvider theme={theme}>
         <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => window.location.reload()}
         >
            <WSProvider>
               <UserContextProvider>
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
                        {children}
                     </Box>
                     <Footer />
                  </Container>
               </UserContextProvider>
            </WSProvider>
            <ToastContainer autoClose={2000} hideProgressBar theme='colored' />
         </ErrorBoundary>
      </ThemeProvider >
   )
}