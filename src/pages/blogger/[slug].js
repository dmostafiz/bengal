import React, { useEffect, useState } from 'react'
import { Avatar, Badge, Box, Center, Divider, Flex, Hide, Image, Show, Spacer, Table, TableContainer, Tbody, Td, Text, Tr, VStack, Wrap } from '@chakra-ui/react'
import { Blockquote, Title } from '@mantine/core'
import TabContainer from '../../Components/HomePage/TabContainer'
import MainLeftSidebar from '../../Layouts/Common/MainLeftSidebar'
import MainRightSidebar from '../../Layouts/Common/MainRightSidebar'
import SelectedPostsCarousel from '../../Components/HomePage/SelectedPostsCarousel'
import HomeLayout from '../../Layouts/HomeLayout'
import ImageBanner from '../../Layouts/HomeLayout/inc/ImageBanner'
import LayoutColumn from '../../Layouts/HomeLayout/LayoutColumn'
import { useRouter } from 'next/router'
import PostCard from '../../Components/Common/PostCard'
import Sticky from 'react-stickynode'
import SidebarPostCard from '../../Components/Common/SidebarPostCard'
import AuthorPostCard from '../../Components/Common/AuthorPostCard'
import BloggerRightSidebar from '../../Components/blogger/BloggerRightSidebar'
import Axios from '../../Helpers/axiosHelper'
import ComponentLoader from '../../Components/Common/ComponentLoader'
import IconText from '../../Components/Common/IconText'
import formatDate from '../../Helpers/formatDate'
import SectionTitle from '../../Components/Common/SectionTitle'

export default function categoryPosts() {

    const router = useRouter()

    const [blogger, setBlogger] = useState(null)

    const [user, setUser] = useState(null)

    const [loading, setLoading] = useState(true)


    useEffect(() => {

        (
            async () => {
                setBlogger('লিমন লস্কর')

                if (router.query?.slug) {

                    const response = await Axios.get(`/user/blogger/${router.query?.slug}`)

                    if (response?.data?.ok) {
                        setUser(response?.data?.user)
                    }

                    setLoading(false)
                }


            }

        )()

    }, [router])

    return (
        <HomeLayout>

            {(!loading && user)

                ? <LayoutColumn

                    leftSide={<>


                        <Hide below='md'>
                            <Box w='full' px={{ md: 1, lg: 5 }} mb='5' bg={'white'}>
                                <>
                                    <Flex direction={{ md: 'column', lg: 'row' }} alignItems={{ md: 'start', lg: 'start' }} gap={3} mb={1}>
                                        <Avatar rounded={'sm'} bg='transparent' size='lg' src={user?.avatar} name={user?.displayName} />
                                        <Box>
                                            <Title order={3}>{user?.displayName}</Title>
                                            <Text fontSize={'14px'} ml={1} color='blackAlpha.500'>নিবন্ধ - {formatDate(user?.createdAt, 'LL')}</Text>

                                            <Badge bg={'green.400'} variant='solid'>১৪ জন অনুসরন করছে</Badge>

                                        </Box>
                                    </Flex>

                                    <Box flex='1' mb={2}>

                                        <Box py={5} mb={2}>
                                            {/* <Blockquote px={0}> */}
                                            <Text fontSize={'15px'} color={'blackAlpha.800'}>{user?.bio}</Text>
                                            {/* </Blockquote> */}
                                        </Box>
                                    </Box>

                                </>
                                {/* <Divider my={2} /> */}
                            </Box>
                        </Hide>

                        <Box mb={5}>
                            <SectionTitle bg='blackAlpha.50' px={5} showBorder={false} mb={0} order={5} title={`${user?.displayName} এর অন্যান্য তথ্য`} />

                            <TableContainer>
                                <Table size='sm' variant='simple'>
                                    <Tbody>
                                        <Tr>
                                            <Td>লিঙ্গ</Td>
                                            <Td isNumeric>{user?.gender == 'male' ? 'পুরুষ' : user?.gender == 'female' ? 'নাড়ী' : 'অন্যান্য'}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>জন্মস্থান</Td>
                                            <Td isNumeric></Td>
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
                                            <Td isNumeric>২৩৯ টি</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>মন্তব্য করেছেন</Td>
                                            <Td isNumeric>৭৮০ টি</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>মন্তব্য পেয়েছেন</Td>
                                            <Td isNumeric>৭৮০ টি</Td>
                                        </Tr>
                                    </Tbody>

                                </Table>
                            </TableContainer>

                        </Box>

                    </>}

                    rightSide={<></>}
                    // rightColumnWidth={30}
                // rightSide={<MainRightSidebar />}

                >

                    <Box mb={8}>

                        <Show below='md'>
                            <Box w='full' px={0} py={2} mb='5' bg={'white'}>
                                <>
                                    <Flex alignItems='center' gap={3} mb={1}>
                                        <Avatar rounded={'sm'} bg='transparent' size='xl' src={user?.avatar} name={user?.displayName} />
                                        <Box>
                                            <Title order={2}>{user?.displayName}</Title>
                                            <Text fontSize={'14px'} ml={1} color='blackAlpha.500'>নিবন্ধ - {formatDate(user?.createdAt, 'LL')}</Text>

                                            <Badge bg={'green.400'} variant='solid'>১৪ জন অনুসরন করছে</Badge>

                                        </Box>
                                    </Flex>

                                    <Box flex='1' mb={2}>

                                        <Box py={5} mb={2}>
                                            {/* <Blockquote px={0}> */}
                                            <Text fontSize={'15px'} color={'blackAlpha.800'}>{user?.bio}</Text>
                                            {/* </Blockquote> */}
                                        </Box>
                                    </Box>

                                </>
                                {/* <Divider my={2} /> */}
                            </Box>
                        </Show>


                        <SectionTitle title={`${user?.displayName} এর সকল পোস্ট ( ক্রমানুসারে )`} />

                        <VStack gap={5}>

                            {user?.posts?.length > 0 && user?.posts?.map((post, index) => {
                                return <PostCard
                                    key={index}
                                    title={post?.title}
                                    slug={post?.id}
                                    image={post?.image}
                                    content={post?.content}
                                    createdAt={post?.createdAt}
                                    states={{
                                        read: 5,
                                        comment: 3,
                                        like: 3
                                    }}
                                    author={user}
                                    authorCard={false}
                                />
                            })
                            }

                            {!user?.posts?.length && <>
                               <IconText py={5} />
                            </>}

                            <PostCard
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


                            <PostCard
                                title="বয়স শেষ করা বিদ্যালয়ে আমরা..../"
                                // image='https://s3.amazonaws.com/somewherein/pictures/ayena/ayena-1664876247-6f7b737_xlarge.jpg'
                                content='মাত্র এগারো বছর বয়সে ইনভেস্ট শুরু করে সতের বছর বয়সে ৪২ লাখ টাকার মালিক ওয়ারেন বাফেট টাইপ হতে হলে ২৫ বছরে বাপের টাকায় গ্রাজুয়েট কমপ্লিট করে ৩০ বছর পর্যন্ত সরকারি চাকরির পিছনে দৌড়ে হওন যাইবো না,...'
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

                            <PostCard
                                title="রাম ও কৃষ্ণ - মানুষের কাছে পাঠানো নবী ছিলেন?"
                                image='https://s3.amazonaws.com/somewherein/pictures/shaiyan/shaiyan-1664874752-d595450_xlarge.jpg'
                                content='যদি প্রমাণ করা যায় যে- রাম ও কৃষ্ণ ছিলেন মানুষের কাছে প্রেরিত ১ লক্ষ ২৪ হাজার নবীদের মাঝে দুইজন নবী, তাহলে আমাদের মাঝে ঐক্য ফিরে আসবে না? তাতে বাধা কোথায়? ভারতবর্ষের অনেক ইসলামী ব্যক্তিত্ব মনে করেন যে- রাম, কৃষ্ণ এবং শিব ইসলামের প্রেরিত পুরুষ ছিলেন। তেমনই একজন ইসলামী...'
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

                            <PostCard
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
                        </VStack>


                    </Box>


                </LayoutColumn>

                : loading ? <ComponentLoader />

                    : <IconText height={'75vh'} py='200' text='ব্লগার পাওয়া যায়নি' />
            }

        </HomeLayout>
    )
}
