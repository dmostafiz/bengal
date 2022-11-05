import { Avatar, Box, Button, Center, Flex, Icon, Image, Text, Wrap } from '@chakra-ui/react';
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
// import { useQuery } from '@tanstack/react-query';
import Axios from '../../Helpers/axiosHelper';
import { useQuery } from '@tanstack/react-query';
import formatDate from '../../Helpers/formatDate';
import AuthorHoverCard from '../Common/AuthorHoverCard';

export default function TopPostsCarousel() {

    const [posts, setPosts] = useState([])

    const { data, isLoading, isError, error } = useQuery(['topPosts'], async () => {
        const response = await Axios.get('/post/get_top_posts/12')
        console.log('top posts', response)
        setPosts(response?.data?.posts)
        return response?.data?.posts || null
    })

    return (
        <Box w='full'>
            <Swiper
                spaceBetween={12}
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

                        <Box shadow='md' borderColor={'blackAlpha.200'} p={0} w={'full'} rounded='xl' >

                            {item.image ?
                                <Box opacity={'.80'} w={{ base: 'full', lg: 'full' }} h={{ base: '220px', lg: '200px' }}  roundedTop='xl'
                                    overflow={'hidden'}
                                    // bgImage={image}
                                    objectFit='cover'
                                    bgPos='center' bgSize='cover'>
                                    <Link href={`/blog/${item.id}`}>
                                        <a href={`/blog/${item.id}`}>
                                            <Center h='full' w='full' >
                                                {/* <Show below={'lg'}> */}
                                                <Image title={item.title} w='full' minH={'full'} objectFit={'cover'} src={item.image} alt='image' />
                                                {/* </Show> */}
                                            </Center>
                                        </a>
                                    </Link>
                                </Box>
                                : <></>}

                            <Box px={1} py={2} textAlign={'left'} w='full' bg='.50' mb='2' >

                                <Link href={`/blog/${item.slug}`}>
                                    <a href={`/blog/${item.slug}`}>
                                        <Title order={3}><Text noOfLines={1} lineHeight='1.3' color='gray.700'>{item.title}</Text></Title>
                                    </a>
                                </Link>

                                <Text fontSize={'14px'} letterSpacing='-0.8px' color={'blackAlpha.600'} >
                                    {formatDate(item.createdAt)}
                                </Text>

                                <Box pt={2}>
                                    <Flex alignItems={'center'} gap={2}>
                                        <Avatar opacity={.7} size={'xs'} name={item.author.displayName} src={item.author.avatar} />
                                        <AuthorHoverCard author={item.author} />
                                    </Flex>

                                </Box>



                                {/* {item.categories?.length > 0 && <Box pt={2}>
                                    <Wrap>

                                        {item.categories.map((cat, index) => <Button
                                            key={index}
                                            size='xs'
                                            variant={'solid'}
                                        >

                                            {cat.name}

                                        </Button>)}

                                    </Wrap>
                                </Box>} */}

                            </Box>

                        </Box>

                    </SwiperSlide>
                ))}

                {/* <span slot="container-start">Container Start</span> */}
            </Swiper>
            <Box pt={3}>
                <Link href='/bloggers'>
                    <Flex cursor={'pointer'} color={'blue.700'}>
                        <Icon as={ArrowForward} fontSize='24px' />
                        <Text fontWeight='bold'>সকল জনপ্রিয় পোস্ট দেখুন</Text>
                    </Flex>
                </Link>
            </Box>
        </Box>
    );

}