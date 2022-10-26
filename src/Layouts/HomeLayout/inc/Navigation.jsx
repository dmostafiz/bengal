import { Box, Flex, Link, Text, Wrap } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import SectionContainer from '../../../Components/Common/SectionContainer'
import { Carousel } from '@mantine/carousel';
import NextLink from 'next/link';
// import useCategory from '../../../Hooks/categories';
import categories from '../../../Hooks/categories';

export default function Navigation() {

    // const { categories } = useCategory()
    // const { data } = getAllCategory()

    // console.log('Navigation categories array', categories())

    return (
        <SectionContainer maxW='full'>
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
                    <Carousel.Slide>
                        <NextLink href='/'>
                            <Link href='/'>
                                <Box width='max-content'>
                                    <Text whiteSpace={'nowrap'} fontWeight='semibold' color='blackAlpha.900'>নীড়পাতা</Text>
                                </Box>
                            </Link>
                        </NextLink>
                    </Carousel.Slide>

                    {categories()?.map((cat, index) => {
                        return <Carousel.Slide key={index}>
                            <NextLink href={`/category/${cat.name}`}>
                                <Link href={`/category/${cat.name}`}>
                                    <Box width='max-content'>
                                        <Text whiteSpace={'nowrap'} fontWeight='semibold' color='blackAlpha.900'>{cat.name}</Text>
                                    </Box>
                                </Link>
                            </NextLink>
                        </Carousel.Slide>
                    })}

                </Carousel>
            </Box>
        </SectionContainer>
    )
}
