import { Avatar, Box, Button, Center, Divider, Flex, FormControl, FormErrorMessage, Image, Input, Spacer, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaArrowLeft, FaBackspace, FaEnvelope, FaFacebook, FaFacebookF, FaGoogle, FaSignInAlt } from 'react-icons/fa'
import { FacebookProvider } from 'react-facebook';
import FacebookLoginButton from '../Auth/FacebookLoginButton';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { GoogleLogin } from 'react-google-login';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Axios from '../../Helpers/axiosHelper';
import CustomButton from './CustomButton';
import { getRedirectUrl, setAccessToken, setFlashMessage } from '../../Helpers/cookieHelper';


const schema = yup.object({

    email: yup.string()
        .required('লগইন এর জন্য ইমেইল অথবা ইঊজারনেম আবশ্যক!'),

    password: yup.string()
        .required('পাসওয়ার্ড ঘরটি ফাঁকা রাখা যাবেনা।'),

}).required();


export default function LoginComponent() {

    const toast = useToast()

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    })


    const [toggleEmainLogin, setToggleEmainLogin] = useState(false)


    const [facebookLoading, setFLoading] = useState(false)


    const responseFacebook = (response) => {
        console.log('Facebook Login initialized')
        console.log(response);
    }

    const responseGoogle = (response) => {
        console.log('Google Login initialized')
        console.log(response);
    }

    async function onSubmit(values) {

        const res = await Axios.post('/auth/signIn', {...values})

        console.log('Response ', res.data)

        if(res?.data?.ok) {

            toast({
                title: 'ব্লগে আপনাকে স্বাগতম!',
                // description: "ব্লগে আপনাকে স্বাগতম।",
                status: 'success',
                position: 'top-right',
                duration: 9000,
                isClosable: true,
            })

            setAccessToken(res?.data?.accessToken)

            setFlashMessage('success', "ব্লগে আপনাকে স্বাগতম!", "")


            window.location.href = getRedirectUrl()

        }

        if(!res?.data?.ok) {
            toast({
                title: 'দুঃখিত!',
                description: res?.data?.msg ?? 'রিকুয়েস্টটি সফল হয়নি, আবার চেষ্টা করুন।',
                status: 'error',
                position: 'top-right',
                duration: 9000,
                isClosable: true,
            })
        }

    }


    return (
        <Box>
            {/* <Center p={3} bg='blackAlpha.50'>
        <Title order={5}>ব্লগে প্রবেশ করুন</Title>
    </Center> */}


            <>
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
                        <Text fontSize={'13px'}>ফেসবুক থেকে লগইন</Text>
                    </Button>
                    }
                />



                <GoogleLogin
                    clientId="21639709461-pjuq114vpiae24gs165e1aedpp2shau3.apps.googleusercontent.com"
                    buttonText="Login"
                    autoLoad={false}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    render={renderProps => <Button
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
                        <Text fontSize={'13px'}>গুগোল থেকে লগইন</Text>
                    </Button>}
                />



                <Center mb={2}><Text fontSize={'12px'} color='blackAlpha.500'>অথবা</Text></Center>

                {!toggleEmainLogin && <Button
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
                    <Text fontSize={'13px'}>ইমেইল ও পাসওয়ার্ড</Text>
                </Button>}

            </>

            {toggleEmainLogin && <>


                {/* <Divider borderColor={'blackAlpha.100'} mb={5}/> */}

                <form autocomplete="new-password">
                    <FormControl isInvalid={errors.email}>
                        <Input
                            border={'1px'}
                            borderColor='blackAlpha.200'
                            _focus={{ ring: '0', border: '1px', borderColor: 'blackAlpha.300' }}
                            _hover={{ ring: '0', border: '1px', borderColor: 'blackAlpha.200' }}
                            bg={'whiteAlpha.700'}
                            size={'sm'}
                            placeholder='ইমেইল এড্রেস / ইউজারনেম'
                            type='email'
                            {...register('email')}
                        />
                        <FormErrorMessage>
                            {errors.email && errors.email.message}
                        </FormErrorMessage>
                    </FormControl>

                    <Spacer h={2} />

                    <FormControl isInvalid={errors.password}>
                        <Input
                            border={'2px'}
                            autocomplete="new-password"
                            borderColor='blackAlpha.200'
                            _focus={{ ring: '0', border: '1px', borderColor: 'blackAlpha.300' }}
                            _hover={{ ring: '0', border: '1px', borderColor: 'blackAlpha.200' }}
                            bg={'whiteAlpha.700'}
                            size={'sm'}
                            placeholder='পাসওয়ার্ড'
                            type='password'
                            {...register('password')}
                        />
                        <FormErrorMessage>
                            {errors.password && errors.password.message}
                        </FormErrorMessage>
                    </FormControl>

                    <Spacer h={3} />

                    <a href='#'><Text fontSize={'13px'} color='blue.800'>পাসওয়ার্ড মনে নেই ?</Text></a>

                    <Spacer h={3} />

                    <CustomButton
                        isLoading={isSubmitting}
                        onClick={handleSubmit(onSubmit)}
                        w='full'
                        colorScheme={'blue'}
                        shadow='sm'
                        rounded={'sm'}
                        size={'sm'}
                    >
                        প্রবেশ করুন
                    </CustomButton>

                    <Box px={2} pt={3}>
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
                            <Text fontSize={'13px'}>মিনিমাইজ করুন</Text>
                        </Button>
                    </Box>
                </form>
            </>}


        </Box>
    )
}
