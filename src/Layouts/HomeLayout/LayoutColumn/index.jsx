import { Box, Flex, Show, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import AlertNotice from '../../../Components/Common/AlertNotice'
import SectionContainer from '../../../Components/Common/SectionContainer'
import { getFlashMessage } from '../../../Helpers/cookieHelper'

export default function LayoutColumn({ children, pageTopSection = '', leftSide = '', rightSide = '', leftColumnWidth = 30, rightColumnWidth = 20 }) {

    const middleColumnWisdth = 100 - leftColumnWidth
    const mainColumnWidth = 100 - rightColumnWidth

    const router = useRouter()

    const toast = useToast()

    useEffect(() => {
        const flashMsg = getFlashMessage()
        if (flashMsg) {
            toast({
                title: flashMsg.title ? flashMsg.title : '',
                description: flashMsg.msg ? flashMsg.msg : '',
                status: flashMsg.type,
                position: 'top-right',
                duration: 9000,
                isClosable: true,
            })
        }
    }, [router])

    return (
        <SectionContainer px={2}>
            <Box w='full' py={{ base: 0, md: 0 }}>

                {pageTopSection}

                <Flex direction={{ base: 'column', lg: 'row' }} gap={0}>

                    <Flex
                        flex='1'
                        maxW={{ base: '100%', lg: rightSide ? mainColumnWidth + '%' : '100%' }}
                        direction={{ base: 'column-reverse', md: 'row' }}
                        gap={0}
                    >

                        {leftSide && <Box
                            minH={{ base: '0px', lg: '100vh' }}
                            w={{ base: '100%', md: leftColumnWidth + '%' }}
                            pr={{ base: 0, md: 2, lg: 3 }}
                            py={{ base: 3, md: 3 }}
                        >
                            {leftSide}

                            <Show below='lg'>
                                {rightSide}
                            </Show>
                        </Box>}


                        <Box
                            flex='1'
                            minH={'100vh'}
                            maxW={{ base: '100%', md: leftSide ? middleColumnWisdth + '%' : '100%' }}
                            bg={{ base: 'white', md: 'white' }}
                            borderLeft={leftSide ? { base: 'none', md: '1px' } : 'none'}
                            borderRight={rightSide ? { base: 'none', md: '1px' } : 'none'}
                            borderColor={{ base: 'none', md: 'blackAlpha.100' }}
                        >
                            <AlertNotice />


                            <Box
                                px={{ base: 0, md: 4, lg: 4 }}
                                pr={{ base: 0, md: 10, lg: 4 }}
                                pt={{ base: 1, lg: 3 }}
                            >

                                {children}
                            </Box>

                        </Box>

                    </Flex>


                    {rightSide && <Box
                        w={{ base: '100%', lg: rightColumnWidth + '%' }}
                        minH={{ base: '0px', lg: '100vh' }}
                        bg=''
                        pl={{ base: 0, md: 2, lg: 2 }}
                        py={{ base: 3, md: 3 }}
                    >
                        <Show above='lg'>
                            {rightSide}
                        </Show>
                    </Box>}

                </Flex>

            </Box>
        </SectionContainer>
    )
}
