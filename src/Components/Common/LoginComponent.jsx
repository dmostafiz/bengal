import { Avatar, Box, Button, Center, Divider, Flex, Image, Input, Spacer, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaArrowLeft, FaBackspace, FaEnvelope, FaFacebook, FaFacebookF, FaGoogle, FaSignInAlt } from 'react-icons/fa'
import { FacebookProvider } from 'react-facebook';
import FacebookLoginButton from '../Auth/FacebookLoginButton';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { GoogleLogin } from 'react-google-login';

export default function LoginComponent() {

    const [toggleEmainLogin, setToggleEmainLogin] = useState(false)


    const [facebookLoading, setFLoading] = useState(false)


    const responseFacebook = (response) => {
        console.log(response);
    }

    const responseGoogle = (response) => {
        console.log(response);
    }



    return (
        <Box>
            {/* <Center p={3} bg='blackAlpha.50'>
        <Title order={5}>ব্লগে প্রবেশ করুন</Title>
    </Center> */}


            {!toggleEmainLogin ? <>
                {/* 
                <FacebookProvider appId="561683539070348">
                    <FacebookLoginButton />
                </FacebookProvider> */}

                <FacebookLogin
                    appId="561683539070348"
                    autoLoad={false}
                    callback={responseFacebook}

                    render={renderProps => <Button
                        isLoading={renderProps.isProcessing}
                        onClick={renderProps.onClick}
                        mb='3'
                        leftIcon={<FaFacebook size={20} />}
                        colorScheme={'facebook'}
                        shadow='sm'
                        w='full'
                        rounded={'sm'}
                        gap={2}
                    >
                        <Text fontSize={'13px'}>ফেসবুক থেকে লগইন করুন</Text>
                    </Button>
                    }
                />



                <GoogleLogin
                    clientId="721639709461-pjuq114vpiae24gs165e1aedpp2shau3.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                    render={ renderProps => <Button
                        mb='2'
                        isLoading={renderProps.isProcessing}
                        onClick={renderProps.onClick}
                        leftIcon={<Image h='20px' bg={'transparent'}
                            src='https://aws1.discourse-cdn.com/auth0/optimized/3X/8/a/8a06490f525c8f65d4260204bc3bc7b0e1fb0ba7_2_500x500.png'
                            color='red'
                        />}
                        bg={'whiteAlpha.900'}
                        colorScheme={'gray'}
                        border='1px'
                        borderColor={'blackAlpha.50'}
                        shadow='sm'
                        w='full'
                        rounded={'sm'}
                        size='md'
                        gap={2}
                    >
                        <Text fontSize={'13px'}>গুগোল থেকে লগইন করুন</Text>
                    </Button>}
                />



                <Center mb={2}><Text fontSize={'12px'} color='blackAlpha.500'>অথবা</Text></Center>

                <Button
                    // isLoading
                    onClick={() => setToggleEmainLogin(!toggleEmainLogin)}
                    size='md'
                    mb='3'
                    leftIcon={<FaSignInAlt />}
                    colorScheme={'yellow'}
                    shadow='sm'
                    w='full'
                    rounded={'sm'}
                    gap={2}
                >
                    <Text fontSize={'13px'}>ম্যানুয়ালি লগইন করুন</Text>
                </Button>

            </> : <>

                <Box px={2} pb={3}>
                    <Button
                        onClick={() => setToggleEmainLogin(!toggleEmainLogin)}
                        bg={'transparent'}
                        variant='link'
                        fontWeight={'normal'}
                        _hover={{ textDecor: 'none' }}
                        leftIcon={<FaArrowLeft />}
                        colorScheme='yellow'
                        size={'xs'}
                    >
                        <Text fontSize={'13px'}>সোশ্যাল একাউন্ট লগইন</Text>
                    </Button>
                </Box>

                {/* <Divider borderColor={'blackAlpha.100'} mb={5}/> */}

                <Box>
                    <Input
                        border={'1px'}
                        borderColor='blackAlpha.200'
                        _focus={{ ring: '0', border: '1px', borderColor: 'blackAlpha.300' }}
                        _hover={{ ring: '0', border: '1px', borderColor: 'blackAlpha.200' }}
                        bg={'whiteAlpha.700'}
                        size={'sm'}
                        placeholder='ইমেইল এড্রেস / ইউজারনেম'
                        type='email'
                    />
                    <Spacer h={2} />
                    <Input
                        border={'2px'}
                        borderColor='blackAlpha.200'
                        _focus={{ ring: '0', border: '1px', borderColor: 'blackAlpha.300' }}
                        _hover={{ ring: '0', border: '1px', borderColor: 'blackAlpha.200' }}
                        _autofill={false}
                        bg={'whiteAlpha.700'}
                        size={'sm'}
                        placeholder='পাসওয়ার্ড'
                        type='password'
                    />

                    <Spacer h={3} />

                    <a href='#'><Text fontSize={'13px'} color='blue.800'>পাসওয়ার্ড মনে নেই ?</Text></a>

                    <Spacer h={3} />

                    <Button w='full' colorScheme={'blue'} shadow='sm' rounded={'sm'} size={'sm'}>প্রবেশ করুন</Button>
                </Box>
            </>}


        </Box>
    )
}