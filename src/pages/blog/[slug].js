import { Avatar, AvatarGroup, Box, Button, Center, Divider, Flex, HStack, Image, Text, Tooltip, VStack, Wrap } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import dynamic from 'next/dynamic'
import React from 'react'
import { FaFacebook, FaTwitter } from 'react-icons/fa'
import BlogLeftSidebar from '../../Components/Blog/BlogLeftSidebar'
import BlogRightSidebar from '../../Components/Blog/BlogRightSidebar'
import TabContainer from '../../Components/HomePage/TabContainer'
import Axios from '../../Helpers/axiosHelper'
import formatDate from '../../Helpers/formatDate'
import MainLeftSidebar from '../../Layouts/Common/MainLeftSidebar'
import MainRightSidebar from '../../Layouts/Common/MainRightSidebar'
import HomeLayout from '../../Layouts/HomeLayout'
import LayoutColumn from '../../Layouts/HomeLayout/LayoutColumn'


// import CommentInput from '../../Components/Blog/CommentInput'
const CommentInput = dynamic(import('../../Components/Blog/CommentInput'), { ssr: false })


function SingleBlogDetails({ post }) {
    return (
        <HomeLayout>

            <LayoutColumn
                // leftColumnWidth={26}
                rightSide={<></>}
                leftSide={< BlogLeftSidebar />}
                rightColumnWidth={10}
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


                    <Center w={'full'} py={6}>
                       {post.image && <Image maxW='full' maxH='500px' shadow='sm' src={post.image} alt='name' />} 
                    </Center>

                    <Box
                        px={{ base: 2, md: 5 }}
                        textAlign={'justify'}
                        mb={5}
                        lineHeight={'28px'}
                        fontSize={'18px'}
                    >
                        <div dangerouslySetInnerHTML={{__html:post?.content}}></div>
                    </Box>




                    <Box p={3} mb={2} bg='blackAlpha.50'>

                    </Box>




                    <Box shadow={'sm'}>
                        <Box p={3} mb={2} bg='blackAlpha.50'>
                            <Title order={5}>মন্তব্য করুন</Title>
                        </Box>

                        <Box p={0}>
                            <CommentInput />
                        </Box>
                    </Box>

                </Box>


            </LayoutColumn>

        </HomeLayout>
    )
}

SingleBlogDetails.getInitialProps = async (ctx) => {
    const res = await Axios.get(`/post/getSinglePost/${ctx.query.slug}`)
    
    return { post: res?.data?.post }
}

export default SingleBlogDetails