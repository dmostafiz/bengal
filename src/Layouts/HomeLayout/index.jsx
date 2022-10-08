import { Box, Container, Spacer } from '@chakra-ui/react'
import React from 'react'
import ImageBanner from './inc/ImageBanner'
import Navigation from './inc/Navigation'
import TopBar from './inc/TopBar'
// #303030
export default function HomeLayout({ children }) {
    return (
        <Box bg={'blue.900'} minH='100vh'>
            <Box
                bgAttachment={'fixed'}
                // bgRepeat='no-repeat' 
                bgSize={'800px'}
                backgroundImage='/bg.png'
            >
                <Box bgColor={'.700'} opacity=''>
                    <Container
                        maxW={'container.xl'}
                        px={{ base: 0, md: '10px' }}
                        bg='whiteAlpha.800'
                        backdropFilter='auto'
                        backdropBlur='2px'
                    >

                        <TopBar />

                        <Navigation />

                        <Box bg={{ base: 'white', md: 'whiteAlpha.900' }} roundedTop={{ base: 'none', md: '2xl' }} roundedBottom='md' overflow={'hidden'}>

                            <ImageBanner src='/banner.jpg' />

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
