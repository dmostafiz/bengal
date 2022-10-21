import { Box } from '@chakra-ui/react';
import { Carousel } from '@mantine/carousel';
import { Button, createStyles, Paper, Text, Title, useMantineTheme } from '@mantine/core';
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
            'https://s3.amazonaws.com/somewherein/pictures/ayena/ayena-1664876247-6f7b737_xlarge.jpg',
        title: 'অনুবাদঃ সর্বেশ্বর দয়াল সাক্সেনার আরও তিনটি কবিতা',
        category: 'nature',
    },
    {
        image:
            'https://s3.amazonaws.com/somewherein/pictures/sherzatapon/sherzatapon-1665287090-be03f99_xlarge.jpg',
        title: 'কিভাবে কিছু প্রাণী ‘কুমারী জন্মদান’ করে: পার্থেনোজেনেসিস- এর ব্যাখ্যা করা হয়েছে',
        category: 'beach',
    },
    {
        image:
            'https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'পথে-প্রান্তরে (পর্ব-১২): অসলো (শেষ কিস্তি)',
        category: 'nature',
    },
    {
        image:
            'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'গল্পঃ জীবনের শেষ মুহুর্ত',
        category: 'nature',
    },
    {
        image:
            'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'বাংলার প্রাচীন মঠ (স্মৃতি-মন্দির) সমগ্র - ০৩',
        category: 'tourism',
    },
    {
        image:
            'https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'বালিয়াটি জমিদার বাড়ি',
        category: 'nature',
    },
];


export default function SelectedPostsCarousel() {

    const useStyles = createStyles((theme) => ({
        card: {
            height: 350,
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

    const { classes } = useStyles();


    const [posts, setPosts] = useState([])


    useEffect(() => {
        setPosts(data)
    }, [])

    return (
        <Box w='full'>
            <Swiper
                spaceBetween={10}
                slidesPerView={useBreakpointValue({
                    base: 1,
                    md: 1,
                    lg: 2
                })}
                navigation
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                modules={[Navigation, Scrollbar]}
            >
                {posts.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Paper
                            shadow="lg"
                            p="xl"
                            radius="md"
                            sx={{ backgroundImage: `url(${item.image})` }}
                            className={classes.card}
                        >
                            <div>
                                <Text className={classes.category} size="xs">
                                    {item.category}
                                </Text>
                                <Title order={3} className={classes.title}>
                                    {item.title}
                                </Title>
                            </div>
                            <Button variant="white" color="dark">
                                বিস্তারিত পড়ুন
                            </Button>
                        </Paper>
                    </SwiperSlide>
                ))}

                {/* <span slot="container-start">Container Start</span> */}
            </Swiper>
        </Box>
    );

}
