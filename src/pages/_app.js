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
        fontFamily: 'SolaimanLipi'
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

                    <Script id="google-analytics" strategy="afterInteractive">
                      {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){window.dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-BS6TEWCZBX');
                      `}
                    </Script>

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
