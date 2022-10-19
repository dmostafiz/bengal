import { Button, Avatar, Box, Divider, Flex, Wrap, Text } from '@chakra-ui/react';
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

const data = [
    {
        image:
            'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'অনুবাদঃ সর্বেশ্বর দয়াল সাক্সেনার আরও তিনটি কবিতা',
        description: 'রূপালী রাতে, স্বপ্নের ও নীল চাদর বিছিয়ে, কষ্টের শীতল আবরন জড়িয়ে আমি আছি, আছি, তোমার স্মৃতিতে ভালবাসার সরল বাধন ছিড়ে, চলে গেছ এই হৃদয়টাকে ভেঙ্গে তুমি আমি একই শহরে তবুও একাকী ভিন্ন গ্রহে',
        name: 'লিমন লস্কর',
    },
    {
        image:
            'https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'কিভাবে কিছু প্রাণী ‘কুমারী জন্মদান’ করে: পার্থেনোজেনেসিস- এর ব্যাখ্যা করা হয়েছে',
        description: 'কিভাবে কিছু প্রাণী ‘কুমারী জন্মদান’ করে: পার্থেনোজেনেসিস- এর ব্যাখ্যা করা হয়েছে',
        name: 'সবুজ মেহেদী',
    },
    {
        image:
            'https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'পথে-প্রান্তরে (পর্ব-১২): অসলো (শেষ কিস্তি)',
        description: 'চলে গেছ এই হৃদয়টাকে ভেঙ্গে তুমি আমি একই শহরে তবুও একাকী ভিন্ন গ্রহে',
        name: 'হ্রদয় আহসান',
    },
    {
        image:
            'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'গল্পঃ জীবনের শেষ মুহুর্ত',
        description: 'গল্পঃ জীবনের শেষ মুহুর্ত',
        name: 'জিয়ারুল কবির',
    },
    {
        image:
            'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'বাংলার প্রাচীন মঠ (স্মৃতি-মন্দির) সমগ্র - ০৩',
        description: 'বাংলার প্রাচীন মঠ (স্মৃতি-মন্দির) সমগ্র',
        name: 'নওরাজ মোল্লা',
    },
    {
        image:
            'https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'বালিয়াটি জমিদার বাড়ি',
        description: 'বালিয়াটি জমিদার বাড়ি',
        name: 'টুটুল খান',
    },
];

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


    useEffect(() => {
        setBloggers(data)
    }, [])


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
                                    <Avatar size={{ base: 'sm', md: 'md' }} src={item.image} rounded={'full'} shadow name='লিমন লস্কর' />
                                </Box>
                                <Box>
                                    <Title order={4}><Text noOfLines={1}>{item.name}</Text></Title>
                                    <Text fontSize={'10px'}>@limon_lashkar</Text>
                                </Box>
                            </Flex>

                            <Box>
                                <Box py={2}>
                                    <Text noOfLines={3} fontSize='12px'>{item.description}</Text>
                                </Box>

                                <Divider my={1} borderColor='whiteAlpha.300' />

                                <Box bg={'blackAlpha.5'} fontSize={'13px'}>
                                    <Text mb={2}><Text as='span' fontSize={'16px'} fontWeight='bold'>১৪</Text> টি পোস্ট লিখেছেন</Text>
                                    <Button w='full' size='xs' rounded={'none'} colorScheme={'yellow'}>সকল পোস্ট দেখুন</Button>
                                </Box>
                            </Box>
                            {/* <Divider my={1} /> */}
                        </Box>

                    </SwiperSlide>
                ))}

                {/* <span slot="container-start">Container Start</span> */}
            </Swiper>
        </Box>
    );

}
