import { Box, Button, Divider, Flex, Input, InputGroup, Select, Spacer, Textarea, useToast } from '@chakra-ui/react'
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


export default function update_username_password() {
    const router = useRouter()
    const toast = useToast()

    const handleSubmit = () => {

        Cookies.remove('profileUpdateToken')

        toast({
            title: 'আপনার নিবন্ধন সম্পন্ন হয়েছে',
            description: "স্বাগতম! এই ব্লগে একজন নিবন্ধিত সদস্য হওয়ার জন্য আপনাকে অসংখ্য ধন্যবাদ। আশা করছি লেখক বা পাঠক হিসেবে আপনি ব্লগ এর সমস্ত নীতিমালা জেনে নেবেন এবং সেগুলোর যথার্থ সম্মান করবেন।",
            status: 'success',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          })

        router.push('/')
    }
    return (
        <>

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


                <Box mb={8}>


                    <Box mb={8} mt={5}>
                        <Box mb={1} px={0}>
                            <Title order={6}>লগইন ইউজারনেম ( ইংরেজি )</Title>
                        </Box>
                        <InputGroup>
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
                            />
                        </InputGroup>
                    </Box>

                    <Box mb={8} mt={5}>
                        <Box mb={1} px={0}>
                            <Title order={6}>পাসওয়ার্ড ( ইংরেজি )</Title>
                        </Box>
                        <InputGroup>
                            <Input
                                border={'1px'}
                                borderColor='blackAlpha.200'
                                _focus={{ ring: '0', border: '1px', borderColor: 'blackAlpha.300' }}
                                _hover={{ ring: '0', border: '1px', borderColor: 'blackAlpha.200' }}
                                bg={'whiteAlpha.700'}
                                size={'sm'}
                                placeholder='পরবর্তীতে লগইন করার জন্য একটি পাসওয়ার্ড লিখুন'
                                rightSide='dfd'
                                type='text'
                            />
                        </InputGroup>
                    </Box>

                    <Box mb={8} mt={5}>
                        <Box mb={1} px={0}>
                            <Title order={6}>পুনঃ পাসওয়ার্ড  ( ইংরেজি )</Title>
                        </Box>
                        <InputGroup>
                            <Input
                                border={'1px'}
                                borderColor='blackAlpha.200'
                                _focus={{ ring: '0', border: '1px', borderColor: 'blackAlpha.300' }}
                                _hover={{ ring: '0', border: '1px', borderColor: 'blackAlpha.200' }}
                                bg={'whiteAlpha.700'}
                                size={'sm'}
                                placeholder='পাসওয়ার্ডটি যাচাই করতে আবারও লিখুন'
                                rightSide='dfd'
                                type='text'
                            />
                        </InputGroup>
                    </Box>


                    <Button onClick={() => handleSubmit()} colorScheme={'green'}>লগইন ইনফরমেশন আপডেট করুন</Button>

                </Box>


            </LayoutColumn>

        </>
    )
}
