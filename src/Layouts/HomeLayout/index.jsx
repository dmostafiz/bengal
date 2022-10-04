import { Box, Container, Spacer } from '@chakra-ui/react'
import React from 'react'
import HeaderBanner from './inc/HeaderBanner'
import Navigation from './inc/Navigation'
import TopBar from './inc/TopBar'
// #303030
export default function HomeLayout({ children }) {
    return (
        <Box bg={'#303030'} minH='100vh'>
            {/* <Container maxW={'container.xl'} px={0}> */}
                <Box w='full' shadow={'none'}>
                    <TopBar />
                    <Navigation />
                    <HeaderBanner />
                    {/* <Spacer h={1} /> */}

                    {children}

                </Box>
            {/* </Container> */}
        </Box>
    )
}
