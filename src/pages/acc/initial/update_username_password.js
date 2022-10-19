import { Box, Button, Divider, Flex, FormControl, FormErrorMessage, Input, InputGroup, Select, Spacer, Textarea, useToast } from '@chakra-ui/react'
import { NativeSelect, Title } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import React from 'react'
import BloggerRightSidebar from '../../../Components/blogger/BloggerRightSidebar'
import HomeLayout from '../../../Layouts/HomeLayout'
import LayoutColumn from '../../../Layouts/HomeLayout/LayoutColumn'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import SiteLogoDesktop from '../../../Components/Common/SiteLogoDesktop'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import Axios from '../../../Helpers/axiosHelper'
import { getRedirectUrl, getUpdateToken, removeUpdateToken, setAccessToken, setFlashMessage } from '../../../Helpers/cookieHelper'
import CustomButton from '../../../Components/Common/CustomButton'
import InitialUpdatePageWrapper from '../../../Wrappers/InitialUpdatePageWrapper'


const schema = yup.object({
    userName: yup.string()

        .min(3, 'সর্বনিম্ন ৩ টি ক্যারেক্টার লিখতে পারবেন।')

        .max(10, 'সর্বোচ্চ ১০ টি ক্যারেক্টার লিখতে পারবেন।')

        .required('ইউজারনেম ঘরটি ফাঁকা রাখা যাবেনা।')

        .matches(

            /^[a-zA-Z_.]*$/u,

            'শুধুমাত্র ইংরেজি অক্ষরে লিখতে পারবেন। কোন স্পেস বা স্পেশাল ক্যারেক্টার ব্যাবহার করা যাবেনা।'
        )
        .test(

            'checkUsernameUnique',

            'দুঃখিত! ইউজারনেমটি অন্য একজন ব্যাবহার করছেন!',

            async (value) => {

                const res = await Axios.post(`/user/check_user_exists`, { by: 'username', value }, {

                    withCredentials: true,

                })

                if (res?.data.ok === true) {

                    return false

                }

                return true
            }
        ),

    password: yup.string()
        .min(6, 'সর্বনিম্ন ৬ টি ক্যারেক্টার লিখতে পারবেন।')
        .required('পাসওয়ার্ড ঘরটি ফাঁকা রাখা যাবেনা।'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'পাসওয়ার্ড এর সাথে নিশ্চিতকরণ পাসওয়ার্ড এর মিল নেই।')
        .required('পাসওয়ার্ড নিশ্চিতকরন ঘরটি ফাঁকা রাখা যাবেনা।'),

}).required();


export default function update_username_password() {

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    })

    const router = useRouter()
    const toast = useToast()

    const handlSaveLoginInfo = async (values) => {

        console.log('values ', values)
        // Cookies.remove('updateToken')

        const { data } = await Axios.post('/auth/update_initial_usernamePassword', { ...values }, {
            headers: {
                Authorization: `Bearer ${getUpdateToken()}`
            }
        })

        if (data.ok) {

            removeUpdateToken()

            console.log(data)

            setAccessToken(data.accessToken)

            toast({
                title: 'আপনার নিবন্ধন সম্পন্ন হয়েছে',
                description: "স্বাগতম! এই ব্লগে একজন নিবন্ধিত সদস্য হওয়ার জন্য আপনাকে অসংখ্য ধন্যবাদ। আশা করছি লেখক বা পাঠক হিসেবে আপনি ব্লগ এর সমস্ত নীতিমালা জেনে নেবেন এবং সেগুলোর যথার্থ সম্মান করবেন।",
                status: 'success',
                position: 'top-right',
                duration: 9000,
                isClosable: true,
            })

            setFlashMessage('success', 'আপনার নিবন্ধন সম্পন্ন হয়েছে', "স্বাগতম! এই ব্লগে একজন নিবন্ধিত সদস্য হওয়ার জন্য আপনাকে অসংখ্য ধন্যবাদ। আশা করছি লেখক বা পাঠক হিসেবে আপনি ব্লগ এর সমস্ত নীতিমালা জেনে নেবেন এবং সেগুলোর যথার্থ সম্মান করবেন।")

            window.location.href = getRedirectUrl()

        } else {
            toast({
                title: 'দুঃখিত!',
                description: "সার্ভার এর কোন একটি সমস্যার কারণ আপনার রিকুয়েস্টটি সফল হয়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।",
                status: 'error',
                position: 'top-right',
                duration: 9000,
                isClosable: true,
            })

        }

    }
    return (

        <InitialUpdatePageWrapper>

            <LayoutColumn
                rightSide={<></>}
                leftSide={<></>}
                rightColumnWidth={25}
            >
                <SiteLogoDesktop />

                <Spacer h={8} />

                <Box py={2} mb={8} borderBottom={'2px'} borderColor={'gray.100'}>
                    <Title order={4}>ইউজারনেম এবং পাসওয়ার্ড</Title>
                </Box>

                <form autocomplete="new-password">

                    <Box mb={8}>


                        <Box mb={8} mt={5}>
                            <Box mb={1} px={0}>
                                <Title order={6}>লগইন ইউজারনেম ( ইংরেজি )</Title>
                            </Box>
                            <FormControl isInvalid={errors.userName}>
                                <Input
                                    border={'1px'}
                                    borderColor='blackAlpha.200'
                                    _focus={{ ring: '0', border: '1px', borderColor: 'blackAlpha.300' }}
                                    _hover={{ ring: '0', border: '1px', borderColor: 'blackAlpha.200' }}
                                    bg={'whiteAlpha.700'}
                                    size={'sm'}
                                    placeholder='ইংরেজিতে আপনার লগইন ইউজারনেম লিখুন'
                                    rightSide='dfd'
                                    type='text'
                                    {...register('userName')}
                                />
                                <FormErrorMessage>
                                    {errors.userName && errors.userName.message}
                                </FormErrorMessage>
                            </FormControl>
                        </Box>

                        <Box mb={8} mt={5}>
                            <Box mb={1} px={0}>
                                <Title order={6}>পাসওয়ার্ড ( ইংরেজি )</Title>
                            </Box>
                            <FormControl isInvalid={errors.password}>
                                <Input
                                    border={'1px'}
                                    borderColor='blackAlpha.200'
                                    _focus={{ ring: '0', border: '1px', borderColor: 'blackAlpha.300' }}
                                    _hover={{ ring: '0', border: '1px', borderColor: 'blackAlpha.200' }}
                                    bg={'whiteAlpha.700'}
                                    size={'sm'}
                                    placeholder='পরবর্তীতে লগইন করার জন্য একটি পাসওয়ার্ড লিখুন'
                                    autocomplete="new-password"
                                    type='password'
                                    {...register('password')}
                                />
                                <FormErrorMessage>
                                    {errors.password && errors.password.message}
                                </FormErrorMessage>
                            </FormControl>
                        </Box>

                        <Box mb={8} mt={5}>
                            <Box mb={1} px={0}>
                                <Title order={6}>পুনঃ পাসওয়ার্ড  ( ইংরেজি )</Title>
                            </Box>
                            <FormControl isInvalid={errors.confirmPassword}>
                                <Input
                                    border={'1px'}
                                    borderColor='blackAlpha.200'
                                    _focus={{ ring: '0', border: '1px', borderColor: 'blackAlpha.300' }}
                                    _hover={{ ring: '0', border: '1px', borderColor: 'blackAlpha.200' }}
                                    bg={'whiteAlpha.700'}
                                    size={'sm'}
                                    placeholder='পাসওয়ার্ডটি নিশ্চিত করতে আবারও টাইপ করুন'
                                    rightSide='dfd'
                                    type='password'
                                    {...register('confirmPassword')}
                                />
                                <FormErrorMessage>
                                    {errors.confirmPassword && errors.confirmPassword.message}
                                </FormErrorMessage>
                            </FormControl>
                        </Box>


                        <CustomButton
                            isLoading={isSubmitting}
                            onClick={handleSubmit(handlSaveLoginInfo)}
                            colorScheme={'green'}
                        >
                            লগইন ইনফরমেশন আপডেট করুন
                        </CustomButton>

                    </Box>

                </form>


            </LayoutColumn>

        </InitialUpdatePageWrapper>

    )
}
