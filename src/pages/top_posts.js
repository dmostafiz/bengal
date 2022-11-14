import { Avatar, AvatarBadge, Box, Button, Center, Divider, Flex, Image, Show, SimpleGrid, Spacer, Text, Tooltip, VStack, Wrap } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import { ThumbUp } from 'tabler-icons-react'
import PostCard from '../Components/Common/PostCard'
import SectionContainer from '../Components/Common/SectionContainer'
import TabContainer from '../Components/HomePage/TabContainer'
import MainLeftSidebar from '../Layouts/Common/MainLeftSidebar'
import MainRightSidebar from '../Layouts/Common/MainRightSidebar'
import SelectedPostsCarousel from '../Components/HomePage/SelectedPostsCarousel'
import HomeLayout from '../Layouts/HomeLayout'
import ImageBanner from '../Layouts/HomeLayout/inc/ImageBanner'
import LayoutColumn from '../Layouts/HomeLayout/LayoutColumn'
import TopBloggers from '../Components/HomePage/TopBloggers'
import StepPostsCarousel from '../Components/HomePage/StepPostsCarousel'
import { useEffect, useState } from 'react'
import req from '../Helpers/axiosHelper'
import BlogPanel from '../Components/Common/BlogPanel'
import LatestBlogPost from '../Components/HomePage/LatestBlogPost'
import SectionTitle from '../Components/Common/SectionTitle'
import TopPostsCarousel from '../Components/HomePage/TopPostsCarousel'
import { useQuery } from '@tanstack/react-query'
import Axios from '../Helpers/axiosHelper'
import banglaNumber from '../Helpers/banglaNumber'
import Link from 'next/link'
import useOnlineUser from '../Hooks/useOnlineUser'
import SliderPostCarkSkeleton from '../Components/Common/Skeletons/SliderPostCarkSkeleton'
import truncate from 'truncate-html'
import formatDate from '../Helpers/formatDate'
import AuthorHoverCard from '../Components/Common/AuthorHoverCard'

export default function top_posts() {

    const [bloggers, setBloggers] = useState([])

    const { data, isLoading, isError, error } = useQuery(['topPostsAll'], async () => {
        const response = await Axios.get('/post/get_top_posts/30')
        return response?.data?.posts || []
    })


    const { isUserOnline } = useOnlineUser()

    return (
        <HomeLayout>

            <LayoutColumn

                leftSide={<MainLeftSidebar />}

                rightSide={<MainRightSidebar />}

                pageTopSection={<></>}

            >

                <Box mb={8}>

                    <SectionTitle mb={5} title='জনপ্রিয় পোষ্ট (ক্রমানুসারে)' />

                    <SimpleGrid columns={{ base: 2, xl: 3 }} spacing={5}>

                        {!isLoading && data.length ? data?.map((item, index) => (

                            <Box zIndex={0} shadow='md' borderColor={'blackAlpha.200'} p={0} w={'full'} rounded='xl'>

                                {item.image ?
                                    <Box
                                        w={{ base: 'full', lg: 'full' }}
                                        h={{ base: '140px', lg: '140px' }}
                                        roundedTop='xl'
                                        roundedBottom=''
                                        overflow={'hidden'}
                                        bgPos='center' bgSize='cover'
                                    >
                                        <Link zIndex='0' href={`/blog/${item.id}`}>
                                            <a href={`/blog/${item.id}`}>
                                                <Center zIndex={0} h='full' w='full' >
                                                    {/* <Show below={'lg'}> */}
                                                    <Image zIndex={0} title={item.title} w='full' minH={'full'} objectFit={'cover'} src={item.image} alt='image' />
                                                    {/* </Show> */}
                                                </Center>
                                            </a>
                                        </Link>
                                    </Box>
                                    : <Box roundedTop='xl' roundedBottom='' h={{ base: '140px', lg: '140px' }} overflow='hidden' fontSize={'15px'} p={3} bgGradient='linear(to-r, facebook.700, blue.600)' color={'whiteAlpha.700'}>
                                        {truncate(item.content, 120, {
                                            stripTags: true,
                                        })}
                                    </Box>}

                                <Box px={1} py={2} textAlign={'left'} w='full' bg='.50' mb='2' >

                                    <Link href={`/blog/${item.id}`}>
                                        <a href={`/blog/${item.id}`}>
                                            <Tooltip hasArrow label={item.title}>
                                                <Title order={4}><Text noOfLines={1} lineHeight='1.3' color='gray.700'>{item.title}</Text></Title>
                                            </Tooltip>
                                        </a>
                                    </Link>

                                    <Text fontSize={'12px'} letterSpacing='-0.8px' color={'blackAlpha.600'} >
                                        {formatDate(item.publishedAt)}
                                    </Text>

                                    <Box pt={2}>
                                        <Flex alignItems={'center'} gap={2}>
                                            <Avatar opacity={.7} size={'xs'} name={item.author.displayName} src={item.author.avatar} >
                                                {isUserOnline(item.author.id) && <AvatarBadge boxSize='1.25em' bg='green.500' />}
                                            </Avatar>
                                            <AuthorHoverCard author={item.author} />
                                        </Flex>

                                    </Box>


                                    {/* {item.categories?.length > 0 && <Box pt={2}>
                                    <Wrap>

                                        {item.categories.map((cat, index) => <Button
                                            key={index}
                                            size='xs'
                                            variant={'solid'}
                                        >

                                            {cat.name}

                                        </Button>)}

                                    </Wrap>
                                </Box>} */}

                                </Box>

                            </Box>


                        )) : <>


                            <SliderPostCarkSkeleton mb={0} />
                            <SliderPostCarkSkeleton mb={0} />
                            <SliderPostCarkSkeleton mb={0} />
                            <SliderPostCarkSkeleton mb={0} />
                            <SliderPostCarkSkeleton mb={0} />
                            <SliderPostCarkSkeleton mb={0} />
                            <SliderPostCarkSkeleton mb={0} />
                            <SliderPostCarkSkeleton mb={0} />
                            <SliderPostCarkSkeleton mb={0} />

                        </>}

                    </SimpleGrid>

                </Box>


            </LayoutColumn>

        </HomeLayout>
    )
}
