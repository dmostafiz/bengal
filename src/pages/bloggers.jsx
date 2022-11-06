import { Avatar, Box, Button, Center, Divider, Flex, Image, Show, SimpleGrid, Spacer, Text, VStack, Wrap } from '@chakra-ui/react'
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

export default function Bloggers() {



    const [bloggers, setBloggers] = useState([])

    const { data, isLoading, isError, error } = useQuery(['allBloggers'], async () => {

        const response = await Axios.get('/user/get_top_ranked/200')

        setBloggers(response?.data?.users)
        return response?.data?.users || null

    })

    return (
        <HomeLayout>

            <LayoutColumn

                leftSide={<MainLeftSidebar />}

                rightSide={<MainRightSidebar />}

                pageTopSection={<></>}

            >

                <Box mb={8}>

                    <SectionTitle mb={5} title='সকল ব্লগার (ক্রমানুসারে)' />

                    <SimpleGrid  columns={{base: 2, xl:3}} spacing={2}>
                        {bloggers.map((item, index) => (
                            <Box w={'full'} key={index} bg='blue.800' color='whiteAlpha.800' p={3} rounded='xl'>
                                <Flex direction={{ base: 'row', md: 'row' }} gap={{ base: 1, md: 2 }}>
                                    <Box>
                                        <Avatar size={{ base: 'sm', md: 'sm' }} src={item.avatar} rounded={'full'} shadow name='লিমন লস্কর' />
                                    </Box>
                                    <Box>
                                        <Title order={5}><Text noOfLines={1}>{item.displayName}</Text></Title>
                                        <Text fontSize={'12px'}>{banglaNumber(item.followers?.length)} জন ফলোয়ার</Text>
                                    </Box>
                                </Flex>

                                <Box>
                                    <Box py={2}>
                                        <Text noOfLines={1} fontSize='12px'>{item.bio}</Text>
                                    </Box>

                                    <Divider my={1} borderColor='whiteAlpha.300' />

                                    <Box bg={'blackAlpha.5'} fontSize={'13px'}>
                                        <Text mb={2}><Text as='span' fontSize={'16px'} fontWeight='bold'>{banglaNumber(item.posts?.length)}</Text> টি পোস্ট লিখেছেন</Text>
                                        <Link href={`/blogger/${item.id}`}>
                                            <Button w='full' size='xs' rounded={'none'} colorScheme={'yellow'}>সকল পোস্ট দেখুন</Button>
                                        </Link>
                                    </Box>
                                </Box>
                                {/* <Divider my={1} /> */}
                            </Box>
                        ))}
                    </SimpleGrid>

                </Box>


            </LayoutColumn>

        </HomeLayout>
    )
}
