import {
    Avatar, Box, Button, Center, Divider, Flex, Image, Input, Spacer, Text, FormErrorMessage,
    FormLabel,
    FormControl
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaArrowLeft, FaBackspace, FaEnvelope, FaFacebook, FaFacebookF, FaGoogle, FaSignInAlt } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Axios from '../../Helpers/axiosHelper';

const schema = yup.object({
    email: yup.string()
        .email("একটি ভ্যালিড ইমেইল ব্যাবহার করুন!")
        .required('ইমেল ঠিকানাটি আবশ্যক!')
        .test(
            'checkEmailUnique',
            'ইমেইলটি আগে থেকে নিবন্ধিত!',
            async (value) => {
                const res = await Axios.post(`/user/check_user_exists`, { by: 'email', value }, {
                    withCredentials: true,
                })
                
                const { ok, msg } = res.data

                // console.log('checking Value: ', ok)
                 
                if(ok === true ) {
                    return false
                }

                return true
            }
        ),
}).required();

export default function RegistrationComponent() {

    const [toggleEmainLogin, setToggleEmainLogin] = useState(false)

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema)
    })


    async function onSubmit(values) {
        console.log('Form Value', values)

        const res = await Axios.post('/auth/signUp', values, {
            // withCredentials: true
        })

        console.log(res)
    }


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
                    <Text fontSize={'13px'}>ফেসবুক থেকে নিবন্ধন</Text>
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
                    <Text fontSize={'13px'}>গুগোল থেকে নিবন্ধন</Text>
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
                    <Text fontSize={'13px'}>ম্যানুয়ালি নিবন্ধন করুন</Text>
                </Button>}

            </>
            {toggleEmainLogin && <>

                {/* <Divider borderColor={'blackAlpha.100'} mb={3} /> */}

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
                            {...register('email', {
                                required: 'ইমেল ঠিকানাটি আবশ্যক',

                                // minLength: { value: 4, message: 'Minimum length should be 4' },
                            })}

                        />
                        <FormErrorMessage>
                            {errors.email && errors.email.message}
                        </FormErrorMessage>
                    </FormControl>

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
                    <Button isLoading={isSubmitting} onClick={handleSubmit(onSubmit)} w='full' colorScheme={'blue'} shadow='sm' rounded={'sm'} size={'sm'}>রেজিস্ট্রেশন করুন</Button>


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
