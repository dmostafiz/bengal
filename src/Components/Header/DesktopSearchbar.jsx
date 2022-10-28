import { Box, Center, Collapse, Fade, Flex, Icon, Input, SlideFade, Spinner, Text, useDisclosure, useOutsideClick } from '@chakra-ui/react'
import { Title, Tooltip } from '@mantine/core'
import React, { useEffect, useRef, useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { AlignJustified, AlignRight, List, Search, User, ZoomExclamation, ZoomOut } from 'tabler-icons-react'
import { useDebouncedState } from '@mantine/hooks'
import SpinnerText from '../Common/SpinnerText'
import IconText from '../Common/IconText'

export default function DesktopSearchbar() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const ref = useRef()


    useOutsideClick({
        ref: ref,
        handler: isOpen ? onClose : null,
    }, [isOpen])


    const [seachFor, setSearchFor] = useState('blog')
    const [query, setQuery] = useState('')
    const [value, setValue] = useDebouncedState('', 500);

    const [searchLoading, setLoading] = useState(true)

    const handleSearch = (val) => {
        setQuery(val)
        setValue(val)
    }


    useEffect(() => {
        if (query) {
            onOpen()
        } else {
            onClose()
        }
    }, [query])




    useEffect(() => {

        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 2000)



    }, [value, seachFor])



    return (
        <Box ref={ref} position={'relative'} w='full'>

            <Box
                border='1px'
                borderColor='gray.300'
                roundedTop={isOpen ? 'xl' : '3xl'}
                roundedBottom={isOpen ? 'none' : '3xl'}
                py={'2px'}
                // bg='blackAlpha.50'
            >
                <Flex alignItems={'center'}>
                    <Box pl={2} pt={1}>
                        <Icon
                            as={Search}
                            color='blackAlpha.400'
                            fontSize={'20px'}
                        />
                    </Box>
                    <Input
                        // onFocus={onOpen}
                        // onBlur={onClose}
                        // position={'relative'}
                        // top={-5}
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                        border='0px'
                        borderColor='gray.300'
                        w='full'
                        _focus={{
                            ring: 'none',
                            borderColor: 'gray.300',
                            // roundedTop: '3xl',
                            // roundedBottom: isOpen ? 'none' : '3xl',
                        }}
                        placeholder={`${seachFor == 'blog' ? 'ব্লগ পোস্ট' : 'ব্লগার'} অনুসন্ধান করুন`}
                        transition={'ease'}
                        size='sm'
                        // py={}
                    />

                    <Flex px="4" alignItems={'center'} gap={2}>

                        <Icon
                            cursor={'pointer'}
                            onClick={() => setSearchFor('blog')}
                            as={AlignRight}
                            fontSize={20}
                            color={seachFor == 'blog' ? 'yellow.400' : 'blackAlpha.400'}
                            title='dfdfd'
                        // _hover={{
                        //     color: 'blackAlpha.600'
                        // }}
                        />


                        <Icon
                            cursor={'pointer'}
                            onClick={() => setSearchFor('blogger')}
                            as={User}
                            fontSize={18}
                            color={seachFor == 'blogger' ? 'yellow.400' : 'blackAlpha.400'}
                        // _hover={{
                        //     color: 'blackAlpha.600'
                        // }}
                        />

                    </Flex>

                </Flex>
            </Box>

            <Box hidden={!isOpen}>
                <SlideFade in={isOpen} offsetY='-50px'>
                    <Box
                        shadow={'sm'}
                        borderBottom='2px'
                        borderLeft='1px'
                        borderRight='1px'
                        borderColor='gray.300'
                        w='full'
                        position={'absolute'}
                        bg={'white'}
                        // px={3}
                        // py={2}

                        // minH='0px'
                        roundedBottom={'xl'}
                        overflow='hidden'
                    >

                        <Box px={4} py={2} borderBottom='1px' borderColor={'blackAlpha.200'}>
                            <Title order={5}>{`${seachFor == 'blog' ? 'ব্লগ পোস্ট' : 'ব্লগার'} অনুসন্ধান`} - {query}</Title>
                            {/* <Text fontSize={'13px'}>৩ জন ব্লগার, ১৫ টি ব্লগ পোস্ট পাওয়া গেছে</Text> */}
                        </Box>

                        <Box px={4} py={8}>

                            {searchLoading ? <SpinnerText text={'অনুসন্ধান চলছে...'} /> 
                            : <IconText justify='center' icon={ZoomExclamation} text='কোনকিছু পাওয়া যায়নি' /> }

                        </Box>


                    </Box>
                </SlideFade >
            </Box >

        </Box >
    )
}
