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
                    slideSize="px"
                    slideGap="md"
                    // dragFree={false}
                    loop={false}
                    align="start"
                    withControls={false}
                    controlsOffset={0}
                    controlSize={24}
                    // skipSnaps={true}
                    containScroll='trimSnaps'
                    styles={{
                        control: {
                            '&[data-inactive]': {
                                opacity: 0,
                                cursor: 'default',
                                display: 'none'
                            },
                        }
                    }}
                >
                    <Carousel.Slide>
                        <Link href='#'>
                            <a href='#'>
                                <Box width='max-content' borderBottom='1px' borderColor='gray.900'>
                                    <Text whiteSpace={'nowrap'}>নীড়পাতা</Text>
                                </Box>
                            </a>
                        </Link>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Link href='#'>
                            <a href='#'>
                                <Box borderColor='white'>
                                    <Text whiteSpace={'nowrap'}>কবিতা</Text>
                                </Box>
                            </a>
                        </Link>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Box width='max-content'>
                            <Text whiteSpace={'nowrap'}>গল্প</Text>
                        </Box>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Box width='max-content'>
                            <Text whiteSpace={'nowrap'}>উপন্যাস</Text>
                        </Box>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Box width='max-content'>
                            <Text whiteSpace={'nowrap'}>সাহিত্য</Text>
                        </Box>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Box width='max-content'>
                            <Text whiteSpace={'nowrap'}>সমসাময়িক</Text>
                        </Box>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Box width='max-content'>
                            <Text whiteSpace={'nowrap'}>মুক্তিযুদ্ধ</Text>
                        </Box>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Box width='max-content'>
                            <Text whiteSpace={'nowrap'}>লেখাপড়া</Text>
                        </Box>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Link href='#'>
                            <a href='#'>
                                <Box width='max-content' borderColor='white'>
                                    <Text whiteSpace={'nowrap'}>বিজ্ঞান ও প্রযুক্তি</Text>
                                </Box>
                            </a>
                        </Link>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <Link href='#'>
                            <a href='#'>
                                <Box width='max-content' borderColor='white'>
                                    <Text whiteSpace={'nowrap'}>ইতিহাস</Text>
                                </Box>
                            </a>
                        </Link>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <Link href='#'>
                            <a href='#'>
                                <Box width='max-content' borderColor='white'>
                                    <Text whiteSpace={'nowrap'}>রাজনীতি</Text>
                                </Box>
                            </a>
                        </Link>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <Link href='#'>
                            <a href='#'>
                                <Box width='max-content' borderColor='white'>
                                    <Text whiteSpace={'nowrap'}>ভ্রমণ</Text>
                                </Box>
                            </a>
                        </Link>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <Link href='#'>
                            <a href='#'>
                                <Box width='max-content' borderColor='white'>
                                    <Text whiteSpace={'nowrap'}>দেশ-বিদেশ</Text>
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
