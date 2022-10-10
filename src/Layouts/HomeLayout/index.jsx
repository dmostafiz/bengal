import { Box, Center, Container, Spacer, Text } from '@chakra-ui/react'
import React from 'react'
import ImageBanner from './inc/ImageBanner'
import Navigation from './inc/Navigation'
import TopBar from './inc/TopBar'
import dynamic from 'next/dynamic'
import AuthModal from '../../Components/Common/AuthModal'

const GoogleOneTapLogin = dynamic(import('react-google-one-tap-login'), {ssr: false})
// import GoogleOneTapLogin from 'react-google-one-tap-login';

// #303030
export default function HomeLayout({ children }) {
    return (
        <Box bg={'gray.500'} minH='100vh'>


            <GoogleOneTapLogin
                onError={(error) => console.log(error)}
                onSuccess={(response) => console.log(response)}
                googleAccountConfigs={{ client_id: '721639709461-pjuq114vpiae24gs165e1aedpp2shau3.apps.googleusercontent.com' }}
            />

            <Box
                bgAttachment={'fixed'}
                // bgRepeat='no-repeat' 
                bgSize={'800px'}
                backgroundImage='/bg.png'
            >
                <Box
                    bgColor={'blackAlpha.200'}
                    backdropFilter='auto'
                    backdropInvert='100%'
                    backdropBlur='2px'
                >

                    <Container
                        maxW={'container.xl'}
                        px={{ base: 0, md: '10px' }}
                        bg='whiteAlpha.800'
                        backdropFilter='auto'
                        backdropBlur='2px'
                    >

                        <TopBar />

                        <Navigation />

                        <Box
                            bg={{ base: 'white', md: 'whiteAlpha.800' }}
                            roundedTop={{ base: 'none', md: 'md' }}
                            roundedBottom='md'
                            overflow={'hidden'}
                            border='1px'
                            borderColor={'blackAlpha.200'}
                        >

                            <ImageBanner src='/banner.png' />

                            <Box px={{ base: 0, md: 1 }} py={{ base: 0, md: 1 }}>
                                {children}
                            </Box>

                        </Box>


                        <Center py='5'>
                            <Text>2022 @ nogorshoily.com all rights reserved</Text>
                        </Center>

                    </Container>

                </Box>
            </Box>

            <AuthModal />
        </Box>
    )
}
