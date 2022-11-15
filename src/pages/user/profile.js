import React, { useEffect, useState } from 'react'
import AccountWrapper from './AccountWrapper'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRouter } from 'next/router';
import { Box, Button, Flex, FormControl, FormErrorMessage, Input, Select, Textarea, useToast } from '@chakra-ui/react';
import { FileButton, Title } from '@mantine/core';
import CustomButton from '../../Components/Common/CustomButton';
import SectionTitle from '../../Components/Common/SectionTitle';
import districts from '../../Helpers/districts';
import Axios from '../../Helpers/axiosHelper';
import AuthWrapper from '../../Wrappers/AuthWrapper';
import AuthWrapperLoginFrom from '../../Components/Auth/AuthWrapperLoginFrom';

const schema = yup.object({
    fullName: yup.string()
        .min(3, 'সর্বনিম্ন ৩ টি ক্যারেক্টার লিখতে পারবেন।')
        .max(20, 'সর্বোচ্চ 2০ টি ক্যারেক্টার লিখতে পারবেন।')
        .required('আপনার নাম এর ঘরটি অবশ্যই পূরণ করতে হবে।'),
    displayName: yup.string()
        .min(3, 'সর্বনিম্ন ৩ টি ক্যারেক্টার লিখতে পারবেন।')
        .max(20, 'সর্বোচ্চ 2০ টি ক্যারেক্টার লিখতে পারবেন।')
        .required('আপনার নাম এর ঘরটি অবশ্যই পূরণ করতে হবে।'),
    gender: yup.string()
        .required('আপনার লিঙ্গ নির্ধারণ করুন।'),
    birthDate: yup.string()
        .required('আপনার জন্ম তারিখ নির্ধারণ করুন।'),

    birthPlace: yup.string()
        .required('আপনার জন্মস্থান নির্ধারণ করুন।'),

    profession: yup.string()
        .required('আপনার পেশা নির্ধারণ করুন।'),

    bio: yup.string()
        // .min(10, 'কমপক্ষে ১০ টি বাক্য লিখুন।')
        .test('len', 'কমপক্ষে ৬ টি বাক্য লিখতে হবে।', val => {
            const wordsArr = val.split(' ')
            return wordsArr.length >= 6
            //    console.log(wordsArr)
        })
        .required('আপনার সম্পর্কে বিস্তারিত লিখুন'),

    email: yup.string()
        .email("দুঃখিত! ইমেইলটি ঠিকানাটি সঠিক নয়!")
        .required('ইমেইল ঠিকানাটি আবশ্যক!')
    // .test(
    //     'checkEmailUnique',
    //     'দুঃখিত! ইমেইলটি আগে থেকে নিবন্ধিত!',
    //     async (value) => {
    //         const res = await Axios.post(`/user/check_user_exists`, { by: 'email', value }, {
    //             withCredentials: true,
    //         })

    //         if (res?.data?.ok === true) {
    //             return false
    //         }

    //         return true
    //     }
    // ),

}).required();

export default function profile() {

    const router = useRouter()

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, defaultValues },
        reset
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    })


    useEffect(() => {
        console.log('defaultValues', defaultValues)
    }, [defaultValues])

    const [user, setUser] = useState(null)

    const toast = useToast()

    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null);
    const [image, setImage] = useState(null)


    useEffect(() => {
        console.log('Social Avatar ', user?.avatar)
        setPreview(user?.avatar)
        reset({
            fullName: user?.fullName,
            displayName: user?.displayName,
            gender: user?.gender,
            birthDate: user?.birthDate,
            profession: user?.profession,
            birthPlace: user?.birthPlace,
            bio: user?.bio,
            email: user?.email
        })

    }, [user])


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

        const res = await Axios.post('/user/update_profile_info', { ...values, image })

        if (res?.data.ok) {

            toast({
                title: 'প্রোফাইল হালনাগাদ হয়েছে!',
                status: 'success',
                position: 'top-right',
                duration: 9000,
                isClosable: true,
            })

        } else {
            toast({
                title: 'দুঃখিত!',
                description: res?.data?.msg || "সার্ভার এর কোন একটি সমস্যার কারণ আপনার রিকুয়েস্টটি সফল হয়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।",
                status: 'error',
                position: 'top-right',
                duration: 9000,
                isClosable: true,
            })

        }

    }


    return (


        <AuthWrapper loading={true} component={<AuthWrapperLoginFrom redirectUrl={router.asPath} />}>
            <AccountWrapper
                title='প্রোফাইল'
                getUser={setUser}
            >

                <Box my={10}>

                    <SectionTitle title={'প্রোফাইল ইনফরমেশন'} />

                    <Flex direction={{ base: 'column', md: 'row' }} mb={8} gap={{ base: 5, md: 5 }}>
                        <Flex w='170px' h='180px' direction={{ base: 'column' }} gap={0} shadow='sm' rounded='lg' overflow={'hidden'}>
                            <Box
                                roundedTop='lg'
                                flex='1'
                                w='full'
                                shadow={'sm'}
                                backgroundSize={'cover'}
                                bgPos='center'
                                bgRepeat='no-repeat'
                                backgroundImage={preview ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSjFKAL4_hBfc12CUM2QqIK-D75TTU2NKgIg&usqp=CAU'}
                            >

                            </Box>

                            {!file && <FileButton onChange={setFile} accept="image/png,image/jpeg">
                                {(props) => <Button {...props} colorScheme='teal' roundedBottom='lg' fontSize={'12px'} rounded={0} size={'xs'}>ছবি আপলোড করুন</Button>}
                            </FileButton>}

                            {file && <Button onClick={() => {
                                setFile(null); setPreview(null)
                            }} colorScheme='red' roundedBottom='lg' fontSize={'12px'} rounded={0} size={'xs'}>ছবি সরান</Button>}

                        </Flex>


                        <Box w='full' flex='1'>

                            <Flex gap={4}>
                                <Box flex='1' mb={{ base: 3, md: 3 }}>
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

                                <Box flex='1' mb={{ base: 3, md: 3 }}>
                                    <Box mb={1} px={0}>
                                        <Title order={6}>প্রদর্শন নাম ( বাংলা )</Title>
                                    </Box>
                                    <FormControl isInvalid={errors.displayName}>
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
                                            {...register('displayName')}
                                        />
                                        <FormErrorMessage>
                                            {errors.displayName && errors.displayName.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Box>
                            </Flex>


                            <Flex gap={4}>
                                <Box flex='1' mb={{ base: 3, md: 3 }}>
                                    <Box mb={1} px={0}>
                                        <Title order={6}>পেশা</Title>
                                    </Box>

                                    <FormControl isInvalid={errors.profession}>
                                        <Select {...register('profession')} size={'sm'} placeholder='আপনার পেশা নির্ধারণ করুন'>
                                            <option value='শিক্ষক'>শিক্ষক</option>
                                            <option value='লেখক / ব্লগার'>লেখক / ব্লগার</option>
                                            <option value='মেডিয়া / সাংবাদিক'>মেডিয়া / সাংবাদিক</option>
                                            <option value='ডাক্তার'>ডাক্তার</option>
                                            <option value='ইঞ্জিনিয়ার / আই-টি'>ইঞ্জিনিয়ার / আই-টি</option>
                                            <option value='ব্যবসায়ী'>ব্যবসায়ী</option>
                                            <option value='চাকরিজীবী'>চাকরিজীবী</option>
                                            <option value='কৃষক / উদ্যোক্তা'>কৃষক / উদ্যোক্তা</option>
                                            <option value='ফ্যাশন ডিজাইনার'>ফ্যাশন ডিজাইনার</option>
                                            <option value='প্রশাসন'>প্রশাসন</option>
                                            <option value='শিক্ষার্থী'>শিক্ষানবিস</option>
                                            <option value='প্রবাসী'>প্রবাসী</option>
                                        </Select>
                                        <FormErrorMessage>
                                            {errors.profession && errors.profession.message}
                                        </FormErrorMessage>
                                    </FormControl>

                                </Box>

                                <Box flex='1' mb={{ base: 3, md: 3 }}>
                                    <Box mb={1} px={0}>
                                        <Title order={6}>লিঙ্গ</Title>
                                    </Box>

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
                            </Flex>

                            <Flex gap={4}>
                                <Box flex='1' mb={{ base: 3, md: 3 }}>
                                    <Box mb={1} px={0}>
                                        <Title order={6}>জন্ম ন্থান</Title>
                                    </Box>
                                    <FormControl isInvalid={errors.birthPlace}>
                                        <Select {...register('birthPlace')} _selected='' size={'sm'} placeholder='আপনার জন্মস্থান নির্ধারণ করুন'>
                                            {districts.map((dist, index) => <option key={index} value={dist.bn_name}>
                                                {dist.bn_name}
                                            </option>)}
                                        </Select>
                                        <FormErrorMessage>
                                            {errors.birthPlace && errors.birthPlace.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Box>

                                <Box flex='1' mb={{ base: 3, md: 3 }}>
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

                    <Box flex='1' mb={3}>
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

                    <Box mb={10}>
                        <SectionTitle title={'লগইন'} />
                        <Flex gap={4}>
                            <Box flex='1' mb={{ base: 3, md: 3 }}>
                                <Box mb={1} px={0}>
                                    <Title order={6}>ইমেইল এড্রেস</Title>
                                </Box>
                                <FormControl isInvalid={errors.email}>
                                    <Input
                                        border={'1px'}
                                        borderColor='blackAlpha.200'
                                        _focus={{ ring: '0', border: '1px', borderColor: 'blackAlpha.300' }}
                                        _hover={{ ring: '0', border: '1px', borderColor: 'blackAlpha.200' }}
                                        bg={'whiteAlpha.700'}
                                        size={'sm'}
                                        placeholder='আপনার সম্পূর্ণ নামটি বাংলাই লিখুন'
                                        rightSide='dfd'
                                        type='text'
                                        {...register('email')}
                                    />
                                    <FormErrorMessage>
                                        {errors.email && errors.email.message}
                                    </FormErrorMessage>
                                </FormControl>
                            </Box>

                            <Box flex='1' mb={{ base: 3, md: 3 }}>
                                <Box mb={1} px={0}>
                                    <Title order={6}>লগইন নাম</Title>
                                </Box>
                                <FormControl>
                                    <Input
                                        disabled
                                        border={'1px'}
                                        borderColor='blackAlpha.200'
                                        _focus={{ ring: '0', border: '1px', borderColor: 'blackAlpha.300' }}
                                        _hover={{ ring: '0', border: '1px', borderColor: 'blackAlpha.200' }}
                                        bg={'whiteAlpha.700'}
                                        size={'sm'}
                                        placeholder='যে নামে সবাই আপনাকে দেখবে'
                                        rightSide='dfd'
                                        type='text'
                                        value={user?.userName}
                                    />
                                </FormControl>
                            </Box>
                        </Flex>
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


            </AccountWrapper>

        </AuthWrapper>

    )
}
