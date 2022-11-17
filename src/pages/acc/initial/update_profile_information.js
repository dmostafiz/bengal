import { Box, Button, Divider, Flex, FormControl, FormErrorMessage, Input, InputGroup, Select, Spacer, Textarea, useToast } from '@chakra-ui/react'
import { FileButton, NativeSelect, Title } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import React, { useEffect, useState } from 'react'
import BloggerRightSidebar from '../../../Components/blogger/BloggerRightSidebar'
import HomeLayout from '../../../Layouts/HomeLayout'
import LayoutColumn from '../../../Layouts/HomeLayout/LayoutColumn'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import SiteLogoDesktop from '../../../Components/Common/SiteLogoDesktop'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import InitialUpdatePageWrapper from '../../../Wrappers/InitialUpdatePageWrapper'
import Axios from '../../../Helpers/axiosHelper'
import { getUpdateToken, removeUpdateToken, setUpdateToken } from '../../../Helpers/cookieHelper'
import CustomButton from '../../../Components/Common/CustomButton'
import useInitialUpdateUser from '../../../Hooks/useInitialUpdateUser'

// update_profile_information
const schema = yup.object({
    fullName: yup.string()
        .min(3, 'সর্বনিম্ন ৩ টি ক্যারেক্টার লিখতে পারবেন।')
        .max(20, 'সর্বোচ্চ 2০ টি ক্যারেক্টার লিখতে পারবেন।')
        .required('আপনার নাম এর ঘরটি অবশ্যই পূরণ করতে হবে।'),
    gender: yup.string()
        .required('আপনার লিঙ্গ নির্ধারণ করুন।'),
    birthDate: yup.string()
        .required('আপনার জন্ম তারিখ নির্ধারণ করুন।'),
    bio: yup.string()
        // .min(10, 'কমপক্ষে ১০ টি বাক্য লিখুন।')
        .test('len', 'কমপক্ষে ৬ টি বাক্য লিখতে হবে।', val => {
            const wordsArr = val.split(' ')
            return wordsArr.length >= 6
            //    console.log(wordsArr)
        })
        .required('আপনার সম্পর্কে বিস্তারিত লিখুন')

}).required();

export default function update_profile_information() {

    const {loading, avatar, email} = useInitialUpdateUser()

    console.log('Social Avatar: ', avatar)


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

    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null);
    const [image, setImage] = useState(null)


    useEffect(() => {
        // console.log('Social Avatar ', avatar)
        setPreview(avatar || null)
    }, [avatar])


    useEffect(() => {

        if (file) {

            const fileSize = file.size / 1024 / 1024

            console.log('File size: ', fileSize)

            if (fileSize > 1) {
                toast({
                    title: 'দুঃখিত!',
                    description: "আপনি সর্বচ্চো ১ মেগাবাইট এর ছবি আপলোড করতে পারবেন!",
                    status: 'error',
                    position: 'top-right',
                    duration: 9000,
                    isClosable: true,
                })

                setFile(null)

                return
            }

            // if(file.size > )

            setPreview(URL.createObjectURL(file))
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                // console.log('Loaded Image: ', reader.result)
                setImage(reader.result)
            }
        }

    }, [file])

    const updateProfileInfo = async (values) => {

        // console.log('values ', values)
        const profileUpdateToken = getUpdateToken()

        const res = await Axios.post('/auth/update_initial_profile_info', { ...values, image }, {
            headers: {
                Authorization: `Bearer ${profileUpdateToken}`
            }
        })

        console.log('Profile Update Data ', res.data)

        if (res?.data.ok) {

            removeUpdateToken()
            setUpdateToken(res?.data.profileUpdateToken)

            toast({
                title: 'প্রোফাইল হালনাগাদ হয়েছে!',
                description: "পরবর্তীতে লগইন এর সুবিধার্থে আপনার ইউজার নাম এবং পাসওয়ার্ড সেট করুন।",
                status: 'success',
                position: 'top-right',
                duration: 9000,
                isClosable: true,
            })

            router.push('/acc/initial/update_username_password')

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
                    <Title order={4}>প্রোফাইল হালনাগাদ</Title>
                </Box>


                <Box mb={10}>

                    <Flex direction={{ base: 'column', md: 'row' }} mb={8} gap={{ base: 8, md: 8 }}>

                        <Box>
                            <Flex w='120px' h='130px' direction={{ base: 'column' }} gap={0} shadow='sm' rounded='lg' overflow={'hidden'}>
                                <Box
                                    roundedTop='lg'
                                    flex='1'
                                    w='full'
                                    shadow={'sm'}
                                    backgroundSize={'cover'}
                                    bgPos='center'
                                    bgRepeat='no-repeat'
                                    bgImage={preview ??  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSjFKAL4_hBfc12CUM2QqIK-D75TTU2NKgIg&usqp=CAU'}
                                >

                                </Box>

                                {!file && <FileButton onChange={setFile} accept="image/png,image/jpeg">
                                    {(props) => <Button {...props} colorScheme='teal' roundedBottom='lg' fontSize={'12px'} rounded={0} size={'xs'}>ছবি আপলোড করুন</Button>}
                                </FileButton>}

                                {file && <Button onClick={() => {
                                    setFile(null); setPreview(null)
                                }} colorScheme='red' roundedBottom='lg' fontSize={'12px'} rounded={0} size={'xs'}>ছবি সরান</Button>}

                            </Flex>
                        </Box>


                        <Box w='full' flex='1'>

                            <Box mb={{ base: 8, md: 5 }}>
                                <Box mb={1} px={0}>
                                    <Title order={6}>আপনার নাম ( বাংলা )</Title>
                                </Box>
                                <FormControl isInvalid={errors.fullName}>
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
                                        {...register('fullName')}
                                    />
                                    <FormErrorMessage>
                                        {errors.fullName && errors.fullName.message}
                                    </FormErrorMessage>
                                </FormControl>
                            </Box>

                            <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: 10, md: 5 }}>

                                <Box flex='1'>
                                    <Box mb={1} px={0}>
                                        <Title order={6}>লিঙ্গ</Title>
                                    </Box>
                                    {/* <NativeSelect
                                data={['পুরুষ', 'নারী', 'অন্য']}
                                placeholder="Pick one"
                                size='sm'
                                withAsterisk
                            /> */}
                                    <FormControl isInvalid={errors.gender}>
                                        <Select {...register('gender')} size={'sm'} placeholder='আপনার লিঙ্গ নির্ধারণ করুন'>
                                            <option value='male'>পুরুষ</option>
                                            <option value='female'>নারী</option>
                                            <option value='custom'>অন্য</option>
                                        </Select>
                                        <FormErrorMessage>
                                            {errors.gender && errors.gender.message}
                                        </FormErrorMessage>
                                    </FormControl>

                                </Box>


                                <Box flex='1'>
                                    <Box mb={1} px={0}>
                                        <Title order={6}>জন্ম তারিখ</Title>
                                    </Box>

                                    <FormControl isInvalid={errors.birthDate}>
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
                                            {...register('birthDate')}
                                        />
                                        <FormErrorMessage>
                                            {errors.birthDate && errors.birthDate.message}
                                        </FormErrorMessage>
                                    </FormControl>

                                </Box>

                            </Flex>
                        </Box>

                    </Flex>


                    <Box flex='1' mb={8}>
                        <Box mb={1} px={0}>
                            <Title order={6}>আপনার সম্পর্কে</Title>
                        </Box>

                        <FormControl isInvalid={errors.bio}>
                            <Textarea
                                border={'1px'}
                                borderColor='blackAlpha.200'
                                _focus={{ ring: '0', border: '1px', borderColor: 'blackAlpha.300' }}
                                _hover={{ ring: '0', border: '1px', borderColor: 'blackAlpha.200' }}
                                bg={'whiteAlpha.700'}
                                placeholder='আপনার সম্পর্কে কিছু লিখুন'
                                {...register('bio')}
                            />
                            <FormErrorMessage>
                                {errors.bio && errors.bio.message}
                            </FormErrorMessage>
                        </FormControl>

                    </Box>


                    <CustomButton
                        // disabled={errors.email && true}
                        isLoading={isSubmitting}
                        onClick={handleSubmit(updateProfileInfo)}
                        colorScheme={'green'}
                    >
                        প্রোফাইল আপডেট করুন
                    </CustomButton>


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
        </InitialUpdatePageWrapper>
    )
}
