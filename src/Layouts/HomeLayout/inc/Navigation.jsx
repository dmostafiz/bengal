import { Box, Flex, Text, Wrap } from '@chakra-ui/react'
import React from 'react'
import SectionContainer from '../../../Components/Common/SectionContainer'
import { Carousel } from '@mantine/carousel';
import Link from 'next/link';

export default function Navigation() {
    return (
        <SectionContainer>
            <Box py={2} color={'gray.900'} fontWeight='semibold'>
                <Carousel
                    // withIndicators
                    slideSize="auto"
                    slideGap="lg"
                    // dragFree={false}
                    loop={false}
                    align="start"
                    // withControls={false}
                    controlsOffset={0}
                    controlSize={24}
                    skipSnaps={true}
                    containScroll='trimSnaps'
                    styles={{
                        control: {
                            '&[data-inactive]': {
                                opacity: 0,
                                cursor: 'default',
                            },
                        }
                    }}
                >
                    <Carousel.Slide>
                        <Link href='#'>
                            <a href='#'>
                                <Box minWidth='max-content' borderBottom='1px' borderColor='gray.900'>
                                    নীড়পাতা
                                </Box>
                            </a>
                        </Link>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Link href='#'>
                            <a href='#'>
                                <Box borderColor='white'>
                                    কবিতা
                                </Box>
                            </a>
                        </Link>
                    </Carousel.Slide>
                    <Carousel.Slide><Box minWidth='max-content'>গল্প</Box></Carousel.Slide>
                    <Carousel.Slide><Box minWidth='max-content'>উপন্যাস</Box></Carousel.Slide>
                    <Carousel.Slide><Box minWidth='max-content'>সাহিত্য</Box></Carousel.Slide>
                    <Carousel.Slide><Box minWidth='max-content'>সমসাময়িক</Box></Carousel.Slide>
                    <Carousel.Slide><Box minWidth='max-content'>মুক্তিযুদ্ধ</Box></Carousel.Slide>
                    <Carousel.Slide><Box minWidth='max-content'>লেখাপড়া</Box></Carousel.Slide>
                    <Carousel.Slide>
                        <Link href='#'>
                            <a href='#'>
                                <Box minWidth='max-content' borderColor='white'>
                                    বিজ্ঞান ও প্রযুক্তি
                                </Box>
                            </a>
                        </Link>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <Link href='#'>
                            <a href='#'>
                                <Box minWidth='max-content' borderColor='white'>
                                    ইতিহাস
                                </Box>
                            </a>
                        </Link>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <Link href='#'>
                            <a href='#'>
                                <Box minWidth='max-content' borderColor='white'>
                                    রাজনীতি
                                </Box>
                            </a>
                        </Link>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <Link href='#'>
                            <a href='#'>
                                <Box minWidth='max-content' borderColor='white'>
                                    ভ্রমণ
                                </Box>
                            </a>
                        </Link>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <Link href='#'>
                            <a href='#'>
                                <Box minWidth='max-content' borderColor='white'>
                                    দেশ-বিদেশ
                                </Box>
                            </a>
                        </Link>
                    </Carousel.Slide>

                    {/* ...other slides */}
                </Carousel>
            </Box>
        </SectionContainer>
    )
}
