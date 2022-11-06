import { Box, Button, Flex, Text, Wrap } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import SectionContainer from '../../../Components/Common/SectionContainer'
import { Carousel } from '@mantine/carousel';
import NextLink from 'next/link';
// import useCategory from '../../../Hooks/categories';
import categories from '../../../Hooks/categories';
import Link from 'next/link';

export default function Navigation() {

    // const { categories } = useCategory()
    // const { data } = getAllCategory()

    // console.log('Navigation categories array', categories())

    return (
        <SectionContainer maxW='full' px={{ base: 2, lg: 0 }}>
            <Box zIndex={999999999} py={2} color={'gray.900'}>
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
                    <Carousel.Slide gap={16}>
                        <Link href='/'>
                            <Button
                                size={'sm'}
                                rounded={'full'}
                                variant='unstyled'
                            >
                                ব্লগ প্রচ্ছদ
                            </Button>

                        </Link>
                    </Carousel.Slide>

                    {categories()?.map((cat, index) => {
                        return <Carousel.Slide key={index} gap={16}>

                            <Link href={`/category/${cat.name}`}>
                                <Button
                                    size={'sm'}
                                    rounded={'full'}
                                    variant='unstyled'
                                >
                                    {cat.name}
                                </Button>
                                {/* <Box width='max-content'>
                                        <Text whiteSpace={'nowrap'} fontWeight='semibold' color='blackAlpha.900'>{cat.name}</Text>
                                    </Box> */}
                            </Link>

                        </Carousel.Slide>
                    })}

                </Carousel>
            </Box>
        </SectionContainer>
    )
}
