import { Box, Button, Center, Flex, FormControl, FormErrorMessage, Image, Input, Spacer, Text } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import React from 'react'
import BlogPanel from '../../Components/Common/BlogPanel'
import MainLeftSidebar from '../../Layouts/Common/MainLeftSidebar'
import MainRightSidebar from '../../Layouts/Common/MainRightSidebar'
import HomeLayout from '../../Layouts/HomeLayout'
import LayoutColumn from '../../Layouts/HomeLayout/LayoutColumn'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { GoogleLogin } from 'react-google-login';
import CustomButton from '../../Components/Common/CustomButton'
import useRegistration from '../../Hooks/useRegistration'
import { FaFacebook } from 'react-icons/fa'
import useUser from '../../Hooks/useUser'
import ComponentLoader from '../../Components/Common/ComponentLoader'

export default function create_acc() {


    const { responseFacebook, responseGoogle, onSubmit, handleSubmit, register, errors, isSubmitting, fbLoading, googleLoading } = useRegistration()

    const { isLoading, authUser } = useUser()

    return (
        <HomeLayout>

            <LayoutColumn

                leftSide={<><BlogPanel /></>}
                rightSide={<></>}
                leftColumnWidth={32}

            >

                {!isLoading ? <Box mb={8}>
                    <Box py={3} mb='5' bg={''} fontWeight='bold' borderBottom={'1px'} borderColor='blackAlpha.100' rounded='sm'>
                        <Title order={3}>{authUser ? 'আপনি লগইন অবস্থাই আছেন' : 'নিবন্ধন করুন'}</Title>
                    </Box>


                    {!authUser ? <Box w={{ base: 'full' }}>

                        <Box mb={2}>
                            <Title order={6}>নিবন্ধন এর জন্য আপনার ইমেল এড্রেসটি দিন</Title>
                        </Box>
                        <Box>

                            {/* <Text mb={1} fontSize={'14px'}>ইমেইল এড্রেস</Text> */}
                            <FormControl isInvalid={errors.email}>
                                <Input
                                    border={'1px'}
                                    borderColor='blackAlpha.200'
                                    _focus={{ ring: '0', border: '1px', borderColor: 'blackAlpha.300' }}
                                    _hover={{ ring: '0', border: '1px', borderColor: 'blackAlpha.200' }}
                                    bg={'whiteAlpha.700'} size={'md'}
                                    placeholder='ইমেইল এড্রেসটি'
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
                                onClick={handleSubmit(onSubmit)}
                                w='auto' px={10} colorScheme={'blue'}
                                shadow='sm' rounded={'md'}
                                size={'md'}
                            >
                                রেজিস্ট্রেশন করুন
                            </CustomButton>

                        </Box>

                        <Center mb={5} mt={3}><Text fontSize={'14px'} color='blackAlpha.600'>অথবা</Text></Center>

                        <Flex direction={{ base: 'column', md: 'row' }} gap={3}>
                            <FacebookLogin
                                appId="561683539070348"
                                autoLoad={false}
                                callback={responseFacebook}
                                render={renderProps => <Button
                                    isLoading={fbLoading}
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
                                clientId="721639709461-pjuq114vpiae24gs165e1aedpp2shau3.apps.googleusercontent.com"
                                buttonText="Login"
                                autoLoad={false}
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                                render={renderProps => <Button
                                    mb='2'
                                    isLoading={googleLoading}
                                    loadingText='অপেক্ষা করুন...'
                                    isDisabled={fbLoading}
                                    onClick={renderProps.onClick}
                                    leftIcon={<Image h='20px' bg={'transparent'}
                                        src='https://aws1.discourse-cdn.com/auth0/optimized/3X/8/a/8a06490f525c8f65d4260204bc3bc7b0e1fb0ba7_2_500x500.png'
                                        color='red'
                                    />}
                                    bg={'blackAlpha.100'}
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

                        </Flex>

                    </Box > : <></>}

                </Box> : <ComponentLoader size='xl' />}


            </LayoutColumn>

        </HomeLayout>
    )
}
