import { Box, Container, Spacer } from '@chakra-ui/react'
import React from 'react'
import ImageBanner from './inc/ImageBanner'
import Navigation from './inc/Navigation'
import TopBar from './inc/TopBar'
// #303030
export default function HomeLayout({ children }) {
    return (
        <Box bg={'cyan.900'} minH='100vh'>
            <Box 
            // bgAttachment={'fixed'} 
            // bgRepeat='no-repeat' bgSize={'cover'}
            backgroundImage='https://www.freeiconspng.com/thumbs/rain-png/rain-png-transparent-9.png' >
                <Container maxW={'container.xl'} px={{ base: 0, md: 3 }} bg='whiteAlpha.800'>

                    <TopBar />

                    <Navigation />

                    <Box bg={{ base: 'white', md: 'whiteAlpha.700' }} roundedTop={{ base: 'none', md: '2xl' }} dropShadow={'2xl'} roundedBottom='md' overflow={'hidden'}>

                        <ImageBanner src='/banner.png' />

                        {children}

                    </Box>


                    <Box minH='70px'>


                    </Box>

                </Container>
            </Box>
        </Box>
    )
}
