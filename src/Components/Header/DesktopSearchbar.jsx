import { Box, Center, Collapse, Fade, Flex, Icon, Image, Input, SlideFade, Spinner, Text, useDisclosure, useOutsideClick } from '@chakra-ui/react'
import { Title, Tooltip } from '@mantine/core'
import React, { useEffect, useRef, useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { AlignJustified, AlignRight, List, Search, User, ZoomExclamation, ZoomOut } from 'tabler-icons-react'
import { useDebouncedState } from '@mantine/hooks'
import SpinnerText from '../Common/SpinnerText'
import IconText from '../Common/IconText'
import Axios from '../../Helpers/axiosHelper'
import PostTrancate from '../Common/PostTrancate'
import banglaNumber from '../../Helpers/banglaNumber'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function DesktopSearchbar() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const router = useRouter()

    const ref = useRef()


    useOutsideClick({
        ref: ref,
        handler: isOpen ? onClose : null,
    }, [isOpen])


    const [searchFor, setSearchFor] = useState('blog')
    const [query, setQuery] = useState('')
    const [value, setValue] = useDebouncedState('', 1000);

    const [searchData, setSearchData] = useState([])

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
        onClose()
    }, [router.asPath])




    useEffect(() => {


        var isMounted = true

        async function getSearchData(){
            setLoading(true)

            const response = await Axios.get(`/system/search/${searchFor}/${query}`)

            console.log('Search results ', response?.data)

            if (response?.data?.ok) {
                setSearchData(response?.data?.results)
            }

            setLoading(false)
        }

        if(isMounted && value){
            getSearchData()
        }


        return () => {
            isMounted = false
        }


    }, [value, searchFor])



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
                        placeholder={`${searchFor == 'blog' ? 'ব্লগ পোস্ট' : 'ব্লগার'} অনুসন্ধান করুন`}
                        transition={'ease'}
                        size='sm'
                    // py={}
                    />

                    <Flex px="4" alignItems={'center'} gap={2}>

                        <Icon
                            cursor={'pointer'}
                            onClick={() => setSearchFor('blogger')}
                            as={User}
                            fontSize={18}
                            color={searchFor == 'blogger' ? 'yellow.400' : 'blackAlpha.400'}
                        // _hover={{
                        //     color: 'blackAlpha.600'
                        // }}
                        />

                        <Icon
                            cursor={'pointer'}
                            onClick={() => setSearchFor('blog')}
                            as={AlignRight}
                            fontSize={20}
                            color={searchFor == 'blog' ? 'yellow.400' : 'blackAlpha.400'}
                            title='dfdfd'
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
                            <Title order={5}>{`${searchFor == 'blog' ? 'ব্লগ পোস্ট' : 'ব্লগার'} অনুসন্ধান`} - {query}</Title>
                            {/* <Text fontSize={'13px'}>৩ জন ব্লগার, ১৫ টি ব্লগ পোস্ট পাওয়া গেছে</Text> */}
                            {searchData.length > 0 && <Text mb={2} fontSize='13px'>মোট {banglaNumber(searchData.length)} টি রেজাল্ট পাওয়া গেছে</Text>}
                        </Box>

                        <Box px={4} py={3}>


                            {searchLoading ? <SpinnerText text={'অনুসন্ধান চলছে...'} />

                                : searchData.length ? <Box w={'full'} maxH='400px' overflowY={'auto'}>

                                    {searchFor == 'blog' && searchData.map((post, index) =>
                                        <Link href={`/blog/${post?.id}`} key={index}>
                                            <Flex cursor={'pointer'} _hover={{ bg: 'blackAlpha.50' }} p={2} border='1px' borderColor={'blackAlpha.200'} mb={2} alignItems={'center'} gap={2}>

                                                {post.image && <Box w='70px' h='50px'>
                                                    <Image h={'full'} w='full' objectFit={'cover'} src={post.image} />
                                                </Box>}
                                                <Box flex='1'>
                                                    <Title order={5}>{post.title}</Title>
                                                    <PostTrancate
                                                        lines={1}
                                                        content={post?.content ?? ''}
                                                    // slug={<>... <Link href={`/blog/${slug}`}>
                                                    //     <a href={`/blog/${slug}`}>বাকিটুকু পড়ুন</a>
                                                    // </Link></>
                                                    // }
                                                    />
                                                </Box>
                                            </Flex>
                                        </Link>
                                    )}

                                    {searchFor == 'blogger' && searchData.map((user, index) =>
                                        <Link href={`/blogger/${user?.id}`} key={index}>
                                            <Flex cursor={'pointer'} _hover={{ bg: 'blackAlpha.50' }} p={2} border='1px' borderColor={'blackAlpha.200'} mb={2} alignItems={'center'} gap={2}>

                                                {user.avatar && <Box w='60px'>
                                                    <Image src={user.avatar} />
                                                </Box>}
                                                <Box flex='1'>
                                                    <Title order={5}>{user.displayName}</Title>
                                                    <PostTrancate
                                                        lines={1}
                                                        content={user?.bio ?? ''}
                                                    // slug={<>... <Link href={`/blog/${slug}`}>
                                                    //     <a href={`/blog/${slug}`}>বাকিটুকু পড়ুন</a>
                                                    // </Link></>
                                                    // }
                                                    />
                                                </Box>
                                            </Flex>
                                        </Link>
                                    )}

                                </Box>

                                    : <IconText justify='center' icon={ZoomExclamation} text='কোনকিছু পাওয়া যায়নি' />}

                        </Box>


                    </Box>
                </SlideFade >
            </Box >

        </Box >
    )
}
