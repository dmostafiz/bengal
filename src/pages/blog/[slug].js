import { Avatar, AvatarGroup, Box, Button, Center, Divider, Flex, HStack, Icon, Image, Show, Text, Tooltip, VStack, Wrap } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { FaFacebook, FaRegHandPeace, FaTwitter } from 'react-icons/fa'
import { BiBookReader } from 'react-icons/bi'
import { FacebookShareButton, FacebookShareCount } from 'react-share'
import { ThumbDown, ThumbUp } from 'tabler-icons-react'
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

import { FcReading } from 'react-icons/fc'
import { AiFillLike } from 'react-icons/ai'
import SocialShareButtons from '../../Components/Common/SocialShareButtons'
import { useState } from 'react'
import { AuthModalContext } from '../../Contexts/AuthModalContext'
import useUser from '../../Hooks/useUser'
import { setRedirectUrl } from '../../Helpers/cookieHelper'
import { BsHandThumbsDown, BsHandThumbsUp } from 'react-icons/bs'

// import CommentInput from '../../Components/Blog/CommentInput'
const CommentInput = dynamic(import('../../Components/Blog/CommentInput'), { ssr: false })


function SingleBlogDetails({ post, ok }) {

    const router = useRouter()

    const { onOpen, seTitle } = useContext(AuthModalContext)

    const { authUser, isLoading, hasUser, isError, error, logoutUser } = useUser()

    async function storeTraffic() {
        const res = await Axios.post(`/post/storePostTraffic/${router?.query?.slug}`)
        // console.log('storePostTraffic', res?.data)
    }

    const [likesCount, setLikesCount] = useState(post?.likes?.length)

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
                        <Button size='xs' rounded={'none'} colorScheme={'blackAlpha'}>অনুসরণ করুন</Button>
                        <Button size='xs' rounded={'none'} colorScheme={'yellow'}>প্রোফাইল দেখুন</Button>
                    </Wrap>
                </Box>
            </Box>
            {/* <Divider my={1} /> */}
        </Box>
    }

    return (
        <HomeLayout>

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


                            <SidebarPostCard
                                title="বান্দুরা রানী পবিত্র জপমালা গীর্জা"
                                image='https://s3.amazonaws.com/somewherein/pictures/ayena/ayena-1664876247-6f7b737_xlarge.jpg'
                                content='ঢাকা থেকে মাত্র ১ ঘন্টা ৩০ মিনিটের দূরর্ত্বে নবাবগঞ্জে খ্রীষ্টান আদিনিবাস। এই নাবাগঞ্জে রয়েছে ধর্মীয় বিচিত্রতা ও সহবস্থান। রয়েছে প্রায় চারশ বছরের পুরান ভাঙ্গা মসজিদ ও প্রায় ২৪০ বছরের পূরান  "রানী পবিত্র জপমালা গীর্জা" যা বান্দুরা গীর্জা নামেও বহুল পরিচিত...'
                                createdAt='০৪ ঠা অক্টোবর, ২০২২ বিকাল ৫:৩৩'
                                states={{
                                    read: 5,
                                    comment: 3,
                                    like: 3
                                }}
                                author={{
                                    name: 'লিমন লস্কর',
                                    image: ''
                                }}
                            />


                            <SidebarPostCard
                                title="ফলের নাম না বলায় পুরো বাজারের ফল ট্রাক ভরে মায়ের জন্য নিয়ে এলেন ডিপজল"
                                image='https://s3.amazonaws.com/somewherein/pictures/balchirabongal/balchirabongal-1664883109-9202d32_xlarge.jpg'
                                content='পর্দায় যেমনই থাকুক না কেন, বাস্তব জীবনে হিরোর ভূমিকায় দেখা গেছে তাকে। বিভিন্ন সময়ে ডিপজলের সেবামূলক কাজের কথাও উঠে আসে। তবে তিনি তার মাকে প্রচন্ড ভালোবাসতেন। তার কাছের অনেকেই এমন কথা বলেন। কমেডি অভিনেতা জ্যাকি আলমগীর জানালেন, ডিপজল সাহেব প্রচন্ড মা ভক্ত। মায়ের প্রতি ডিপজলের ভালোবাসার কথা জানিয়ে জ্যাকি...'
                                createdAt='০৪ ঠা অক্টোবর, ২০২২ বিকাল ৫:৩৩'
                                states={{
                                    read: 5,
                                    comment: 3,
                                    like: 3
                                }}
                                author={{
                                    name: 'লিমন লস্কর',
                                    image: ''
                                }}
                            />


                            <SidebarPostCard
                                title="জনপ্রতিনিধিদের জবাবদিহিতাহীন এই সংস্কৃতি আরও কত বছর চলবে?"
                                image='https://s3.amazonaws.com/somewherein/pictures/SabbirShakil666/SabbirShakil666-1664873600-089caf6_xlarge.jpg'
                                content='এদেশের কনস্টিটিউশন অনুযায়ী পাঁচ বছর পরপর ভোটের মাধ্যমে জনপ্রতিনিধি, সরকার গঠন করার নিয়ম । কিন্তু পুরো পাঁচ বছর কেটে গেলেও এদেশের সব এলাকাতে জনপ্রতিনিধি আর জনতার মুখোমুখি কোনো সেমিনার/সিম্পোজিয়াম/প্রোগ্রাম করা হয়? সোজাসাপ্টা উত্তর আসবে, ‘না’ । কোনো জবাবদিহিতা আছে? উত্তর হবে, ‘না’ । ...'
                                createdAt='০৪ ঠা অক্টোবর, ২০২২ বিকাল ৫:৩৩'
                                states={{
                                    read: 5,
                                    comment: 3,
                                    like: 3
                                }}
                                author={{
                                    name: 'লিমন লস্কর',
                                    image: ''
                                }}
                            />
                        </Box>

                    </Box>}
                    rightColumnWidth={15}
                >

                    <Box mb={5} px={{ base: 0, md: 5 }}>

                        <Box >

                            <Box py={2} fontWeight='bold' rounded='sm' borderBottom={'2px'} borderColor='blackAlpha.100'>
                                <Title order={2}>{post?.title}</Title>
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
                            {post.image ? <Center w={'full'} py={4}>
                                <Image w='full' maxH='500px' objectFit={'cover'} shadow='sm' src={post.image} alt='name' />
                            </Center> : <Box my={4} />}

                            <Box
                                as='article'
                                textAlign={'justify'}
                                mb={4}
                                fontSize={{ base: '17px', md: '18px' }}
                                lineHeight={{ base: '25px', md: '27px' }}
                                fontWeight={500}
                                letterSpacing='-.1px'
                                dangerouslySetInnerHTML={{ __html: post?.content }}
                            >
                            </Box>


                            <Box px={0} py={4} bg='blacAlpha.50'>

                                <Flex gap={{ base: 2, lg: 5 }} direction={{ base: 'column', lg: 'row' }} justify='space-between' alignItems={{ base: 'start', lg: 'center' }}>

                                    <Flex flex='1' direction={'column'}>

                                        <Box px={0} py={1}>
                                            <Text fontSize={'15px'} letterSpacing='-.2px' color={'blackAlpha.500'}>সর্বশেষ আপডেট  - {formatDate(post.createdAt)}</Text>
                                        </Box>

                                        <Divider borderColor={'blackAlpha.300'} />

                                        <Flex gap={3} justify='flex-start' alignItems={'start'}>
                                            <Flex alignItems={'center'} gap={1} color={'gray.500'}>
                                                <FcReading color='' size='22px' />
                                                <Text as={'span'} fontWeight={'black'} fontSize='16px'>
                                                    {banglaNumber(post.views.length)}
                                                </Text>
                                                <Text fontSize={'15px'} fontWeight='normal'>জন পড়েছেন</Text>
                                            </Flex>

                                            <Divider orientation='vertical' borderColor={'blackAlpha.300'} h='25px' />

                                            <Flex alignItems={'center'} gap={1} color={'linkedin.700'}>
                                                <Icon as={AiFillLike} color='orange.400' fontSize='22px' />
                                                <Text as={'span'} fontSize='16px' fontWeight={'black'}>
                                                    {banglaNumber(likesCount)}
                                                </Text>
                                                <Text fontSize={'15px'} fontWeight='normal'>লাইক</Text>
                                            </Flex>
                                        </Flex>

                                    </Flex>

                                    <Box w={'60px'} />

                                    <Flex justify={'end'} >
                                        <Button colorScheme={isLiked ? 'gray' : 'blue'} onClick={handleClickLike} isLoading={liking} shadow='md' size='md' leftIcon={isLiked ? <BsHandThumbsDown size={20} /> : <BsHandThumbsUp size={20} />} rounded='full'>
                                            <Text as={'span'} fontSize='16px' fontWeight={'normal'}>{isLiked ? 'আন লাইক ' : 'লাইক '}</Text>
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

                        <Box py={6}>
                            <SectionTitle py={1} title={!post.comments.length ? 'কোন মন্তব্য নেই' : `${post.comments.length} টি মন্তব্য`} />
                        </Box>

                        <Box py={10}>

                            <Box p={1}>
                                <Title order={5}>{!post.comments.length ? 'প্রথম মন্তব্যটি করুন' : 'মন্তব্য করুন'}</Title>
                            </Box>

                            <Box mb={2}>
                                <CommentInput key={authUser} />
                            </Box>

                            <Button size={'sm'} rounded='sm' colorScheme={'green'}>মন্তব্য পোস্ট করুন</Button>

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