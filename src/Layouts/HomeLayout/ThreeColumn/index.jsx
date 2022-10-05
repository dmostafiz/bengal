import { Box, Center, Divider, Flex, Text } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import React from 'react'
import SectionContainer from '../../../Components/Common/SectionContainer'

export default function ThreeColumn({ children, leftSide = '', rightSide = '' }) {
    return (
        <SectionContainer bg={{ base: 'white', md: 'white' }}>

            <Box w='full' minH='100vh' bg='white' py={{ base: 1, md: 2 }}>

                <Flex direction={{ base: 'column', md: 'row' }} gap={0}>

                    <Flex
                        flex='1'
                        maxW={{ base: '100%', md: '80%' }}
                        direction={{ base: 'column-reverse', md: 'row' }}
                        gap={0}
                    >

                        <Box
                            h='100vh' 
                            w={{ base: '100%', md: '30%' }}
                            pr={{ base: 0, md: 2, lg: 2 }}>
                            {leftSide}
                        </Box>

                        <Box
                            flex='1'
                            maxW={{ base: '100%', md: '70%' }}
                            px={{ base: 0, md: 2, lg: 2 }}
                            borderX={{ base: '0px', md: '1px', lg: '2px' }}
                            borderColor={{ base: 'none', md: '#f0f0f0', lg: '#f0f0f0' }}
                            bg={'#f9f9f9'}
                        >

                            {children}

                        </Box>

                    </Flex>


                    <Box
                        w={{ base: '100%', md: '20%' }}
                        h='100vh'
                        bg=''
                        pl={{ base: 0, md: 2, lg: 2 }}
                    >
                        {rightSide}
                    </Box>

                </Flex>

            </Box>
        </SectionContainer>
    )
}
