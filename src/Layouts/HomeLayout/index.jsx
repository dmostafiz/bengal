import { Box, Container, Spacer } from '@chakra-ui/react'
import React from 'react'
import ImageBanner from './inc/ImageBanner'
import Navigation from './inc/Navigation'
import TopBar from './inc/TopBar'
// #303030
export default function HomeLayout({ children }) {
    return (
        <Box bg={'#303030'} minH='100vh'>
            <Container maxW={'container.xl'} px={{base:0, md:3}} bg='#e8e8e8'>
                <Box w='full' shadow={'none'}>
                    <TopBar />
                    <Navigation />
                    <ImageBanner src='/village.jpg'/>
                    {/* <Spacer h={1} /> */}

                    {children}

                </Box>
            </Container>
        </Box>
    )
}
