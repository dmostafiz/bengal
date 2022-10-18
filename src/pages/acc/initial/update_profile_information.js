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

// update_profile_information

export default function update_profile_information() {

    const router = useRouter()
    const toast = useToast()

    const handleSubmit = () => {

        Cookies.remove('profileUpdateToken')

        toast({
            title: 'প্রোফাইল এর তথ্য হালনাগাদ হয়েছে!',
            description: "পরবর্তীতে লগইন এর সুবিধার্থে আপনার ইউজার নাম এবং পাসওয়ার্ড সেট করুন।",
            status: 'success',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
        })

        router.push('/acc/initial/update_username_password')
    }

    return (
        <LayoutColumn
            rightSide={<></>}
            leftSide={<></>}
            rightColumnWidth={25}
        >

            <SiteLogoDesktop />

            <Spacer h={8} />


            <Box py={2} mb={8} borderBottom={'2px'} borderColor={'gray.100'}>
                <Title order={4}>প্রোফাইল ইনফরমেশন</Title>
            </Box>


            <Box mb={8}>

                <Box mb={8}>
                    <Box mb={1} px={0}>
                        <Title order={6}>প্রোফাইল ছবি</Title>
                    </Box>
                    <Box>
                        <Flex direction={{ base: 'column', md: 'row' }} alignItems={{ base: 'center', md: 'center' }} gap={3}>

                            <Box shadow={'sm'} rounded='md' h='100px' w='100px' backgroundSize={'contain'} backgroundImage={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSjFKAL4_hBfc12CUM2QqIK-D75TTU2NKgIg&usqp=CAU'}>

                            </Box>

                            <Button size={'sm'}>ছবি আপলোড করুন</Button>
                        </Flex>
                    </Box>
                </Box>


                <Box mb={8}>
                    <Box mb={1} px={0}>
                        <Title order={6}>আপনার নাম ( বাংলা )</Title>
                    </Box>
                    <InputGroup>
                        <Input
                            border={'1px'}
                            borderColor='blackAlpha.200'
                            _focus={{ ring: '0', border: '1px', borderColor: 'blackAlpha.300' }}
                            _hover={{ ring: '0', border: '1px', borderColor: 'blackAlpha.200' }}
                            bg={'whiteAlpha.700'}
                            size={'sm'}
                            placeholder='এখানে আপনার সম্পূর্ণ নামটি বাংলাই লিখুন'
                            rightSide='dfd'
                            type='text'
                        />
                    </InputGroup>
                </Box>

                <Flex direction={{ base: 'column', md: 'row' }} gap={4}>

                    <Box flex='1' mb={8}>
                        <Box mb={1} px={0}>
                            <Title order={6}>লিঙ্গ</Title>
                        </Box>
                        {/* <NativeSelect
                                data={['পুরুষ', 'নারী', 'অন্য']}
                                placeholder="Pick one"
                                size='sm'
                                withAsterisk
                            /> */}
                        <Select size={'sm'} placeholder='আপনার লিঙ্গ সিলেক্ট করুন'>
                            <option value='male'>পুরুষ</option>
                            <option value='female'>নারী</option>
                            <option value='custom'>অন্য</option>
                        </Select>

                    </Box>


                    <Box flex='1' mb={8}>
                        <Box mb={1} px={0}>
                            <Title order={6}>জন্ম তারিখ</Title>
                        </Box>

                        <InputGroup>
                            <Input
                                border={'1px'}
                                borderColor='blackAlpha.200'
                                _focus={{ ring: '0', border: '1px', borderColor: 'blackAlpha.300' }}
                                _hover={{ ring: '0', border: '1px', borderColor: 'blackAlpha.200' }}
                                bg={'whiteAlpha.700'}
                                size={'sm'}
                                placeholder='আপনার জন্ম তারিখ'
                                rightSide='dfd'
                                type='date'
                            />
                        </InputGroup>

                    </Box>

                </Flex>


                <Box flex='1' mb={8}>
                    <Box mb={1} px={0}>
                        <Title order={6}>আপনার সম্পর্কে</Title>
                    </Box>

                    <InputGroup>
                        <Textarea
                            border={'1px'}
                            borderColor='blackAlpha.200'
                            _focus={{ ring: '0', border: '1px', borderColor: 'blackAlpha.300' }}
                            _hover={{ ring: '0', border: '1px', borderColor: 'blackAlpha.200' }}
                            bg={'whiteAlpha.700'}
                            placeholder='আপনার সম্পর্কে কিছু লিখুন'
                        />
                    </InputGroup>

                </Box>


                <Button onClick={() => handleSubmit()} colorScheme={'green'}>প্রোফাইল আপডেট করুন</Button>


                {/* <Divider /> */}

                {/* <Box mb={8} mt={5}>
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
                    </Box> */}

            </Box>


        </LayoutColumn>
    )
}
