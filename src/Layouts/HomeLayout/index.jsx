import { Box, Center, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import ImageBanner from './inc/ImageBanner'
import Navigation from './inc/Navigation'
import TopBar from './inc/TopBar'
import dynamic from 'next/dynamic'
import AuthModal from '../../Components/Common/AuthModal'
import LayoutWrapper from '../../Wrappers/LayoutWrapper'
import { useRouter } from 'next/router'
import { setRedirectUrl } from '../../Helpers/cookieHelper'
import useUser from '../../Hooks/useUser'
import SectionContainer from '../../Components/Common/SectionContainer'
import useLogin from '../../Hooks/useLogin'
import useRegistration from '../../Hooks/useRegistration'
import FullscreenLoader from '../../Components/Common/FullscreenLoader'
import Head from 'next/head'
import { siteName } from '../../Helpers/config'

const GoogleOneTapLogin = dynamic(import('react-google-one-tap-login'), { ssr: false })
// import GoogleOneTapLogin from 'react-google-one-tap-login';

// #303030
export default function HomeLayout({
    children,
    title = `${siteName} - Bengalread Bangla blog`,
    image = 'https://s3.amazonaws.com/somewherein/pictures/logo.jpg',
    url = 'http://www.bengalread.vercel.app/',
    description = 'Bengalread Bangla blog, is the first modern bangla blog community in Bangladesh and India-kolkata. the front page displaying all the incoming posts and the group blog service. since the simple start 16th december 2022, Bengalread Bangla blog has grown to become the trend setter for bangla blogging.'
}) {

    const { asPath } = useRouter()

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

        setRedirectUrl(asPath)

        const loginResponse = await responseGoogle(resp, false)

        if (loginResponse == false) {
            await register.responseGoogle(resp)
        }
        setOneTapLoading(false)
    }


    return (
        <LayoutWrapper>
            <Head>

                <meta charset="utf-8" />

                <meta http-equiv="X-UA-Compatible" content="IE=edge" />

                <title>{title}</title>

                <meta name="google-site-verification" content="Su1LHtlWhtyXKF84ppDt_GnYxxzRcoeTWFiA1-8AJzE" />
                <meta name="alexaVerifyID" content="u9oVtocbFKf_wzTOQl3KphJWLT8" />

                <meta name="description" content={description} />
                <meta property="og:description" content={description} />
                <meta name="keywords" content="bengal read, bangla, blog, বাংলা ব্লগ,bangladesh, dhaka, bangla blog, group blog, bengali, news,  বাংলা,  বাংলাদেশ, ঢাকা, খবর, দেশ, নারী, কবিতা, গল্প, জীবন, মুক্তিযুদ্ধ" />

                <meta property="fb:app_id" content="1545167315695654" />
                <meta property="og:site_name" content="বেঙ্গলরিড বাংলা ব্লগ" />
                <meta property="og:image" content={image} />
                <meta property="og:url" content={url} />

                <link rel="shortcut icon" href="https://s3.amazonaws.com/somewherein/assets/images/favicon.ico" type="image/x-icon" />

                <link rel="apple-touch-icon" href="https://s3.amazonaws.com/somewherein/assets/images/ilogo.png" />

                <link rel="icon" href="https://s3.amazonaws.com/somewherein/assets/images/favicon.ico" type="image/x-icon" />

                <link rel="image_src" href="https://s3.amazonaws.com/somewherein/assets/images/logo21.jpg" />
            </Head>

            <Box bg={{ base: 'white', md: 'gray.200' }} minH='100vh'>


                {(!isLoading && !authUser && !onTapLoading) && <GoogleOneTapLogin
                    onError={(error) => console.log(error)}
                    onSuccess={(response) => tryToLoginOrSignup(response)}
                    googleAccountConfigs={{ client_id: process.env.GOOGLE_CLIENT_ID, auto_select: false }}
                />}

                {onTapLoading && <FullscreenLoader spinnerSize='md' />}

                <SectionContainer
                    maxW={'container.xl'}
                    px={{ base: 0, md: '10px' }}
                    bg='gray.50'
                    backdropFilter='auto'
                // backdropBlur='2px'
                >

                    <TopBar />

                    {/* <ToastSpinnerText text='পোস্টটি সেভ হচ্ছে...' /> */}
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


                <AuthModal />
            </Box>
        </LayoutWrapper>
    )
}
