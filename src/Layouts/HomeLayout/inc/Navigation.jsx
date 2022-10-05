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
                                <Box width='max-content'>
                                    <Text whiteSpace={'nowrap'} color='blackAlpha.900'>নীড়পাতা</Text>
                                </Box>
                            </a>
                        </Link>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Link href='#'>
                            <a href='#'>
                                <Box borderColor='white'>
                                    <Text whiteSpace={'nowrap'} color='blackAlpha.600'>কবিতা</Text>
                                </Box>
                            </a>
                        </Link>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Box width='max-content'>
                            <Text whiteSpace={'nowrap'} color='blackAlpha.600'>গল্প</Text>
                        </Box>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Box width='max-content'>
                            <Text whiteSpace={'nowrap'} color='blackAlpha.600'>উপন্যাস</Text>
                        </Box>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Box width='max-content'>
                            <Text whiteSpace={'nowrap'} color='blackAlpha.600'>সাহিত্য</Text>
                        </Box>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Box width='max-content'>
                            <Text whiteSpace={'nowrap'} color='blackAlpha.600'>সমসাময়িক</Text>
                        </Box>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Box width='max-content'>
                            <Text whiteSpace={'nowrap'} color='blackAlpha.600'>মুক্তিযুদ্ধ</Text>
                        </Box>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Box width='max-content'>
                            <Text whiteSpace={'nowrap'} color='blackAlpha.600'>লেখাপড়া</Text>
                        </Box>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Link href='#'>
                            <a href='#'>
                                <Box width='max-content' borderColor='white'>
                                    <Text whiteSpace={'nowrap'} color='blackAlpha.600'>বিজ্ঞান ও প্রযুক্তি</Text>
                                </Box>
                            </a>
                        </Link>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <Link href='#'>
                            <a href='#'>
                                <Box width='max-content' borderColor='white'>
                                    <Text whiteSpace={'nowrap'} color='blackAlpha.600'>ইতিহাস</Text>
                                </Box>
                            </a>
                        </Link>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <Link href='#'>
                            <a href='#'>
                                <Box width='max-content' borderColor='white'>
                                    <Text whiteSpace={'nowrap'} color='blackAlpha.600'>রাজনীতি</Text>
                                </Box>
                            </a>
                        </Link>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <Link href='#'>
                            <a href='#'>
                                <Box width='max-content' borderColor='white'>
                                    <Text whiteSpace={'nowrap'} color='blackAlpha.600'>ভ্রমণ</Text>
                                </Box>
                            </a>
                        </Link>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <Link href='#'>
                            <a href='#'>
                                <Box width='max-content' borderColor='white'>
                                    <Text whiteSpace={'nowrap'} color='blackAlpha.600'>দেশ-বিদেশ</Text>
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
