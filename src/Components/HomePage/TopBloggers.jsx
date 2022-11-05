import { Button, Avatar, Box, Divider, Flex, Wrap, Text, Icon } from '@chakra-ui/react';
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

export default function TopBloggers() {


    const useStyles = createStyles((theme) => ({
        card: {
            height: 220,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },

        title: {
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
            color: theme.white,
            lineHeight: 1.2,
            fontSize: 32,
            marginTop: theme.spacing.xs,
        },

        category: {
            color: theme.white,
            opacity: 0.7,
            fontWeight: 700,
            textTransform: 'uppercase',
        },
    }));


    const [bloggers, setBloggers] = useState([])


    const { data, isLoading, isError, error } = useQuery(['topBloggers'], async () => {

        const response = await Axios.get('/user/get_top_ranked/12')

        setBloggers(response?.data?.users)
        return response?.data?.users || null

    })


    return (
        <Box w='full'>
            {/* <Text mb={3} order={5}>মাসের সেরা ব্লগার নির্ধারইত হয় ব্লগারের পোষ্ট, মন্তব্য, পোস্ট এর লাইক ও কতিপয় বিষয়ের উপর ভিত্তি করে। এটি এই ব্লগের একটি স্বয়ংক্রিয় সিস্টেম।</Text> */}
            <Swiper
                spaceBetween={10}
                slidesPerView={useBreakpointValue({
                    base: 2,
                    md: 2,
                    lg: 3
                })}
                navigation
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                modules={[Navigation, Scrollbar]}
            >
                {bloggers.map((item, index) => (
                    <SwiperSlide key={index}>

                        <Box bg='blue.800' color='whiteAlpha.800' p={3} rounded='xl'>
                            <Flex direction={{ base: 'row', md: 'row' }} gap={{ base: 1, md: 2 }}>
                                <Box>
                                    <Avatar size={{ base: 'sm', md: 'sm' }} src={item.avatar} rounded={'full'} shadow name='লিমন লস্কর' />
                                </Box>
                                <Box>
                                    <Title order={5}><Text noOfLines={1}>{item.displayName}</Text></Title>
                                    <Text fontSize={'12px'}>{banglaNumber(item.followers?.length)} জন ফলোয়ার</Text>
                                </Box>
                            </Flex>

                            <Box>
                                <Box py={2}>
                                    <Text noOfLines={1} fontSize='12px'>{item.bio}</Text>
                                </Box>

                                <Divider my={1} borderColor='whiteAlpha.300' />

                                <Box bg={'blackAlpha.5'} fontSize={'13px'}>
                                    <Text mb={2}><Text as='span' fontSize={'16px'} fontWeight='bold'>{banglaNumber(item.posts?.length)}</Text> টি পোস্ট লিখেছেন</Text>
                                    <Link href={`/blogger/${item.id}`}>
                                        <Button w='full' size='xs' rounded={'none'} colorScheme={'yellow'}>সকল পোস্ট দেখুন</Button>
                                    </Link>
                                </Box>
                            </Box>
                            {/* <Divider my={1} /> */}
                        </Box>

                    </SwiperSlide>
                ))}

                {/* <span slot="container-start">Container Start</span> */}
            </Swiper>

            <Box pt={3}>
                <Link href='/bloggers'>
                    <Flex cursor={'pointer'} color={'blue.700'}>
                        <Icon as={ArrowForward} fontSize='24px' />
                        <Text fontWeight='bold'>সকল ব্লগার প্রোফাইল</Text>
                    </Flex>
                </Link>
            </Box>
        </Box>
    );

}
