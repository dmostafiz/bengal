import { Avatar, Box, Button, Divider, Flex, Icon, Spinner, Text } from '@chakra-ui/react'
import { Spoiler, Title } from '@mantine/core'
import React, { useState } from 'react'
import { useContext } from 'react'
import { TbMessageOff } from 'react-icons/tb'
import { BsReply } from 'react-icons/bs'
import { CommentContext } from '../../Contexts/CommentContext'
import banglaNumber from '../../Helpers/banglaNumber'
import formatDate from '../../Helpers/formatDate'
import useUser from '../../Hooks/useUser'
import CommentInput from './CommentInput'
import { ArrowAutofitLeft, ArrowAutofitRight } from 'tabler-icons-react'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'

export default function BlogCommentThread({openOnReply=false, showChildrenButton = false, replyType = 'post', bg = '', comment, shouldReply = false }) {

    const { authUser, isLoading, hasUser, isError, error, logoutUser } = useUser()
    const { commentLoading, commentId, currentReplyThread, setCurrentReplyThread, commentChildren, setCommentChildren } = useContext(CommentContext)

    const [answer, setAnswer] = useState(false)

    return (
        <>

            <Box id={comment.id} w='full'  bg={bg}>
                <Box pb={2}>
                    <Flex gap={2}>
                        <Avatar size={'sm'} name={comment.author.displayName} src={comment.author.avatar} />
                        <Flex w='full' direction={'column'} gap={0}>
                            <Title order={6}>{comment.author.displayName}</Title>
                            <Text fontSize={'13px'} color='gray.500'>{formatDate(comment.createdAt, '', true)} {replyType == 'post' ? ' মন্তব্য করেছেন' : 'উত্তর দিয়েছেন'}</Text>
                        </Flex>

                    </Flex>

                    <Box
                        p={2}
                        rounded='lg'
                        border={'1px'}
                        borderColor={'blackAlpha.200'}
                        bg='whiteAlpha.500'
                        mt={2}
                        mb={3}
                    >
                        <Spoiler maxHeight={50} showLabel="আরও দেখুন" hideLabel="কমান">
                            <Box
                                dangerouslySetInnerHTML={{ __html: comment.content }}
                            />
                        </Spoiler>
                    </Box>

                    <Flex w='full' alignItems={'end'} justify={'space-between'}>


                        {shouldReply &&
                            <Flex justify={'end'} alignItems='center' gap={3}>

                                {(comment.childs.length > 0 && showChildrenButton) && <Button
                                    size='xs'
                                    onClick={() => setCommentChildren(() => {
                                        if (comment.id == commentChildren) {
                                            return null
                                        } else {
                                            return comment.id
                                        }
                                    })}
                                    fontWeight={'bold'}
                                    colorScheme='gray'
                                    variant='outline'
                                    rounded='full'
                                    rightIcon={commentChildren == comment.id ? <AiOutlineArrowUp fontSize='18px' /> : <AiOutlineArrowDown fontSize='18px' />}
                                >
                                    {banglaNumber(comment.childs.length)} টি উত্তর
                                </Button>}

                                <Button
                                    size='xs'
                                    onClick={() => setCurrentReplyThread({
                                        showEditor: currentReplyThread.commentId == comment.id ? !currentReplyThread.showEditor : true,
                                        commentId: comment.id
                                    })}
                                    pr={3}
                                    colorScheme='gray'
                                    variant='outline'
                                    rounded='full'
                                    rightIcon={<Icon as={(currentReplyThread.showEditor && currentReplyThread.commentId == comment.id) ? TbMessageOff : BsReply} fontSize='18px' />} fontSize={'12px'}
                                >
                                    {(currentReplyThread.showEditor && currentReplyThread.commentId == comment.id) ? 'বন্ধ করুণ' : 'উত্তর দিন'}

                                </Button>

                            </Flex>}
                    </Flex>
                </Box>
            </Box>



            {(currentReplyThread.showEditor && currentReplyThread.commentId == comment.id && shouldReply) && <Box mb={5} px={1}>
                <CommentInput key={authUser} openOnReply={openOnReply} replyTo='reply' user={authUser} id={comment.id} />
            </Box>}

        </>
    )
}
