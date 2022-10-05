import { Box, Container, Spacer } from '@chakra-ui/react'
import React from 'react'
import ImageBanner from './inc/ImageBanner'
import Navigation from './inc/Navigation'
import TopBar from './inc/TopBar'
// #303030
export default function HomeLayout({ children }) {
    return (
        <Box bg={'#303030'} minH='100vh'>
            <Container maxW={'container.xl'} px={{ base: 0, md: 3 }} bg='gray.200'>


                <TopBar />

                <Navigation />

                <Box roundedTop={{base: 'none', md: '2xl'}} roundedBottom='md' overflow={'hidden'}>

                    <ImageBanner src='/village.jpg' />

                    {children}
                    
                </Box>


                <Box minH='70px'>


                </Box>

            </Container>
        </Box>
    )
}
