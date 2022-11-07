import { Avatar, Box, Center, Divider, Flex, Image, Spacer, Text, Tooltip } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import { IconThumbUp } from '@tabler/icons'
import Link from 'next/link'
import React from 'react'
import formatDate from '../../Helpers/formatDate'
import PostTrancate from './PostTrancate'
// import { ThumbUpOff } from 'tableicons-react'

export default function SidebarPostCard({ title, image, content, createdAt, states, author, slug }) {
    return (
        <Box my={2} bg={'gray.50'} border='0px' borderColor={'blackAlpha.50'} rounded='sm' shadow='sm' overflow={'hidden'}>

            <Box py={2} px={4}>

                <Flex alignItems='center' gap={image ? 2 : 0}>

                    {image && <Box w={'80px'} h='50px'>
                        <Image w='80px' h='50px' rounded={'md'} objectFit={'cover'} shadow='sm' src={image} alt='image' />
                    </Box>}

                    <Box flex={1}>
                        <Link href={`/blog/${slug}`}>
                            <a href={`/blog/${slug}`}>
                                <Tooltip hasArrow label={title} bg='gray.800'>
                                    <Title order={6}><Text noOfLines={1} color='gray.900'>{title}</Text></Title>
                                </Tooltip>
                            </a>
                        </Link>

                        <Text as='span' color={'blackAlpha.600'} fontSize={'14px'}>
                            {formatDate(createdAt)}
                        </Text>
                    </Box>

                </Flex>


                <Box mt={2} fontSize={'16px'} lineHeight='18px'>

                    <PostTrancate
                        image={image}
                        char={10}
                        content={content}
                    />
                </Box>

            </Box>

        </Box>
    )
}
