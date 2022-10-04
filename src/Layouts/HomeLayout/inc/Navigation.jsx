import { Box, Flex, Text, Wrap } from '@chakra-ui/react'
import React from 'react'
import SectionContainer from '../../../Components/Common/SectionContainer'
import { Carousel } from '@mantine/carousel';
import Link from 'next/link';

export default function Navigation() {
    return (
        <SectionContainer>
            <Box py={1} color={'white'}>
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
                                <Box borderBottom='1px' borderColor='white'>
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
                    <Carousel.Slide><div>গল্প</div></Carousel.Slide>
                    <Carousel.Slide><div>উপন্যাস</div></Carousel.Slide>
                    <Carousel.Slide><div>সাহিত্য</div></Carousel.Slide>
                    <Carousel.Slide><div>সমসাময়িক</div></Carousel.Slide>
                    <Carousel.Slide><div>মুক্তিযুদ্ধ</div></Carousel.Slide>
                    <Carousel.Slide><div>লেখাপড়া</div></Carousel.Slide>
                    <Carousel.Slide>
                        <Link href='#'>
                            <a href='#'>
                                <Box borderColor='white'>
                                    বিজ্ঞান ও প্রযুক্তি
                                </Box>
                            </a>
                        </Link>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <Link href='#'>
                            <a href='#'>
                                <Box borderColor='white'>
                                    ইতিহাস
                                </Box>
                            </a>
                        </Link>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <Link href='#'>
                            <a href='#'>
                                <Box borderColor='white'>
                                    রাজনীতি
                                </Box>
                            </a>
                        </Link>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <Link href='#'>
                            <a href='#'>
                                <Box borderColor='white'>
                                    ভ্রমণ
                                </Box>
                            </a>
                        </Link>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <Link href='#'>
                            <a href='#'>
                                <Box borderColor='white'>
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
