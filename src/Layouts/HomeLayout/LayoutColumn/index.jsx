import { Box, Center, Divider, Flex, Text } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import React from 'react'
import SectionContainer from '../../../Components/Common/SectionContainer'

export default function LayoutColumn({ children, leftSide = '', rightSide = '', leftColumnWidth=28, rightColumnWidth=18 }) {


    const middleColumnWisdth = 100 - leftColumnWidth 
    const mainColumnWidth = 100 - rightColumnWidth

    return (
        <SectionContainer pl={leftSide ? 2 : 0 } pr={rightSide ? 2 : 0}>

            <Box w='full' minH='100vh' py={{ base: 0, md: 0 }}>

                <Flex direction={{ base: 'column', md: 'row' }} gap={0}>

                    <Flex
                        flex='1'
                        maxW={{ base: '100%', md: rightSide ? mainColumnWidth+'%' : '100%' }}
                        direction={{ base: 'column-reverse', md: 'row' }}
                        gap={0}
                    >

                        {leftSide && <Box
                            h='100vh'
                            w={{ base: '100%', md: leftColumnWidth+'%' }}
                            pr={{ base: 0, md: 2, lg: 2 }}
                            py={{ base: 3, md: 3 }}
                        >
                            {leftSide}
                        </Box>}

                        <Box
                            flex='1'
                            maxW={{ base: '100%', md: leftSide ? middleColumnWisdth+'%' : '100%' }}
                            px={{ base: 0, md: 2, lg: 3 }}
                            bg={{ base: 'white', md: 'whiteAlpha.800' }}
                            pt={{ base: 1, md: 3 }}
                        >

                            {children}

                        </Box>

                    </Flex>


                    {rightSide && <Box
                        w={{ base: '100%', md: rightColumnWidth+'%' }}
                        h='100vh'
                        bg=''
                        pl={{ base: 0, md: 2, lg: 2 }}
                        py={{ base: 3, md: 3 }}
                    >
                        {rightSide}
                    </Box>}

                </Flex>

            </Box>
        </SectionContainer>
    )
}
