import { Button, Avatar, Box, Divider, Flex, Wrap, Text, Icon, AvatarBadge } from '@chakra-ui/react';
import { Carousel } from '@mantine/carousel';
import { createStyles, Paper, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { useCallback, useEffect, useState } from 'react'
import { useBreakpointValue } from '@chakra-ui/react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css/pagination';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

import { Navigation, Pagination, Scrollbar } from 'swiper';
import Link from 'next/link';
import { ArrowForward } from 'tabler-icons-react';
import Axios from '../../Helpers/axiosHelper';
import { useQuery } from '@tanstack/react-query';
import banglaNumber from '../../Helpers/banglaNumber';
import useOnlineUser from '../../Hooks/useOnlineUser';
import TopCommentersSkeleton from '../Common/Skeletons/TopCommentersSkeleton';

export default function TopCommenters() {

    const { data, isLoading } = useQuery(['topCommenters'], async () => {
        const res = await Axios.get('/user/top_commenters')
        console.log('top Commenters', res)
        return res?.data?.users
    })

    const { isUserOnline } = useOnlineUser()


    return (
        <Box w='full'>
            {/* <Text mb={3} order={5}>মাসের সেরা ব্লগার নির্ধারইত হয় ব্লগারের পোষ্ট, মন্তব্য, পোস্ট এর লাইক ও কতিপয় বিষয়ের উপর ভিত্তি করে। এটি এই ব্লগের একটি স্বয়ংক্রিয় সিস্টেম।</Text> */}
            <Swiper
                spaceBetween={8}
                slidesPerView={useBreakpointValue({
                    base: 3,
                    sm: 4,
                    md: 4,
                    lg: 5,
                    xl: 5
                })}
                navigation
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                modules={[Navigation, Scrollbar]}
            >
                {data?.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Box py={2}>
                            <Link href={`/blogger/${item.id}`}>
                                <Box bg='white' _hover={{ bg: 'blackAlpha.50' }} cursor='pointer' border={'1px'} borderColor='blackAlpha.200' color='blackAlpha.800' px={1} py={2} shadow='md' rounded='xl'>
                                    <Flex direction={'column'} alignItems='center' gap={{ base: 1, md: 2 }}>
                                        <Box>
                                            <Avatar size={'md'} src={item.avatar} rounded={'full'} shadow name='লিমন লস্কর'>
                                                {isUserOnline(item.id) && <AvatarBadge boxSize='10px' border='1px' bg='green.500' />}
                                            </Avatar>
                                        </Box>
                                        <Box textAlign={'center'}>
                                            <Title order={6}><Text noOfLines={1}>{item.displayName}</Text></Title>
                                            <Text fontSize={'12px'}>{banglaNumber(item.postComments?.length)} টি মন্তব্য</Text>
                                        </Box>
                                    </Flex>
                                    {/* <Box>

                                    <Divider my={1} borderColor='whiteAlpha.300' />

                                    <Box bg={'blackAlpha.5'} fontSize={'13px'}>
                                    <Link href={`/blogger/${item.id}`}>
                                    <Button w='full' size='xs' rounded={'md'} colorScheme={'yellow'}>প্রোফাইল দেখুন</Button>
                                        </Link>
                                    </Box>
                                      </Box> */}
                                    {/* <Divider my={1} /> */}
                                </Box>
                            </Link>
                        </Box>

                    </SwiperSlide>
                ))}

                {isLoading && <>
                    <SwiperSlide>
                        <TopCommentersSkeleton />
                    </SwiperSlide>
                    <SwiperSlide>
                        <TopCommentersSkeleton />
                    </SwiperSlide>
                    <SwiperSlide>
                        <TopCommentersSkeleton />
                    </SwiperSlide>
                    <SwiperSlide>
                        <TopCommentersSkeleton />
                    </SwiperSlide>
                    <SwiperSlide>
                        <TopCommentersSkeleton />
                    </SwiperSlide>  
                    <SwiperSlide>
                        <TopCommentersSkeleton />
                    </SwiperSlide>
                </>}

                {/* <span slot="container-start">Container Start</span> */}
            </Swiper>

            {/* <Box pt={3}>
                <Link href='/bloggers'>
                    <Flex cursor={'pointer'} color={'blue.700'}>
                        <Icon as={ArrowForward} fontSize='24px' />
                        <Text fontWeight='bold'>সকল ব্লগার প্রোফাইল</Text>
                    </Flex>
                </Link>
            </Box> */}
        </Box >
    )
}
