import { Avatar, AvatarBadge, Box, Flex, Heading, Icon, Image, Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React, { useState } from 'react'
import truncate from 'truncate-html'
import Axios from '../../Helpers/axiosHelper'
import banglaNumber from '../../Helpers/banglaNumber'
import formatDate from '../../Helpers/formatDate'
import AuthorHoverCard from './AuthorHoverCard'
import { BiCommentDetail } from 'react-icons/bi'
import LatestCommentsSkeleton from './Skeletons/LatestCommentsSkeleton'
import useOnlineUser from '../../Hooks/useOnlineUser'

export default function LatestComments() {

    const [comments, setComments] = useState([])

    const {isUserOnline} = useOnlineUser()

    const { data, isLoading, isError, error } = useQuery(['latesComments'], async () => {

        const response = await Axios.get('/post/latest_comments/12')

        console.log('latest comments: ', response?.data?.comments)
        setComments(response?.data?.comments)
        return response?.data?.comments || null

    })

    return (
        <Flex direction='column' w={'full'}>
            {comments.length ? comments.map((comment, index) => <Box key={index} mt={3} pb={3} borderBottom='1px' borderColor={'blackAlpha.200'}>

                <Flex alignItems={'start'} gap={2}>
                    <Avatar size={'xs'} name={comment.author.name} src={comment.author.avatar}>
                        {isUserOnline(comment.author.id) && <AvatarBadge boxSize='1.25em' bg='green.400' />}
                    </Avatar>
                    <Box>
                        <AuthorHoverCard author={comment.author} />
                        <Text fontSize={'12px'} color='blackAlpha.500'>{formatDate(comment.createdAt)}</Text>
                    </Box>
                </Flex>

                <Box>
                    <Link href={`/blog/${comment.post.id}`}>

                        <Box flex={1} cursor='pointer' lineHeight={'20px'}>
                            <Heading as={'span'} size='xs' color={'facebook.700'}>
                                <Icon as={BiCommentDetail} fontSize={'18px'} color='facebook.200' />  {comment.post.title} <Text as='span' fontWeight={'normal'} color='blackAlpha.500'>পোস্ট এ মন্তব্য করেছেন</Text>
                            </Heading>
                        </Box>

                    </Link>
                </Box>

                <Box p={2} bg='facebook.50' rounded={'lg'}>
                    <Text as='div' w='full' color={'blackAlpha.700'} align={''} noOfLines={2} lineHeight={'17px'} fontSize={'15px'} dangerouslySetInnerHTML={{
                        __html: truncate(comment.content, 50, {
                            ellipsis: `...`,
                            byWords: true,
                            //    keepWhitespaces: true,
                            stripTags: false,
                            excludes: ['img', 'video', 'script'],
                            decodeEntities: true,
                            reserveLastWord: true
                        })
                    }} />

                </Box>

            </Box>)
                : <>
                    <LatestCommentsSkeleton />
                    <LatestCommentsSkeleton />
                    <LatestCommentsSkeleton />
                    <LatestCommentsSkeleton />
                    <LatestCommentsSkeleton />
                    <LatestCommentsSkeleton />
                    <LatestCommentsSkeleton />
                    <LatestCommentsSkeleton />
                    <LatestCommentsSkeleton />
                    <LatestCommentsSkeleton />

                </>}
        </Flex>
    )
}
