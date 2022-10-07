import { Box, Flex, Link, Text, Wrap } from '@chakra-ui/react'
import React from 'react'
import SectionContainer from '../../../Components/Common/SectionContainer'
import { Carousel } from '@mantine/carousel';
import NextLink from 'next/link';

export default function Navigation() {
    return (
        <SectionContainer>
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
                        <NextLink href='#'>
                            <Link href='#'>
                                <Box borderColor='white'>
                                    <Text whiteSpace={'nowrap'} color='blackAlpha.900'>কবিতা</Text>
                                </Box>
                            </Link>
                        </NextLink>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Box width='max-content'>
                            <Text whiteSpace={'nowrap'} color='blackAlpha.900'>গল্প</Text>
                        </Box>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Box width='max-content'>
                            <Text whiteSpace={'nowrap'} color='blackAlpha.900'>উপন্যাস</Text>
                        </Box>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Box width='max-content'>
                            <Text whiteSpace={'nowrap'} color='blackAlpha.900'>সাহিত্য</Text>
                        </Box>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Box width='max-content'>
                            <Text whiteSpace={'nowrap'} color='blackAlpha.900'>সমসাময়িক</Text>
                        </Box>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Box width='max-content'>
                            <Text whiteSpace={'nowrap'} color='blackAlpha.900'>মুক্তিযুদ্ধ</Text>
                        </Box>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Box width='max-content'>
                            <Text whiteSpace={'nowrap'} color='blackAlpha.900'>লেখাপড়া</Text>
                        </Box>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <NextLink href='#'>
                            <Link href='#'>
                                <Box width='max-content' borderColor='white'>
                                    <Text whiteSpace={'nowrap'} color='blackAlpha.900'>বিজ্ঞান-প্রযুক্তি</Text>
                                </Box>
                            </Link>
                        </NextLink>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <NextLink href='#'>
                            <Link href='#'>
                                <Box width='max-content' borderColor='white'>
                                    <Text whiteSpace={'nowrap'} color='blackAlpha.900'>ইতিহাস</Text>
                                </Box>
                            </Link>
                        </NextLink>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <NextLink href='#'>
                            <Link href='#'>
                                <Box width='max-content' borderColor='white'>
                                    <Text whiteSpace={'nowrap'} color='blackAlpha.900'>বই রিভিউ</Text>
                                </Box>
                            </Link>
                        </NextLink>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <NextLink href='#'>
                            <Link href='#'>
                                <Box width='max-content' borderColor='white'>
                                    <Text whiteSpace={'nowrap'} color='blackAlpha.900'>চিন্তাধারা</Text>
                                </Box>
                            </Link>
                        </NextLink>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <NextLink href='#'>
                            <Link href='#'>
                                <Box width='max-content' borderColor='white'>
                                    <Text whiteSpace={'nowrap'} color='blackAlpha.900'>সংস্কৃতি</Text>
                                </Box>
                            </Link>
                        </NextLink>
                    </Carousel.Slide>


                    <Carousel.Slide>
                        <NextLink href='#'>
                            <Link href='#'>
                                <Box width='max-content' borderColor='white'>
                                    <Text whiteSpace={'nowrap'} color='blackAlpha.900'>ছবি ব্লগ</Text>
                                </Box>
                            </Link>
                        </NextLink>
                    </Carousel.Slide>



                    <Carousel.Slide>
                        <NextLink href='#'>
                            <Link href='#'>
                                <Box width='max-content' borderColor='white'>
                                    <Text whiteSpace={'nowrap'} color='blackAlpha.900'>রাজনীতি</Text>
                                </Box>
                            </Link>
                        </NextLink>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <NextLink href='#'>
                            <Link href='#'>
                                <Box width='max-content' borderColor='white'>
                                    <Text whiteSpace={'nowrap'} color='blackAlpha.900'>ভ্রমণ</Text>
                                </Box>
                            </Link>
                        </NextLink>
                    </Carousel.Slide>

                    <Carousel.Slide>
                        <NextLink href='#'>
                            <Link href='#'>
                                <Box width='max-content' borderColor='white'>
                                    <Text whiteSpace={'nowrap'} color='blackAlpha.900'>দেশ-বিদেশ</Text>
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
