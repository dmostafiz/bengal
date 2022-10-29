import { Avatar, AvatarGroup, Box, Button, Center, Divider, Flex, HStack, Image, Text, Tooltip, VStack, Wrap } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { FaFacebook, FaTwitter } from 'react-icons/fa'
import { ThumbUp } from 'tabler-icons-react'
import BlogLeftSidebar from '../../Components/Blog/BlogLeftSidebar'
import BlogRightSidebar from '../../Components/Blog/BlogRightSidebar'
import SectionTitle from '../../Components/Common/SectionTitle'
import TabContainer from '../../Components/HomePage/TabContainer'
import Axios from '../../Helpers/axiosHelper'
import banglaNumber from '../../Helpers/banglaNumber'
import formatDate from '../../Helpers/formatDate'
import MainLeftSidebar from '../../Layouts/Common/MainLeftSidebar'
import MainRightSidebar from '../../Layouts/Common/MainRightSidebar'
import HomeLayout from '../../Layouts/HomeLayout'
import LayoutColumn from '../../Layouts/HomeLayout/LayoutColumn'


// import CommentInput from '../../Components/Blog/CommentInput'
const CommentInput = dynamic(import('../../Components/Blog/CommentInput'), { ssr: false })


function SingleBlogDetails({ post, ok }) {

    const router = useRouter()

    async function storeTraffic() {

        const res = await Axios.post(`/post/storePostTraffic/${router?.query?.slug}`)
        console.log('storePostTraffic', res?.data)

    }

    useEffect(() => {

        let isMounted = true

        if (isMounted) {
            console.log('traffic req sending')
            storeTraffic()
        }

        return () => {
            isMounted = false
        }

    }, [])


    return (
        <HomeLayout>

            {ok ?

                <LayoutColumn
                    // leftColumnWidth={26}
                    rightSide={<></>}
                    leftSide={< BlogLeftSidebar />}
                    rightColumnWidth={15}
                >

                    <Box mb={8} px={{ base: 0, md: 2 }}>

                        <Box py={2} fontWeight='bold' rounded='sm' borderBottom={'2px'} borderColor='blackAlpha.100'>
                            <Title order={2}>{post?.title}</Title>
                        </Box>

                        <Box py={2} mb='2'>
                            <Text color='blackAlpha.600'>{formatDate(post?.createdAt)}</Text>
                        </Box>

                        <Box p={2} bg='blackAlpha.50'>
                            <HStack>
                                <Text color='blackAlpha.500'>পোস্টটি শেয়ার করুন </Text>
                                <Tooltip hasArrow label={'ফেসবুকে শেয়ার করুন'} bg='gray.800'>
                                    <Button size='xs' rounded={'none'} colorScheme='facebook' leftIcon={<FaFacebook />}>
                                        Facebook
                                    </Button>
                                </Tooltip>

                                <Tooltip hasArrow label={'টুইটারে শেয়ার করুন'} bg='gray.800'>
                                    <Button size={'xs'} rounded='none' colorScheme='twitter' leftIcon={<FaTwitter />}>
                                        Twitter
                                    </Button>
                                </Tooltip>
                            </HStack>
                        </Box>


                        <Box px={{ base: 1, md: 3 }}>
                            <Center w={'full'} py={6}>
                                {post.image && <Image maxW='full' maxH='500px' shadow='sm' src={post.image} alt='name' />}
                            </Center>

                            <Box
                                textAlign={'justify'}
                                mb={10}
                                fontSize={'17px'}
                                lineHeight='24px'
                                as='article'
                                fontWeight={500}
                                dangerouslySetInnerHTML={{ __html: post?.content }}
                            >
                            </Box>

                            <Box px={0} pb={2}>
                                <Text fontSize={'14px'} color={'blackAlpha.600'}>সর্বশেষ আপডেট  - {formatDate(post.createdAt)}</Text>
                            </Box>

                            <Divider />

                            <Box px={0} py={1} mb={2} bg='blacAlpha.50'>
                                <Flex gap={2} justify='space-between' alignItems={'center'}>
                                    <Flex gap={2} justify='flex-start' alignItems={'center'}>
                                        <Text>
                                            <Text as={'span'} fontSize='14px' fontWeight={'normal'}>{banglaNumber(post.views.length)}</Text> জন পড়েছেন
                                        </Text>

                                        <Divider orientation='vertical' borderColor={'blackAlpha.50'} h='10px' />

                                        <Text>
                                            <Text as={'span'} fontSize='14px' fontWeight={'normal'}>{banglaNumber(post.likes.length)}</Text> লাইক
                                        </Text>

                                        <Divider orientation='vertical' borderColor={'blackAlpha.50'} h='10px' />
                                        {/* 
                                    <Text>
                                        <Text as={'span'} fontSize='14px' fontWeight={'normal'}>{banglaNumber(post.comments.length)}</Text> টি মন্তব্য
                                    </Text> */}
                                    </Flex>



                                    <Flex alignItems={'center'} gap={1}>
                                        <ThumbUp size={16} />
                                        <Text>
                                            <Text as={'span'} fontSize='14px' fontWeight={'normal'}>লাইক দিন</Text>
                                        </Text>
                                    </Flex>
                                </Flex>

                            </Box>

                        </Box>


                        <Box px={3} py={4}>
                            <SectionTitle py={1} title={!post.comments.length ? 'কোন মন্তব্য নেই' : `${post.comments.length} টি মন্তব্য`} />
                        </Box>



                        <Box py={10} px={3}>

                            <Box p={1}>
                                <Title order={6}>{!post.comments.length ? 'প্রথম মন্তব্যটি করুন' : 'মন্তব্য করুন'}</Title>
                            </Box>

                            <Box mb={2}>
                                <CommentInput />
                            </Box>

                            <Button colorScheme={'green'}>মন্তব্য পোস্ট করুন</Button>

                        </Box>


                    </Box>

                </LayoutColumn>

                : <Center h='75vh'>
                    <Text>পোস্ট পাওয়া যায়নি!</Text>
                </Center>}

        </HomeLayout>
    )
}

SingleBlogDetails.getInitialProps = async (ctx) => {

    const res = await Axios.get(`/post/getSinglePost/${ctx.query.slug}`)

    return {
        post: res?.data?.post,
        ok: res?.data?.ok
    }
}

export default SingleBlogDetails