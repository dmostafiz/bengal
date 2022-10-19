import { Box, Center, Divider, Flex, Text } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import React from 'react'
import SectionContainer from '../../../Components/Common/SectionContainer'

export default function LayoutColumn({ children, leftSide = '', rightSide = '', leftColumnWidth=32, rightColumnWidth=18 }) {


    const middleColumnWisdth = 100 - leftColumnWidth 
    const mainColumnWidth = 100 - rightColumnWidth

    return (
        <SectionContainer >
            <Box w='full' py={{ base: 0, md: 0 }}>

                <Flex direction={{ base: 'column', md: 'row' }} gap={0}>

                    <Flex
                        flex='1'
                        maxW={{ base: '100%', md: rightSide ? mainColumnWidth+'%' : '100%' }}
                        direction={{ base: 'column-reverse', md: 'row' }}
                        gap={0}
                    >

                        {leftSide && <Box
                            minH={{base: '0px', md:'100vh'}}
                            w={{ base: '100%', md: leftColumnWidth+'%' }}
                            pr={{ base: 0, md: 2, lg: 3 }}
                            py={{ base: 3, md: 3 }}
                        >
                            {leftSide}
                        </Box>}

                        <Box
                            flex='1'
                            minH={'100vh'}
                            maxW={{ base: '100%', md: leftSide ? middleColumnWisdth+'%' : '100%' }}
                            px={{ base: 0, md: 2, lg: 4 }}
                            bg={{ base: 'white', md: 'white' }}
                            pt={{ base: 1, md: 3 }}
                            borderLeft={ leftSide ? {base: 'none', md:'1px'} : 'none'}
                            borderRight={ rightSide ? {base: 'none', md:'1px'} : 'none'}
                            borderColor={{base: 'none', md:'blackAlpha.100'}}
                        >

                            {children}

                        </Box>

                    </Flex>


                    {rightSide && <Box
                        w={{ base: '100%', md: rightColumnWidth+'%' }}
                        minH={{base: '0px', md:'100vh'}}
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
