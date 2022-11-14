import React, { useEffect, useState } from 'react'
import { Avatar, AvatarBadge, Badge, Box, Center, Divider, Flex, Heading, Hide, Icon, Image, Show, Spacer, Table, TableContainer, Tbody, Td, Text, Tr, VStack, Wrap } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import HomeLayout from '../../Layouts/HomeLayout'
import LayoutColumn from '../../Layouts/HomeLayout/LayoutColumn'
import { useRouter } from 'next/router'
import PostCard from '../../Components/Common/PostCard'
import Axios from '../../Helpers/axiosHelper'
import ComponentLoader from '../../Components/Common/ComponentLoader'
import IconText from '../../Components/Common/IconText'
import formatDate from '../../Helpers/formatDate'
import SectionTitle from '../../Components/Common/SectionTitle'
import banglaNumber from '../../Helpers/banglaNumber'
import useOnlineUser from '../../Hooks/useOnlineUser'
import LatestCommentsSkeleton from '../../Components/Common/Skeletons/LatestCommentsSkeleton'
import truncate from 'truncate-html'
import { BiCommentDetail } from 'react-icons/bi'
import Link from 'next/link'
import AuthorHoverCard from '../../Components/Common/AuthorHoverCard'
import { imageUrl, siteName, siteSlogun, siteUrl } from '../../Helpers/config'
import usePaginatingQuery from '../../Hooks/usePaginatingQuery'
import PostCardSkeleton from '../../Components/Common/Skeletons/PostCardSkeleton'

const blogger = ({ user, ok }) => {

    const router = useRouter()

    const { isUserOnline } = useOnlineUser()

    const [loading, setLoading] = useState(true)

    const { items, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, ref, loadMoreButton, loadMoreInfinite, loadMore } = usePaginatingQuery(`/user/blogger/posts/${user?.id}`, 20)


    const userInfo = () => {
        return <Box w='full' px={{ md: 1, lg: 3 }} mb='5' bg={'white'}>
            <Flex direction={{ md: 'column', lg: 'row' }} alignItems={{ md: 'start', lg: 'start' }} gap={3} mb={0}>
                <Avatar rounded={'sm'} bg='transparent' size='lg' src={user?.avatar} name={user?.displayName}>
                    {isUserOnline(user?.id) && <AvatarBadge boxSize='22px' bg='green.400' />}
                </Avatar>
                <Box>
                    <Title order={3}>{user?.displayName}</Title>
                    <Text fontSize={'14px'} ml={1} color='blackAlpha.500'>নিবন্ধ - {formatDate(user?.createdAt, 'LL')}</Text>

                    <Badge bg={'green.400'} variant='solid'>{banglaNumber(user?.followers.length)} জন অনুসরন করছে</Badge>

                </Box>
            </Flex>

            <Box py={5} mb={1}>
                {/* <Blockquote px={0}> */}
                <Text fontSize={'15px'} color={'blackAlpha.800'}>{user?.bio}</Text>
                {/* </Blockquote> */}
            </Box>
        </Box>
    }


    return (
        <HomeLayout
            title={user ? `${user.id ? user.displayName + ' | ' : ''}${siteName}` : `${siteName}`}
            image={user?.avatar || imageUrl}
            url={siteUrl + router.asPath}
            description={truncate(user?.bio, 270, {
                stripTags: true,
            })}
        >

            {user ? <LayoutColumn

                leftSide={
                    <Box>
                        <Hide below='md'>
                            {userInfo()}
                        </Hide>

                        <Box mb={5}>
                            <SectionTitle bg='blackAlpha.50' px={5} showBorder={false} mb={0} order={5} title={`${user?.displayName} এর অন্যান্য তথ্য`} />

                            <TableContainer>
                                <Table size='sm' variant='simple'>
                                    <Tbody>
                                        <Tr>
                                            <Td>লিঙ্গ</Td>
                                            <Td isNumeric>{user?.gender == 'male' ? 'পুরুষ' : user?.gender == 'female' ? 'নারী' : 'অন্যান্য'}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>পেশা</Td>
                                            <Td isNumeric>{user?.profession}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>জন্মস্থান</Td>
                                            <Td isNumeric>{user?.birthPlace}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>জন্ম তারিখ</Td>
                                            <Td isNumeric>{formatDate(user?.birthDate, 'LL')}</Td>
                                        </Tr>
                                
                                    </Tbody>

                                </Table>
                            </TableContainer>
                        </Box>


                        <Box mb={5}>
                            <SectionTitle bg='blackAlpha.50' px={5} showBorder={false} mb={0} order={5} title={`ব্লগ পরিসংখ্যান`} />

                            <TableContainer>
                                <Table size='sm' variant='simple'>
                                    <Tbody>
                                        <Tr>
                                            <Td>পোস্ট লিখেছেন </Td>
                                            <Td isNumeric>{banglaNumber(user?.posts?.length)} টি</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>মন্তব্য করেছেন</Td>
                                            <Td isNumeric>{banglaNumber(user?.postComments?.length)} টি</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>মন্তব্য পেয়েছেন</Td>
                                            <Td isNumeric>{banglaNumber(user?.getComments?.length)} টি</Td>
                                        </Tr>
                                    </Tbody>

                                </Table>
                            </TableContainer>

                        </Box>

                    </Box>
                }

                rightSide={
                    <Box>
                        {user?.getComments?.length > 0 && <Box mb={6}>
                            <SectionTitle bg='blackAlpha.50' px={2} showBorder={false} title='মন্তব্য পেয়েছেন' mb={1} />
                            <Flex direction='column' w={'full'}>
                                {user?.getComments.map((comment, index) => <Box key={index} mt={3} pb={3} borderBottom='1px' borderColor={'blackAlpha.200'}>

                                    <Flex alignItems={'start'} gap={2}>
                                        <Avatar size={'xs'} name={comment.author.name} src={comment.author.avatar}>
                                            {isUserOnline(comment.author.id) && <AvatarBadge boxSize='1.25em' bg='green.400' />}
                                        </Avatar>
                                        <Box>
                                            <Heading as='h6' size='xs'>
                                                {comment.author.displayName}
                                            </Heading>
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

                                </Box>)}
                            </Flex>
                        </Box>}

                        {user?.postComments?.length > 0 && <Box mb={5}>
                            <SectionTitle bg='blackAlpha.50' px={5} showBorder={false} title='মন্তব্য  করেছেন' mb={1} />
                            <Flex direction='column' w={'full'}>
                                {user?.postComments.map((comment, index) => <Box key={index} mt={3} pb={3} borderBottom='1px' borderColor={'blackAlpha.200'}>

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

                                    <Text fontSize={'12px'} color='blackAlpha.500'>{formatDate(comment.createdAt)}</Text>

                                </Box>)}
                            </Flex>
                        </Box>}


                    </Box>
                }
            // rightColumnWidth={30}
            // rightSide={<MainRightSidebar />}

            >

                <Box mb={8}>

                    <Show below='md'>
                        {userInfo()}
                    </Show>


                    <SectionTitle mb={{ base: 0, lg: 5 }} title={`${user?.displayName} এর সকল পোস্ট ( ক্রমানুসারে )`} />

                    <>
                        {isFetching && !items.length

                            ? <>
                                <PostCardSkeleton />
                                <PostCardSkeleton />
                                <PostCardSkeleton />
                                <PostCardSkeleton />

                            </>

                            : !isFetching && !items.length ?

                                <>
                                    <IconText text='পোস্ট পাওয়া যায়নি' />
                                </>

                                : items.length > 0 && <VStack gap={0}>
                                    {items.map((post, index) => <Box w='full' key={index}>
                                        <PostCard
                                            title={post?.title}
                                            slug={post?.id}
                                            image={post?.image}
                                            content={post?.content}
                                            createdAt={post?.publishedAt}
                                            states={{
                                                read: post?.views?.length ?? 0,
                                                comment: post?.comments?.length ?? 0,
                                                like: post?.likes?.length ?? 0,
                                            }}
                                            categories={post?.categories}
                                            author={post?.author}
                                        />
                                    </Box>)}

                                </VStack>

                        }

                        {isFetchingNextPage && <>
                            <PostCardSkeleton />
                            <PostCardSkeleton />
                            <PostCardSkeleton />
                            <PostCardSkeleton />

                        </>}

                        {loadMore()}

                    </>


                </Box>


            </LayoutColumn>

                : <IconText height={'75vh'} py='200' text='ব্লগার পাওয়া যায়নি' />
            }

        </HomeLayout>
    )
}

blogger.getInitialProps = async (ctx) => {

    const response = await Axios.get(`/user/blogger/${ctx.query.slug}`)

    return {
        user: response?.data?.user,
        ok: response?.data?.ok
    }
}

export default blogger
