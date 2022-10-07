import { Box, Container, Spacer } from '@chakra-ui/react'
import React from 'react'
import ImageBanner from './inc/ImageBanner'
import Navigation from './inc/Navigation'
import TopBar from './inc/TopBar'
// #303030
export default function HomeLayout({ children }) {
    return (
        <Box bg={'whatsapp.500'} minH='100vh'>
            <Box
                bgAttachment={'fixed'}
                // bgRepeat='no-repeat' 
                bgSize={'550px'}
                backgroundImage='/bg.png'
            >
                <Box bgColor={'.700'} opacity=''>
                    <Container maxW={'container.xl'} px={{ base: 0, md: 3 }} bg='whiteAlpha.800'>

                        <TopBar />

                        <Navigation />

                        <Box bg={{ base: 'white', md: 'whiteAlpha.700' }} roundedTop={{ base: 'none', md: '2xl' }} roundedBottom='md' overflow={'hidden'}>

                            <ImageBanner src='/banner.png' />

                            {children}

                        </Box>


                        <Box minH='10px'>

                        </Box>

                    </Container>
                </Box>
            </Box>
        </Box>
    )
}
