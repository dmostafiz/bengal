import { Box, Center, Divider, Flex, Heading, IconButton, Image, Link, Menu, MenuButton, MenuItem, MenuList, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { BsSave2 } from 'react-icons/bs'
import { HiChevronDown } from 'react-icons/hi'
import { VscReport } from 'react-icons/vsc'
import { DotsVertical, Eye, Pencil, Recycle, Trash } from 'tabler-icons-react'
import Axios from '../../Helpers/axiosHelper'
import banglaNumber from '../../Helpers/banglaNumber'
import formatDate from '../../Helpers/formatDate'
import usePostAction from '../../Hooks/usePostAction'
import ComponentLoader from '../Common/ComponentLoader'

export default function PublishedPosts() {

    const { data, isLoading } = useQuery(['publishedPosts'], async () => {
        const response = await Axios.get('/user/published_posts')

        console.log('published posts ', response)
        return response?.data?.posts
    })

    const { trashPost, deletePost, restorPost } = usePostAction()

    return (
        <Box mb={5}>

            <Box py={2}>
                <Title order={3}>সকল প্রকাশিত পোস্ট এর তালিকা</Title>
            </Box>

            <Divider mb={4} />

            {isLoading && <Center>
              <ComponentLoader />
            </Center>}

            <TableContainer>
                <Table size={'md'} variant='simple'>

                    {(!isLoading && !data?.length) && <TableCaption>আপনার প্রকাশিত পোস্ট নেই</TableCaption>}
                    <Thead>
                        <Tr>
                            {/* <Th>#</Th> */}
                            <Th>ব্লগ পোস্ট</Th>
                            <Th>দেখেছেন</Th>
                            <Th>লাইক</Th>
                            <Th>মন্তব্য</Th>
                            <Th isNumeric></Th>
                        </Tr>
                    </Thead>
                    {(!isLoading && data?.length > 0) && <Tbody>

                        {data.map((post, index) => <Tr key={index}>
                            {/* <Td>{banglaNumber(index + 1)}</Td> */}
                            <Td>
                                <Flex gap={1}>
                                    {post.image && <Box w={'80px'} h={'50px'}>
                                        <Image w='full' h='full' objectFit={'cover'} rounded='md' shadow='md' src={post.image} />
                                    </Box>}
                                    <Box flex='1'>
                                        <Heading noOfLines={2} as='h6' size={'xs'} whiteSpace='pre-wrap'>
                                            {post.title}
                                        </Heading>
                                        <Text fontSize={'12px'} whiteSpace='pre-wrap'>{formatDate(post.publishedAt, 'LL')}</Text>
                                    </Box>

                                </Flex>
                            </Td>
                            <Td>{banglaNumber(post.views.length)} জন</Td>
                            <Td>{banglaNumber(post.likes.length)} টি</Td>
                            <Td>{banglaNumber(post.comments.length)} টি</Td>
                            <Td isNumeric>
                                <Menu>
                                    <MenuButton as={IconButton} icon={<DotsVertical size={'18'} />} color='blackAlpha.700' size='xs' variant='unstyled' rounded='sm' />
                                    <MenuList fontSize={'14px'} shadow='lg'>

                                        <Link target={'_blank'} href={`/blog/${post.id}`}>
                                            <MenuItem
                                                color={'gray.600'}
                                                textDecoration='none'
                                                icon={<Eye size={14} />}
                                            >
                                                পোস্টটি দেখুন
                                            </MenuItem>
                                        </Link>

                                        <Link target={'_blank'} href={`/editor/${post.id}?editorStatus=update`}>
                                            <MenuItem
                                                color={'gray.600'}
                                                textDecoration='none'
                                                icon={<Pencil size={14} />}
                                            >
                                                সম্পাদনা করুণ
                                            </MenuItem>
                                        </Link>

                                        <MenuItem
                                            color={'gray.600'}
                                            textDecoration='none'
                                            icon={<Trash size={14} />}
                                            onClick={() => trashPost(post.id)}
                                        >
                                            ট্রাস করুণ
                                        </MenuItem>

                                        {/* <MenuItem>Create a Copy</MenuItem> */}
                                    </MenuList>
                                </Menu>
                            </Td>
                        </Tr>)}

                    </Tbody>}

                </Table>
            </TableContainer>
        </Box>
    )
}
