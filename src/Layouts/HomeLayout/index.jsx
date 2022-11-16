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
import { imageUrl, siteDesc, siteName, siteSlogun } from '../../Helpers/config'

const GoogleOneTapLogin = dynamic(import('react-google-one-tap-login'), { ssr: false })
// import GoogleOneTapLogin from 'react-google-one-tap-login';

// #303030
export default function HomeLayout({
    children,
    title = `${siteName} | ${siteSlogun}`,
    image = imageUrl,
    url = 'https://www.shamantorik.com',
    description = siteDesc
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
                <meta charSet="utf-8" />
                <meta property="languge" content="bn_BD" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name='viewport'
                    content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
                />
                <title>{title}</title>
                <meta name="application-name" content="সামান্তরিক বাংলা ব্লগ" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="সামান্তরিক বাংলা ব্লগ" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="msapplication-TileColor" content="#2B5797" />
                <meta name="msapplication-tap-highlight" content="no" />
                <meta name="theme-color" content="#000000" />
                <meta name="google-site-verification" content="4NNSBM2fl5AIyprId53IZZTtyqZ1cLHuvxwsYgot9xM" />
                <meta name="alexaVerifyID" content="u9oVtocbFKf_wzTOQl3KphJWLT8" />
                <meta name="description" content={description} />
                <meta property="og:description" content={description} />
                <meta name="keywords" content="shamantorik,সামান্তরিক, সামান্তরিক বাংলা ব্লগ, bangla, blog, বাংলা ব্লগ, bangladesh, bangla blog, group blog, bengali,  বাংলা,  বাংলাদেশ, ঢাকা, দেশ, উপন্যাস, কবিতা, গল্প, জীবন, মুক্তিযুদ্ধ" />
                <meta property="fb:app_id" content="1545167315695654" />
                <meta property="og:site_name" content={siteName} />
                <meta property="og:image" content={image} />
                <meta property="og:url" content={url} />
                <meta property="og:title" content={title} />
                <meta property="og:type" content={'article'} />
                <meta property="og:locale" content="bn_BD" />
                <link rel="shortcut icon" href="/favicon/favicon.ico" type="image/x-icon" />
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
                <link rel="shortcut icon" href="/favicon/favicon.ico" type="image/x-icon" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="image_src" href={image} />
                <link href="https://fonts.maateen.me/solaiman-lipi/font.css" rel="stylesheet" />
            </Head>

            <Box bg={{ base: 'white', md: 'gray.300' }} minH='100vh'>

                {(!isLoading && !authUser && !onTapLoading) && <GoogleOneTapLogin
                    disabled={!isLoading && !authUser && !onTapLoading}
                    onError={(error) => console.log(error)}
                    onSuccess={(response) => tryToLoginOrSignup(response)}
                    googleAccountConfigs={{ client_id: process.env.GOOGLE_CLIENT_ID, auto_select: false }}
                />}

                {onTapLoading && <FullscreenLoader spinnerSize='md' />}

                <SectionContainer
                    maxW={'container.xl'}
                    px={{ base: 0, md: '10px' }}
                    bg='gray.100'
                // backdropFilter='auto'
                // backdropBlur='2px'
                >

                    <TopBar />

                    {/* <ToastSpinnerText text='পোস্টটি সেভ হচ্ছে...' /> */}

                    <Navigation />

                    {/* <ImageBanner src='/banner.jpg' /> */}

                    <Box
                        bg={{ base: 'white', md: 'whiteAlpha.900' }}
                        // roundedTop={{ base: 'none', md: '4xl' }}
                        roundedBottom='md'
                        border='1px'
                        borderColor={'blackAlpha.200'}
                        shadow='sm'
                    >


                        <Box px={{ base: 0, md: 1 }} py={{ base: 0, md: 1 }}>

                            {children}
                        </Box>

                    </Box>


                    <Center py='5'>
                        <Text>২০২২ @ "সামান্তরিক বাংলা ব্লগ" সকল স্বত্ব বহন করে</Text>
                    </Center>

                </SectionContainer>


                <AuthModal />
            </Box>
        </LayoutWrapper>
    )
}
