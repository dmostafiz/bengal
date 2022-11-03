import { Avatar, Box, Button, Flex, Icon, Text } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import React, { useState } from 'react'
import { BsReply } from 'react-icons/bs'
import banglaNumber from '../../Helpers/banglaNumber'
import formatDate from '../../Helpers/formatDate'
import useUser from '../../Hooks/useUser'
import CommentInput from './CommentInput'

export default function BlogCommentThread({bg='', comment, shouldReply=false }) {

    const { authUser, isLoading, hasUser, isError, error, logoutUser } = useUser()

    const [answer, setAnswer] = useState(false)

    return (
        <Box w='full' rounded={'md'} px={3} py={2} mb={2} border='1px' borderColor='gray.200' bg={bg}>
            <Box pb={2}>
                <Flex gap={2}>
                    <Avatar size={'sm'} name={comment.author.displayName} src={comment.author.avatar} />
                    <Flex direction={'column'} gap={0}>
                        <Title order={6}>{comment.author.displayName}</Title>
                        <Text fontSize={'13px'} color='gray.500'>মন্তব্য করেছেন - {formatDate(comment.createdAt, '', true)}</Text>
                    </Flex>
                </Flex>
            </Box>
            <Box py={2} borderTop='1px' borderColor='gray.200'>
                <Box
                    dangerouslySetInnerHTML={{ __html: comment.content }}
                />
            </Box>
            
            {shouldReply && <Flex justify={'end'} alignItems='center' gap={3}>
                {comment.childs.length > 0 && <Text fontSize={'12px'} color='gray.400' fontWeight={'bold'}>{banglaNumber(comment.childs.length)} টি উত্তর</Text> }
                <Button size='sm' onClick={() => setAnswer(!answer)} pr={3} colorScheme='gray' variant='outline' rounded='full' leftIcon={<Icon as={BsReply} fontSize='18px'/>} fontSize={'12px'}>উত্তর দিন</Button>
            </Flex>}

            {(answer && shouldReply) && <Box pt={2}>
                <CommentInput key={authUser} replyTo='reply' id={comment.id} user={authUser} />
            </Box> }
        </Box>
    )
}
