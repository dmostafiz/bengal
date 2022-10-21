import { Box, Flex, Link, Text, Wrap } from '@chakra-ui/react'
import React from 'react'
import SectionContainer from '../../../Components/Common/SectionContainer'
import { Carousel } from '@mantine/carousel';
import NextLink from 'next/link';

export default function Navigation() {
    return (
        <SectionContainer maxW='full'>
            <Box py={2} color={'gray.900'}>
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
                        <NextLink href='/'>
                            <Link href='/'>
                                <Box width='max-content'>
                                    <Text whiteSpace={'nowrap'} fontWeight='semibold' color='blackAlpha.900'>নীড়পাতা</Text>
                                </Box>
                            </Link>
                        </NextLink>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <NextLink href='/category/কবিতা'>
                            <Link href='/category/কবিতা'>
                                <Box borderColor='white'>
                                    <Text whiteSpace={'nowrap'} fontWeight='semibold' color='blackAlpha.600'>কবিতা</Text>
                                </Box>
                            </Link>
                        </NextLink>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <NextLink href='/category/গল্প'>
                            <Link href='/category/গল্প'>
                                <Box width='max-content'>
                                    <Text whiteSpace={'nowrap'} fontWeight='semibold' color='blackAlpha.600'>গল্প</Text>
                                </Box>
                            </Link>
                        </NextLink>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <NextLink href='/category/উপন্যাস'>
                            <Link href='/category/উপন্যাস'>
                                <Box width='max-content'>
                                    <Text whiteSpace={'nowrap'} fontWeight='semibold' color='blackAlpha.600'>উপন্যাস</Text>
                                </Box>
                            </Link>
                        </NextLink>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <NextLink href='/category/সাহিত্য'>
                            <Link href='/category/সাহিত্য'>
                                <Box width='max-content'>
                                    <Text whiteSpace={'nowrap'} fontWeight='semibold' color='blackAlpha.600'>সাহিত্য</Text>
                                </Box>
                            </Link>
                        </NextLink>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <NextLink href='/category/সমসাময়িক'>
                            <Link href='/category/সমসাময়িক'>
                                <Box width='max-content'>
                                    <Text whiteSpace={'nowrap'} fontWeight='semibold' color='blackAlpha.600'>সমসাময়িক</Text>
                                </Box>
                            </Link>
                        </NextLink>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <NextLink href='/category/মুক্তিযুদ্ধ'>
                            <Link href='/category/মুক্তিযুদ্ধ'>
                                <Box width='max-content'>
                                    <Text whiteSpace={'nowrap'} fontWeight='semibold' color='blackAlpha.600'>মুক্তিযুদ্ধ</Text>
                                </Box>
                            </Link>
                        </NextLink>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <NextLink href='/category/লেখাপড়া'>
                            <Link href='/category/লেখাপড়া'>
                                <Box width='max-content'>
                                    <Text whiteSpace={'nowrap'} fontWeight='semibold' color='blackAlpha.600'>লেখাপড়া</Text>
                                </Box>
                            </Link>
                        </NextLink>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <NextLink href='/category/বিজ্ঞান-প্রযুক্তি'>
                            <Link href='/category/বিজ্ঞান-প্রযুক্তি'>
                                <Box width='max-content' borderColor='white'>
                                    <Text whiteSpace={'nowrap'} fontWeight='semibold' color='blackAlpha.600'>বিজ্ঞান-প্রযুক্তি</Text>
                                </Box>
                            </Link>
                        </NextLink>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <NextLink href='/category/ইতিহাস'>
                            <Link href='/category/ইতিহাস'>
                                <Box width='max-content' borderColor='white'>
                                    <Text whiteSpace={'nowrap'} fontWeight='semibold' color='blackAlpha.600'>ইতিহাস</Text>
                                </Box>
                            </Link>
                        </NextLink>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <NextLink href='/category/বই রিভিউ'>
                            <Link href='/category/বই রিভিউ'>
                                <Box width='max-content' borderColor='white'>
                                    <Text whiteSpace={'nowrap'} fontWeight='semibold' color='blackAlpha.600'>বই রিভিউ</Text>
                                </Box>
                            </Link>
                        </NextLink>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <NextLink href='/category/চিন্তাধারা'>
                            <Link href='/category/চিন্তাধারা'>
                                <Box width='max-content' borderColor='white'>
                                    <Text whiteSpace={'nowrap'} fontWeight='semibold' color='blackAlpha.600'>চিন্তাধারা</Text>
                                </Box>
                            </Link>
                        </NextLink>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <NextLink href='/category/সংস্কৃতি'>
                            <Link href='/category/সংস্কৃতি'>
                                <Box width='max-content' borderColor='white'>
                                    <Text whiteSpace={'nowrap'} fontWeight='semibold' color='blackAlpha.600'>সংস্কৃতি</Text>
                                </Box>
                            </Link>
                        </NextLink>
                    </Carousel.Slide>


                    <Carousel.Slide>
                        <NextLink href='/category/ছবি ব্লগ'>
                            <Link href='/category/ছবি ব্লগ'>
                                <Box width='max-content' borderColor='white'>
                                    <Text whiteSpace={'nowrap'} fontWeight='semibold' color='blackAlpha.600'>ছবি ব্লগ</Text>
                                </Box>
                            </Link>
                        </NextLink>
                    </Carousel.Slide>



                    <Carousel.Slide>
                        <NextLink href='/category/রাজনীতি'>
                            <Link href='/category/রাজনীতি'>
                                <Box width='max-content' borderColor='white'>
                                    <Text whiteSpace={'nowrap'} fontWeight='semibold' color='blackAlpha.600'>রাজনীতি</Text>
                                </Box>
                            </Link>
                        </NextLink>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <NextLink href='/category/ভ্রমণ'>
                            <Link href='/category/ভ্রমণ'>
                                <Box width='max-content' borderColor='white'>
                                    <Text whiteSpace={'nowrap'} fontWeight='semibold' color='blackAlpha.600'>ভ্রমণ</Text>
                                </Box>
                            </Link>
                        </NextLink>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <NextLink href='/category/দেশ-বিদেশ'>
                            <Link href='/category/দেশ-বিদেশ'>
                                <Box width='max-content' borderColor='white'>
                                    <Text whiteSpace={'nowrap'} fontWeight='semibold' color='blackAlpha.600'>দেশ-বিদেশ</Text>
                                </Box>
                            </Link>
                        </NextLink>
                    </Carousel.Slide>

                    {/* ...other slides */}
                </Carousel>
            </Box>
        </SectionContainer>
    )
}
