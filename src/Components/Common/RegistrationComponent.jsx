import { Box, Button, Center, Image, Input, Spacer, Text, FormErrorMessage,FormControl } from '@chakra-ui/react'
import React from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { GoogleLogin } from 'react-google-login';
import CustomButton from './CustomButton';
import useRegistration from '../../Hooks/useRegistration';
import { FaFacebook } from 'react-icons/fa';

export default function RegistrationComponent() {

    const { responseFacebook, responseGoogle, onSubmit, handleSubmit, register, errors, isSubmitting, fbLoading, googleLoading } = useRegistration()

    return (
        <Box>
            {/* <Center p={3} bg='blackAlpha.50'>
        <Title order={5}>ব্লগে প্রবেশ করুন</Title>
    </Center> */}

            <FacebookLogin
                appId={process.env.FACEBOOK_APP_ID}
                autoLoad={false}
                callback={responseFacebook}
                fields="name,email,picture"
                render={renderProps => <Button
                    isLoading={fbLoading || renderProps.isProcessing}
                    loadingText='অপেক্ষা করুন...'
                    isDisabled={googleLoading}
                    onClick={renderProps.onClick}
                    mb='3'
                    leftIcon={<FaFacebook size={20} />}
                    colorScheme={'facebook'}
                    shadow='sm'
                    w='full'
                    rounded={'sm'}
                    gap={2}
                >
                    <Text fontSize={'13px'}>ফেসবুক থেকে নিবন্ধন</Text>
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
                    mb='2'
                    isLoading={googleLoading || renderProps.isProcessing}
                    loadingText='অপেক্ষা করুন...'
                    isDisabled={fbLoading}
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
                    <Text fontSize={'13px'}>গুগোল থেকে নিবন্ধন</Text>
                </Button>}
            />

            <Center mb={2}><Text fontSize={'12px'} color='blackAlpha.500'>অথবা</Text></Center>


            <Box>

                {/* <Text mb={1} fontSize={'14px'}>ইমেইল এড্রেস</Text> */}
                <FormControl isInvalid={errors.email}>
                    <Input
                        border={'1px'}
                        borderColor='blackAlpha.200'
                        _focus={{ ring: '0', border: '1px', borderColor: 'blackAlpha.300' }}
                        _hover={{ ring: '0', border: '1px', borderColor: 'blackAlpha.200' }}
                        bg={'whiteAlpha.700'} size={'sm'}
                        placeholder='আপনার ইমেইল এড্রেসটি দিন'
                        type='text'
                        {...register('email')}

                    />
                    <FormErrorMessage>
                        {errors.email && errors.email.message}
                    </FormErrorMessage>
                </FormControl>

                <Spacer h={3} />

                <CustomButton
                    isLoading={isSubmitting}
                    isDisabled={fbLoading || googleLoading}
                    onClick={handleSubmit(onSubmit)}
                    w='full' colorScheme={'blue'}
                    shadow='sm' rounded={'sm'}
                    size={'sm'}
                >
                    রেজিস্ট্রেশন করুন
                </CustomButton>

            </Box>

        </Box>
    )
}
