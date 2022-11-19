import { Avatar, AvatarGroup, Box, Button, Center, Divider, Flex, Heading, HStack, Icon, Image, Show, Spinner, Text, Tooltip, VStack, Wrap } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useRef } from 'react'
import { FaFacebook, FaRegHandPeace, FaTwitter } from 'react-icons/fa'
import { BiBookReader } from 'react-icons/bi'
import { FacebookShareButton, FacebookShareCount } from 'react-share'
import { Edit, PencilPlus, ThumbDown, ThumbUp } from 'tabler-icons-react'
import BlogLeftSidebar from '../../Components/Blog/BlogLeftSidebar'
import BlogRightSidebar from '../../Components/Blog/BlogRightSidebar'
import SectionTitle from '../../Components/Common/SectionTitle'
import SidebarPostCard from '../../Components/Common/SidebarPostCard'
import TabContainer from '../../Components/HomePage/TabContainer'
import Axios from '../../Helpers/axiosHelper'
import banglaNumber from '../../Helpers/banglaNumber'
import formatDate from '../../Helpers/formatDate'
import MainLeftSidebar from '../../Layouts/Common/MainLeftSidebar'
import MainRightSidebar from '../../Layouts/Common/MainRightSidebar'
import HomeLayout from '../../Layouts/HomeLayout'
import LayoutColumn from '../../Layouts/HomeLayout/LayoutColumn'

import { FcComments, FcReading } from 'react-icons/fc'
import { AiFillLike } from 'react-icons/ai'
import SocialShareButtons from '../../Components/Common/SocialShareButtons'
import { useState } from 'react'
import { AuthModalContext } from '../../Contexts/AuthModalContext'
import useUser from '../../Hooks/useUser'
import { setRedirectUrl } from '../../Helpers/cookieHelper'
import { BsHandThumbsDown, BsHandThumbsUp } from 'react-icons/bs'
import useSWR from 'swr'
import BlogCommentThread from '../../Components/Blog/BlogCommentThread'
import { useQuery } from '@tanstack/react-query'
import { CommentContext } from '../../Contexts/CommentContext'
import { IconPencilPlus } from '@tabler/icons'
import Link from 'next/link'
import { imageUrl, siteName, siteUrl } from '../../Helpers/config'
import truncate from 'truncate-html'
import useFollowing from '../../Hooks/useFollowing'

// import CommentInput from '../../Components/Blog/CommentInput'
const CommentInput = dynamic(import('../../Components/Blog/CommentInput'), { ssr: false })


function SingleBlogDetails({ post, ok }) {

    const router = useRouter()

    const { onOpen, seTitle } = useContext(AuthModalContext)

    const { authUser, hasUser } = useUser()

    const { setCommentLoading, commentLoading, commentId, commentChildren, currentReplyThread } = useContext(CommentContext)

    const [comments, setComments] = useState([])


    const commentQuery = useQuery(['getComments', commentId], async () => {
        const response = await Axios.get(`/post/get_post_comments/${post.id}`)
        setComments(response?.data?.comments)
        return response?.data?.comments
    })

    useEffect(() => {
        if (commentQuery?.data) {
            setCommentLoading(null)

            if (commentId && typeof document != undefined) {

                const thread = document.getElementById(commentId)

                thread?.scrollIntoView({
                    behavior: 'auto',
                    block: 'center',
                    inline: 'center'
                });

                // thread?.style?.background = "yellow";
                // document.getElementById(commentId)?.style.borderColor = "#FAF0C4";
                // document.getElementById(commentId).style.color = "black";

                // thread?.style.color = "black";
            }

            // usee


        }

    }, [commentQuery?.data])



    const [likesCount, setLikesCount] = useState(post?.likes?.length)


    async function storeTraffic() {
        const res = await Axios.post(`/post/storePostTraffic/${router?.query?.slug}`)
        // console.log('storePostTraffic', res?.data)
    }

    useEffect(() => {

        // console.log(router)

        let isMounted = true

        if (isMounted) {
            // console.log('traffic req sending')
            storeTraffic()
        }

        return () => {
            isMounted = false
        }

    }, [])


    const [isLiked, setIsLiked] = useState(false)

    const [liking, setLiking] = useState(false)


    useEffect(() => {

        console.log('auth user id', authUser)


        if (authUser?.id) {

            // console.log('Post Likes', post.likes)

            const hasLike = post?.likes.some(like => like.authorId == authUser?.id)

            console.log('Has Like', hasLike)

            setIsLiked(hasLike ? true : false)
        }

    }, [authUser])


    const sendLikeRequest = async () => {

        const res = await Axios.post(`/post/like/${router?.query?.slug}`)

        console.log('Like Status ', res?.data)

        if (res?.data?.ok) {
            setIsLiked(res?.data?.likeStatus == 'like' ? true : false)
            setLikesCount(res?.data?.likeStatus == 'like' ? likesCount + 1 : likesCount - 1)
        }

        setLiking(false)

    }

    const handleClickLike = () => {

        var isMounted = true

        setLiking(true)

        if (isMounted) {

            if (authUser) {

                sendLikeRequest()

            } else {

                setLiking(false)
                setRedirectUrl(router?.asPath)
                seTitle('পোস্ট এ লাইক দিতে লগইন করুন')
                onOpen()
            }

        }

        return () => {
            isMounted = false
        }

    }

    useEffect(() => {

        setTimeout(() => {
            const commentBox = document?.getElementById(router.query.comment)
            // console.log('commentBox', commentBox)
            commentBox?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            })

        }, 1500)

    }, [router.asPath])

    const { followUser, unFollowUser, isFollowing, isLoading } = useFollowing()


    function postWritter() {
        return <Box>
            <Flex direction={{ base: 'row', md: 'row' }} gap={3}>
                <Box>
                    <Avatar size='md' rounded={'md'} shadow src={post.author.avatar} bg='transparent' name={post.author.displayName} />
                </Box>
                <Box>
                    <Title order={4}><Text noOfLines={1}>{post.author.displayName}</Text></Title>
                    <Text fontSize={'13px'}>{banglaNumber(post.author.posts.length)} টি পোস্ট লিখেছেন</Text>
                </Box>
            </Flex>

            <Box>
                <Box px={0} pt={3} pb={2}>
                    <Text noOfLines={2} fontSize='14px'>{post.author.bio}</Text>
                </Box>

                <Divider mb={2} />

                <Box bg={'blackAlpha.5'} fontSize={'13px'}>
                    {post.author.followers.length > 0 && <Text mb={1} color='blackAlpha.600'>
                        <Text as='span' fontSize={'16px'} fontWeight='bold'>{banglaNumber(post.author.followers.length)}</Text> জন অনুসরন করছে
                    </Text>}
                    <Wrap spacing={2} alignItems='flex-end'>
                        {(post.author.id != authUser?.id) &&
                            <>
                                {isFollowing(post.author.id)
                                    ? <Button isLoading={isLoading} onClick={() => unFollowUser(post.author.id)} size='xs' rounded={'none'} colorScheme={'gray'}>
                                        আনফলো করুণ
                                    </Button>
                                    : <Button isLoading={isLoading} onClick={() => followUser(post.author.id)} size='xs' rounded={'none'} colorScheme={'blackAlpha'}>
                                        অনুসরণ করুন
                                    </Button>}
                            </>
                        }
                        <Link href={`/blogger/${post.author.id}`}>
                            <Button size='xs' rounded={'none'} colorScheme={'yellow'}>প্রোফাইল দেখুন</Button>
                        </Link>
                    </Wrap>
                </Box>
            </Box>
            {/* <Divider my={1} /> */}
        </Box>
    }

    return (
        <HomeLayout
            title={post ? post.title + ' | ' + siteName : 'পোষ্ট পাওয়া যায়নি!'}
            image={post?.image || imageUrl}
            url={siteUrl + router.asPath}
            description={post && truncate(post.content, 270, {
                stripTags: true,
            })}
        >

            {ok ?

                <LayoutColumn
                    // leftColumnWidth={26}
                    rightSide={<></>}
                    leftSide={<Box>

                        <Show above='md'>
                            <Box w='full' mb={5}>

                                <Box bg='blackAlpha.50' p={2}>
                                    <Title order={5}>পোস্টটি লিখেছেন</Title>
                                </Box>

                                <Box py={4} px={2}>
                                    {postWritter()}
                                </Box>

                            </Box>
                        </Show>



                        <Box w='full' bg='' mb={5}>

                            <Box bg='blackAlpha.50' p={2}>
                                <Title order={5}>লেখকের অন্যান্য পোস্ট</Title>
                            </Box>


                            {post.author?.posts?.length > 1 ?
                                post.author?.posts.map((item, index) => {
                                    if (item.id != post.id) {
                                        return <SidebarPostCard
                                            key={index}
                                            title={item.title}
                                            image={item.image}
                                            content={item.content}
                                            createdAt={item.publishedAt}
                                            slug={item.id}
                                            states={{
                                                read: item.views?.length,
                                                comment: item.comments?.length,
                                                like: item.likes?.length
                                            }}
                                            author={{
                                                name: 'লিমন লস্কর',
                                                image: ''
                                            }}
                                        />
                                    }
                                }) : <Center py={3}>
                                    <Text>আর পাওয়া যায়নি</Text>
                                </Center>}


                        </Box>


                    </Box>}
                    rightColumnWidth={15}
                >

                    <Box mb={5} px={{ base: 0, md: 5 }}>

                        <Box >

                            <Box py={2} fontWeight='bold' rounded='sm' borderBottom={'2px'} borderColor='blackAlpha.100'>
                                <Heading as={'h1'} size='lg' fontWeight={'black'}>{post?.title} {post.postType == 'multiStep' && `(পর্ব-${banglaNumber(post?.part || 1)})`}</Heading>
                            </Box>

                            <Box py={2} mb='2'>
                                <Text color='blackAlpha.600'>{formatDate(post?.createdAt)}</Text>
                            </Box>

                            <Box p={2} bg='blackAlpha.50'>
                                <Flex direction={{ base: 'column', lg: 'row' }} gap={3} alignItems={{ base: 'start', lg: 'center' }}>
                                    <Text color='blackAlpha.500'>পোস্টটি শেয়ার করুন </Text>
                                    <SocialShareButtons link={router.asPath} />
                                </Flex>
                            </Box>

                            {post.image ? <Center w={'full'} py={4} mb={1}>
                                <Image w='full' maxH='500px' rounded='lg' objectFit={'cover'} shadow='md' src={post.image} alt={post?.title} />
                            </Center> : <Box my={4} />}

                            <Box
                                // mb={6}
                                as='article'
                                color={'gray.700'}
                                textAlign={'justify'}
                                fontSize={{ base: '18px', md: '19px' }}
                                lineHeight={{ base: '25px', md: '27px' }}
                                // fontWeight={'semibo'}
                                letterSpacing='-.2px'
                                dangerouslySetInnerHTML={{ __html: post?.content }}
                            >
                            </Box>

                            <Box my={8} />

                            <Box px={0} py={1}>
                                <Flex alignItems={'center'} justify='space-between'>
                                    <Text whiteSpace={'nowrap'} fontSize={'14px'} letterSpacing='-.2px' color={'gray.400'} fontWeight='normal'>সর্বশেষ এডিট  - {formatDate(post.createdAt)}</Text>

                                    {authUser?.id == post.author.id && <Link href={`/editor/${post.id}?editorStatus=update`}>
                                        <Text whiteSpace={'nowrap'} mr={2} cursor='pointer' fontSize={'13px'} letterSpacing='-.2px' color={'blue.300'} fontWeight='normal'>এডিট করুন</Text>
                                    </Link>}
                                </Flex>
                            </Box>


                            <Divider borderColor={'gray.200'} />


                            <Box px={0} py={5} bg='blacAlpha.50'>

                                <Flex gap={5} direction={{ base: 'column', lg: 'row' }} justify='space-between' alignItems={'start'}>


                                    <Flex gap={3} justify='flex-start' alignItems={'start'}>
                                        <Flex whiteSpace={'nowrap'} alignItems={'center'} gap={1} color={'gray.500'}>
                                            <FcReading color='' size='18px' />
                                            <Text as={'span'} fontWeight={'black'} fontSize='16px'>
                                                {banglaNumber(post.views.length)}
                                            </Text>
                                            <Text fontSize={'15px'} fontWeight='black'>জন পড়েছেন</Text>
                                        </Flex>

                                        <Divider orientation='vertical' borderColor={'gray.300'} h='25px' />

                                        <Flex alignItems={'center'} gap={1} color={'linkedin.700'}>
                                            <Icon as={AiFillLike} color='orange.300' fontSize='18px' />
                                            <Text as={'span'} fontSize='16px' fontWeight={'black'}>
                                                {banglaNumber(likesCount)}
                                            </Text>
                                            <Text fontSize={'15px'} fontWeight='black'>লাইক</Text>
                                        </Flex>
                                    </Flex>


                                    {/* <Box w={'60px'} /> */}

                                    <Flex justify={'end'} >
                                        <Button colorScheme={isLiked ? 'gray' : 'gray'} onClick={handleClickLike} isLoading={liking} shadow='md' leftIcon={isLiked ? <BsHandThumbsDown size={20} /> : <BsHandThumbsUp size={20} />} rounded='md' size='md'>
                                            <Text as={'span'} fontSize='16px' fontWeight={'normal'}>{isLiked ? 'আন লাইক ' : 'লাইক দিন'}</Text>
                                        </Button>
                                    </Flex>


                                </Flex>

                            </Box>

                        </Box>

                        <Show below='md'>
                            <Box px={{ base: 0, md: 3 }} py={6}>
                                <SectionTitle py={1} mb={5} title='পোস্টটি লিখেছেন' />
                                {postWritter()}
                            </Box>
                        </Show>

                        <Flex id='scroll-tot-comment' pt={5} gap='5' alignItems={'center'} mb={4}>
                            <SectionTitle showBorder={false} icon={<FcComments color='' size='24px' />} py={0} mb={0} title={!comments?.length ? 'কোন মন্তব্য নেই' : `${banglaNumber(comments?.length)} টি মন্তব্য`} />
                            {comments?.length > 5 &&
                                <Button
                                    onClick={() => {
                                        document?.getElementById('main-comment-editor').scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'center',
                                            inline: 'center'
                                        })
                                    }}
                                    size={'sm'}
                                >
                                    মন্তব্য করুন
                                </Button>}
                        </Flex>

                        {comments?.length > 0 && <Box w='full'>

                            {comments.map((comment, index) => {

                                return <Box key={index} w='full' mb={5} rounded={'md'} px={3} pt={2} border='1px' borderColor='gray.200'>

                                    <BlogCommentThread
                                        openOnReply={true}
                                        showChildrenButton={true}
                                        replyType='post'
                                        shouldReply={true}
                                        key={index}
                                        comment={comment}
                                    />

                                    {(commentLoading == comment.id) &&
                                        <Center py={2}>
                                            <Spinner />
                                        </Center>
                                    }

                                    { comment.childs.map((comment, index) =>
                                        <Box key={index} ml={1} rounded={'md'} p={3} mt={1} mb={3} border='1px' borderColor='gray.200' bg='blue.50'>

                                            {/* Show 1st children */}
                                            <BlogCommentThread
                                                replyType='comment'
                                                shouldReply={true}
                                                comment={comment}
                                            />

                                            {(commentLoading == comment.id) &&
                                                <Center py={2}>
                                                    <Spinner />
                                                </Center>
                                            }


                                            {comment.childs.length > 0 && comment.childs.map((comment, index) =>

                                                <Box key={index} w='full' ml={1} rounded={'md'} p={3} mt={3} mb={2} border='1px' borderColor='gray.200' bg='whiteAlpha.700'>

                                                    {(commentLoading == comment.id) &&
                                                        <Box>
                                                            <Spinner />
                                                        </Box>
                                                    }

                                                    {/* Show 2nd children */}
                                                    <BlogCommentThread
                                                        replyType='comment'
                                                        comment={comment}
                                                    />

                                                </Box>
                                            )}

                                        </Box>
                                    )}

                                </Box>

                            })}

                        </Box>}

                        <Box pb={10} pt={comments?.length ? 10 : 0}>

                            {comments?.length > 0 && <Box p={1}>
                                <SectionTitle mb={1} showBorder={false} icon={<Edit size='24px' />} py={0} title={!comments?.length ? 'প্রথম মন্তব্যটি করুন' : 'মন্তব্য করুন'} />
                            </Box>}

                            <Box mb={2} id='main-comment-editor'>
                                <CommentInput key={authUser} replyTo='post' id={post?.id} user={authUser} />
                            </Box>

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