import { Box, Center, Container, Flex, Spacer, Spinner, Text } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import ImageBanner from './inc/ImageBanner'
import Navigation from './inc/Navigation'
import TopBar from './inc/TopBar'
import dynamic from 'next/dynamic'
import AuthModal from '../../Components/Common/AuthModal'
import LayoutWrapper from '../../Wrappers/LayoutWrapper'
import { useRouter } from 'next/router'
import { getFlashMessage } from '../../Helpers/cookieHelper'
import useUser from '../../Hooks/useUser'
import SectionContainer from '../../Components/Common/SectionContainer'
import useLogin from '../../Hooks/useLogin'
import useRegistration from '../../Hooks/useRegistration'
import FullscreenLoader from '../../Components/Common/FullscreenLoader'

const GoogleOneTapLogin = dynamic(import('react-google-one-tap-login'), { ssr: false })
// import GoogleOneTapLogin from 'react-google-one-tap-login';

// #303030
export default function HomeLayout({ children }) {

    const [onTapLoading, setOneTapLoading] = useState(false)

    const { isLoading, authUser } = useUser()
    const { responseGoogle } = useLogin()
    const register = useRegistration()

    async function tryToLoginOrSignup(response) {

        setOneTapLoading(true)

        const resp = {
            profileObj: {
                email: response.email,
                picture: response.picture,
                imageUrl: response.picture,
            }
        }

        console.log('One Tap Google Response: ', resp)

        const loginResponse = await responseGoogle(resp, false)

        if (loginResponse == false) {
            await register.responseGoogle(resp)
        }

        setOneTapLoading(false)

    }

    return (
        <LayoutWrapper>

            <Box bg={{ base: 'white', md: 'gray.200' }} minH='100vh'>

                {(!isLoading && !authUser && !onTapLoading) && <GoogleOneTapLogin
                    onError={(error) => console.log(error)}
                    onSuccess={(response) => tryToLoginOrSignup(response)}
                    googleAccountConfigs={{ client_id: process.env.GOOGLE_CLIENT_ID, auto_select: false }}
                />}

                {onTapLoading && <FullscreenLoader spinnerSize='md' />}

                <Box
                    // bgColor={'blackAlpha.0'}
                    backdropFilter='auto'
                    backdropBlur='2px'
                    backgroundImage={'bg.png'}
                >

                    <SectionContainer
                        maxW={'container.xl'}
                        px={{ base: 0, md: '10px' }}
                        bg='gray.50'
                        backdropFilter='auto'
                        backdropBlur='2px'
                    >

                        <TopBar />


                        {/* <ImageBanner src='/banner.jpg' /> */}

                        <Navigation />

                        <Box
                            bg={{ base: 'white', md: 'whiteAlpha.800' }}
                            // roundedTop={{ base: 'none', md: '4xl' }}
                            roundedBottom='md'
                            overflow={'hidden'}
                            border='1px'
                            borderColor={'blackAlpha.200'}
                            shadow='sm'
                        >


                            <Box px={{ base: 0, md: 1 }} py={{ base: 0, md: 1 }}>
                                {children}
                            </Box>

                        </Box>


                        <Center py='5'>
                            <Text>2022 @ bengalread.com all rights reserved</Text>
                        </Center>

                    </SectionContainer>

                </Box>

                <AuthModal />
            </Box>
        </LayoutWrapper>
    )
}
