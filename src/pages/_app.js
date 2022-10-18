import '../../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { MantineProvider } from '@mantine/core';
// import { NavigationProgress } from '@mantine/nprogress';
import NextNProgress from "nextjs-progressbar";
import AuthModalContextProvider from '../Contexts/AuthModalContext';
import AuthContextProvider from '../Contexts/AuthContext';

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
          color="#ecc94b"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />

        <AuthModalContextProvider>
          <AuthContextProvider>

            <Component {...pageProps} />

          </AuthContextProvider>
        </AuthModalContextProvider>

      </ChakraProvider>
    </MantineProvider>
  )
}

export default MyApp
