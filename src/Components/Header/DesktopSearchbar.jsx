import { Box, Collapse, Fade, Input, SlideFade, Text, useDisclosure, useOutsideClick } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import React, { useEffect, useRef, useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function DesktopSearchbar() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const ref = useRef()


    useOutsideClick({
        ref: ref,
        handler: isOpen ? onClose : null,
    }, [isOpen])


    const [query, setQuery] = useState('')


    useEffect(() => {

        if (query) {
            onOpen()
        } else {
            onClose()
        }
    }, [query])



    return (
        <Box ref={ref} position={'relative'} w='full'>

            <Input
                // onFocus={onOpen}
                // onBlur={onClose}
                // position={'relative'}
                // top={-5}
                bg='blackAlpha.50'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                border='2px'
                borderColor='gray.300'
                w='full'
                _focus={{
                    ring: 'none',
                    borderColor: 'gray.300',
                    // roundedTop: '3xl',
                    // roundedBottom: isOpen ? 'none' : '3xl',
                }}
                roundedTop={isOpen ? 'xl' : '3xl'}
                roundedBottom={isOpen ? 'none' : '3xl'}
                placeholder='অনুসন্ধান করুন'
                transition={'ease'}
            />

            <SlideFade in={isOpen} offsetY='20px'>
                <Box
                    shadow={'sm'}
                    borderBottom='2px'
                    borderLeft='2px'
                    borderRight='2px'
                    borderColor='gray.300'
                    w='full'
                    position={'absolute'}
                    bg={'white'}
                    // px={3}
                    // py={2}
                    zIndex={99999999999}
                    // minH='0px'
                    roundedBottom={'xl'}
                    overflow='hidden'
                >

                    <Box px={4} py={1} >
                        <Title order={5}>অনুসন্ধান - {query}</Title>
                        {/* <Text fontSize={'13px'}>৩ জন ব্লগার, ১৫ টি ব্লগ পোস্ট পাওয়া গেছে</Text> */}
                    </Box>

                    <Box >

                    </Box>


                </Box>
            </SlideFade >


        </Box >
    )
}
