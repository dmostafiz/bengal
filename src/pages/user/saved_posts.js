import { Box, Button, Center, Divider, Flex, Image, Text, VStack } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import { Eye, Pencil, Trash } from 'tabler-icons-react'
import AuthorHoverCard from '../../Components/Common/AuthorHoverCard'
import ComponentLoader from '../../Components/Common/ComponentLoader'
import Axios from '../../Helpers/axiosHelper'
import formatDate from '../../Helpers/formatDate'
import usePostAction from '../../Hooks/usePostAction'
import AccountWrapper from './AccountWrapper'

export default function saved_posts() {

    const [user, setUser] = useState(null)

    const { removeSavePost } = usePostAction()

    const { data, isLoading } = useQuery(['savedPosts'], async () => {
        const response = await Axios.get('/user/saved_posts')
        console.log('saved posts ', response)
        return response?.data?.posts
    })

    return (
        <AccountWrapper
            title='সংরক্ষিত পোস্ট'
            getUser={setUser}
        >

            <Box mt={5}>

                <Box py={2}>
                    <Title order={3}>সংরক্ষিত পোস্ট এর তালিকা</Title>
                </Box>

                <Divider mb={4} />

                <Box mb={5}>

                    {isLoading && <ComponentLoader py='3' />}

                    {(!isLoading && data?.length) ? data?.map((saved, index) => {

                        if (
                            saved?.post?.id
                            && saved?.post?.isDeleted == false
                            && saved?.post?.isDeclined == false
                            && saved?.post?.status == 'published'
                        ) {

                            const post = saved.post

                            return <Flex
                                w='full'
                                key={index}
                                p={2}
                                mb={1}
                                alignItems={{ base: 'start', md: 'center' }}
                                gap={2}
                                bg='white'
                            >
                                <Box w='100px'>
                                    {post.image ? <Image w='full' src={post.image} /> : <Box w='100px' h='85px' bg='red.50' border='2px' borderColor={'red.100'}>
                                        <Center h='full'>
                                            <Text fontSize={'11px'} color={'red.600'}>ছবি নেই</Text>
                                        </Center>
                                    </Box>}
                                </Box>

                                <Flex
                                    flex='1'
                                    overflowX='hidden'
                                    w='full'
                                    gap={2}
                                    direction={{ base: 'column', md: 'row' }}
                                    alignItems={{ base: 'start', md: 'center' }}
                                    px={1}
                                >


                                    <Box flex={1}>
                                        <Title order={4}><Text noOfLines={1}>{post.title ? post.title : '#শিরোনাম নেই#'}</Text></Title>
                                        <Text noOfLines={2} fontSize={{ base: '12px', md: '14px' }} >{post.content ? <div dangerouslySetInnerHTML={{ __html: post.content }}></div> : '#কন্টেন্ট লেখা হয়নি#'}</Text>
                                        <Flex alignItems={'center'} gap={1} direction={'row'}  color='blackAlpha.500' fontSize={'14px'}>
                                            লিখেছে <AuthorHoverCard author={post.author} />
                                        </Flex>
                                    </Box>

                                    <Flex direction={{ base: 'row', md: 'column' }} gap={2} >
                                        <Link href={`/blog/${post.id}`}>
                                            <Button leftIcon={<Eye size={14} />} colorScheme={'blue'} size={{ base: 'sm', md: 'sm' }}>দেখুন</Button>
                                        </Link>

                                        <Button leftIcon={<Trash size={14} />} onClick={() => removeSavePost(post.id)} colorScheme={'gray'} size={{ base: 'sm', md: 'sm' }}>সরান</Button>

                                    </Flex>
                                </Flex>


                            </Flex>
                        }
                    }


                    ) : <Center py={5}>
                        <VStack>
                            <Text>সংরক্ষিত পোস্ট পাওয়া যায়নি</Text>
                        </VStack>
                    </Center>}


                </Box>

            </Box>

        </AccountWrapper>
    )
}
