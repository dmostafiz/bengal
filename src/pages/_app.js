import '../../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { MantineProvider } from '@mantine/core';
// import { NavigationProgress } from '@mantine/nprogress';
import NextNProgress from "nextjs-progressbar";
import AuthModalContextProvider from '../Contexts/AuthModalContext';
import AuthContextProvider from '../Contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CommentContextProvider from '../Contexts/CommentContext';
import SocketContextProvider from '../Contexts/SocketContext';
import AppContextProvider from '../Contexts/AppContext';
import Script from 'next/script';

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: 'light',
      }}
    >
      <ChakraProvider>

        <NextNProgress
          color="#6e6e6e"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />

        <QueryClientProvider client={queryClient}>

          <AuthModalContextProvider>

            <AuthContextProvider>

              <SocketContextProvider>

                <AppContextProvider>

                  <CommentContextProvider>

                    <Script
                      src="https://www.googletagmanager.com/gtag/js?id=G-BS6TEWCZBX"
                      strategy="afterInteractive"
                    />

                    <Component {...pageProps} />

                  </CommentContextProvider>

                </AppContextProvider>

              </SocketContextProvider>

            </AuthContextProvider>

          </AuthModalContextProvider>

        </QueryClientProvider>

      </ChakraProvider>

    </MantineProvider>
  )
}

export default MyApp
