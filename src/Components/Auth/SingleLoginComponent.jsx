import { Box, Button, Center, Flex, FormControl, FormErrorMessage, Image, Input, Spacer, Text, Wrap } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import React from 'react'
import useLogin from '../../Hooks/useLogin'
import CustomButton from '../Common/CustomButton'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { GoogleLogin } from 'react-google-login';
import { FaFacebook } from 'react-icons/fa'
import { NextLink } from '@mantine/next'
import { setRedirectUrl } from '../../Helpers/cookieHelper'
import { useRouter } from 'next/router'

export default function SingleLoginComponent({redirectUrl = null}) {

    const router = useRouter()

    const { responseFacebook, responseGoogle, onSubmit, handleSubmit, register, errors, isSubmitting, fbLoading, googleLoading } = useLogin(redirectUrl)


    console.log('############################## redirect Url ', redirectUrl)

    return (
        <Box w={{ base: 'full' }}>
            <Box mb={3}>
                <Title order={6}>ইমেইল / ইউজারনেম এবং পাসওয়ার্ড ব্যাবহার করে লগইন করুন</Title>
            </Box>
            <form autoComplete="new-password">
                <FormControl isInvalid={errors.email}>
                    <Input
                        autocomplete="new-password"
                        border={'1px'}
                        borderColor='blackAlpha.200'
                        _focus={{ ring: '0', border: '1px', borderColor: 'blackAlpha.300' }}
                        _hover={{ ring: '0', border: '1px', borderColor: 'blackAlpha.200' }}
                        bg={'whiteAlpha.700'}
                        size={'md'}
                        placeholder='ইমেইল এড্রেস / ইউজারনেম'
                        type='text'
                        {...register('email')}
                    />
                    <FormErrorMessage>
                        {errors.email && errors.email.message}
                    </FormErrorMessage>
                </FormControl>

                <Spacer h={2} />

                <FormControl isInvalid={errors.password}>
                    <Input
                        autocomplete="new-password"
                        border={'2px'}
                        borderColor='blackAlpha.200'
                        _focus={{ ring: '0', border: '1px', borderColor: 'blackAlpha.300' }}
                        _hover={{ ring: '0', border: '1px', borderColor: 'blackAlpha.200' }}
                        bg={'whiteAlpha.700'}
                        size={'md'}
                        placeholder='পাসওয়ার্ড'
                        type='password'
                        {...register('password')}
                    />
                    <FormErrorMessage>
                        {errors.password && errors.password.message}
                    </FormErrorMessage>
                </FormControl>

                <Spacer h={3} />


                <Text>

                    <Text as={'span'} fontSize={'14px'} color='blue.800'>পাসওয়ার্ড মনে নেই? <NextLink color='red' href={'/auth/create_acc'}>এখানে ক্লিক করুন</NextLink> / </Text> 

                    <Text as={'span'} fontSize={'14px'}>একাউন্ট না থাকলে <Text as={'span'} cursor='pointer' color={'blue'} onClick={() => {
                        redirectUrl && setRedirectUrl(redirectUrl)
                        router.push('/auth/create_acc')
                    }} href={''}>নিবন্ধন করে নিন</Text></Text>

                </Text>

                <Spacer h={3} />


                <CustomButton
                    isLoading={isSubmitting}
                    onClick={handleSubmit(onSubmit)}
                    w='auto'
                    px={10}
                    colorScheme={'blue'}
                    shadow='sm'
                    rounded={'md'}
                    size={'md'}
                >
                    প্রবেশ করুন
                </CustomButton>



            </form>


            <Center mb={5} mt={3}><Text fontSize={'14px'} color='blackAlpha.600'>অথবা</Text></Center>


            <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: 2, md: 3 }}>
                <FacebookLogin
                    appId={process.env.FACEBOOK_APP_ID}
                    autoLoad={false}
                    callback={responseFacebook}
                    render={renderProps => <Button
                        isLoading={fbLoading || renderProps.isProcessing}
                        loadingText='অপেক্ষা করুন...'
                        isDisabled={googleLoading}
                        onClick={renderProps.onClick}
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
                    clientId={process.env.GOOGLE_CLIENT_ID}
                    buttonText="Login"
                    autoLoad={false}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    render={renderProps => <Button
                        isLoading={googleLoading || renderProps.isProcessing}
                        loadingText='অপেক্ষা করুন...'
                        isDisabled={fbLoading}
                        onClick={renderProps.onClick}
                        leftIcon={<Image h='20px' bg={'transparent'}
                            src='https://aws1.discourse-cdn.com/auth0/optimized/3X/8/a/8a06490f525c8f65d4260204bc3bc7b0e1fb0ba7_2_500x500.png'
                            color='red'
                        />}
                        bg={'blackAlpha.200'}
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

            </Flex>


        </Box >
    )
}
