import { Avatar, Box, Button, Center, Divider, Flex, Image, Input, Spacer, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaArrowLeft, FaBackspace, FaEnvelope, FaFacebook, FaFacebookF, FaGoogle, FaSignInAlt } from 'react-icons/fa'

export default function RegistrationComponent() {

    const [toggleEmainLogin, setToggleEmainLogin] = useState(false)

    return (
        <Box>
            {/* <Center p={3} bg='blackAlpha.50'>
        <Title order={5}>ব্লগে প্রবেশ করুন</Title>
    </Center> */}

            <>
                <Button
                    // isLoading
                    mb='3'
                    leftIcon={<FaFacebook size={20} />}
                    colorScheme={'facebook'}
                    shadow='sm'
                    w='full'
                    rounded={'sm'}
                    gap={2}
                >
                    <Text fontSize={'13px'}>ফেসবুক থেকে রেজিস্ট্রেশন করুন</Text>
                </Button>


                <Button
                    // isLoading

                    mb='2'
                    leftIcon={<Image h='20px' bg={'transparent'}
                        src='https://aws1.discourse-cdn.com/auth0/optimized/3X/8/a/8a06490f525c8f65d4260204bc3bc7b0e1fb0ba7_2_500x500.png'
                        color='red'
                    />}
                    bg={'whiteAlpha.900'}
                    colorScheme={'gray'}

                    _hover={{
                        bg: 'whiteAlpha.900',
                        shadow: 'md'
                    }}
                    border='1px'
                    borderColor={'blackAlpha.50'}

                    shadow='sm'
                    w='full'
                    rounded={'sm'}
                    size='md'
                    gap={2}
                >
                    <Text fontSize={'13px'}>গুগোল থেকে রেজিস্ট্রেশন করুন</Text>
                </Button>

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
                    <Text fontSize={'13px'}>ম্যানুয়ালি রেজিস্ট্রেশন করুন</Text>
                </Button>}

            </>
            {toggleEmainLogin && <>

                {/* <Divider borderColor={'blackAlpha.100'} mb={3} /> */}

                <Box>

                    {/* <Text mb={1} fontSize={'14px'}>ইমেইল এড্রেস</Text> */}
                    <Input
                        border={'1px'}
                        borderColor='blackAlpha.200'
                        _focus={{ ring: '0', border: '1px', borderColor: 'blackAlpha.300' }}
                        _hover={{ ring: '0', border: '1px', borderColor: 'blackAlpha.200' }}
                        bg={'whiteAlpha.700'} size={'sm'}
                        placeholder='আপনার ইমেইল এড্রেসটি দিন'
                        type='email'
                    />

                    <Spacer h={3} />

                    {/* <Text mb={1} fontSize={'14px'}>পাসওয়ার্ড</Text>
                    <Input
                        border={'none'}
                        _focus={{ ring: '0', border: 'none' }}
                        _hover={{ ring: '0', border: 'none' }}
                        _autofill={false} bg={'whiteAlpha.700'}
                        size={'sm'}
                        placeholder='পাসওয়ার্ড দিন'
                        type='password'
                    />

                    <Spacer h={3} />

                    <Text mb={1} fontSize={'14px'}>পুনঃ পাসওয়ার্ড</Text>
                    <Input
                        border={'none'}
                        _focus={{ ring: '0', border: 'none' }}
                        _hover={{ ring: '0', border: 'none' }}
                        _autofill={false} bg={'whiteAlpha.700'}
                        size={'sm'}
                        placeholder='পুনঃ পাসওয়ার্ড দিন'
                        type='password'
                    />
                    
                    <Spacer h={5} /> */}

                    {/* <a href='#'><Text fontSize={'13px'} color='blue.800'>পাসওয়ার্ড মনে নেই ?</Text></a> */}
                    {/* <Spacer h={2} /> */}
                    <Button w='full' colorScheme={'blue'} shadow='sm' rounded={'sm'} size={'sm'}>রেজিস্ট্রেশন করুন</Button>


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
                </Box>
            </>}


        </Box>
    )
}
