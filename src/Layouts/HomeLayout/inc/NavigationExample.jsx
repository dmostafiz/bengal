import { Box, Flex, Text, Wrap } from '@chakra-ui/react'
import React from 'react'
import SectionContainer from '../../../Components/Common/SectionContainer'
import { Carousel } from '@mantine/carousel';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css/pagination';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import Navigation from './Navigation';
import { Scrollbar } from 'swiper';

export default function NavigationExample() {
    return (
        <SectionContainer>
            <Flex gap={3} overflowX='auto'>
                <Box>
                    <Link href='#'>
                        <a href='#'>
                            <Box borderBottom='1px' borderColor='gray.900'>
                                নীড়পাতা
                            </Box>
                        </a>
                    </Link>
                </Box>
                <Box>
                    <Link href='#'>
                        <a href='#'>
                            <Box borderColor='white'>
                                কবিতা
                            </Box>
                        </a>
                    </Link>
                </Box>
                <Box>
                    <Box>
                        <Text as='p'>গল্প</Text>
                    </Box>
                </Box>
                <Box><Box>উপন্যাস</Box></Box>
                <Box><Box>সাহিত্য</Box></Box>
                <Box><Box>সমসাময়িক</Box></Box>
                <Box><Box>মুক্তিযুদ্ধ</Box></Box>
                <Box><Box>লেখাপড়া</Box></Box>
                <Box>
                    <Link href='#'>
                        <a href='#'>
                            <Box borderColor='white'>
                                <Text whiteSpace={'nowrap'} as='p'>বিজ্ঞান ও প্রযুক্তি</Text>
                            </Box>
                        </a>
                    </Link>
                </Box>

                <Box>
                    <Link href='#'>
                        <a href='#'>
                            <Box borderColor='white'>
                                <Text whiteSpace={'nowrap'} as='p'>ইতিহাস</Text>
                            </Box>
                        </a>
                    </Link>
                </Box>

                <Box>
                    <Link href='#'>
                        <a href='#'>
                            <Box borderColor='white'>
                                <Text whiteSpace={'nowrap'} as='p'>রাজনীতি</Text>
                            </Box>
                        </a>
                    </Link>
                </Box>

                <Box>
                    <Link href='#'>
                        <a href='#'>
                            <Box borderColor='white'>
                                <Text whiteSpace={'nowrap'} as='p'>ভ্রমণ</Text>
                            </Box>
                        </a>
                    </Link>
                </Box>

                <Box>
                    <Link href='#'>
                        <a href='#'>
                            <Box borderColor='white'>
                                <Text whiteSpace={'nowrap'} as='p'>দেশ-বিদেশ</Text>
                            </Box>
                        </a>
                    </Link>
                </Box>

                {/* ...other slides */}
            </Flex>
            {/* </Box> */}
        </SectionContainer>
    )
}
