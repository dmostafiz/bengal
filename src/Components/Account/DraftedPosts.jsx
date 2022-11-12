import { Box, Button, Center, Divider, Flex, Image, Input, InputGroup, InputRightElement, Text, VStack } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'
import { Pencil, Search, Trash } from 'tabler-icons-react'
import Axios from '../../Helpers/axiosHelper'
import formatDate from '../../Helpers/formatDate'
import usePostAction from '../../Hooks/usePostAction'
import ComponentLoader from '../Common/ComponentLoader'

export default function DraftedPosts() {

    const { data, isLoading } = useQuery(['draftedPosts'], async () => {
        const response = await Axios.get('/user/author_drafted_posts')

        console.log('published posts ', response)
        return response?.data?.posts
    })

    const {trashPost, deletePost, restorPost} = usePostAction()

    return (
        <Box mb={8}>

            <Box py={2}>
                <Title order={3}>খসড়া (ড্রাফট) পোস্ট এর তালিকা</Title>
            </Box>

            <Divider mb={4} />

            <Box mb={5}>

                {isLoading && !data ? <ComponentLoader py='3' />
                    :
                    <Box >

                        {data?.length ? data?.map((post, index) => <Flex
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
                                    <Text color='blackAlpha.500' fontSize={{ base: '10px', md: '11px' }} noOfLines={1}>{formatDate(post.updatedAt)} ( সর্বশেষ আপডেট )</Text>
                                </Box>

                                <Flex direction={{base: 'row', md: 'column'}} gap={2} >
                                    <Link href={`/editor/${post.id}?editorStatus=update`}>
                                        <Button leftIcon={<Pencil size={14} />} colorScheme={'blue'} size={{ base: 'sm', md: 'sm' }}>সম্পাদনা</Button>
                                    </Link>

                                    <Button onClick={() => trashPost(post.id)} leftIcon={<Trash size={14} />} colorScheme={'gray'} size={{ base: 'sm', md: 'sm' }}>ট্রাস করুন</Button>

                                </Flex>
                            </Flex>


                        </Flex>
                        ) : <Center py={5}>
                            <VStack>
                                <Text>কোন খসড়া পোস্ট পাওয়া যায়নি</Text>
                            </VStack>
                        </Center>}
                    </Box>
                }

            </Box>

        </Box>
    )
}
