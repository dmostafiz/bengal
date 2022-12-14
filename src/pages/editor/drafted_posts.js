import { Box, Button, Center, Divider, Flex, Image, Input, InputGroup, InputRightElement, Text, VStack } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Script from 'next/script'
import React, { useEffect, useState } from 'react'
import { Search } from 'tabler-icons-react'
import AuthWrapperLoginFrom from '../../Components/Auth/AuthWrapperLoginFrom'
import BlogPanel from '../../Components/Common/BlogPanel'
import ComponentLoader from '../../Components/Common/ComponentLoader'
import formatDate from '../../Helpers/formatDate'
import useInitialBlogWriting from '../../Hooks/useInitialBlogWriting'
import HomeLayout from '../../Layouts/HomeLayout'
import LayoutColumn from '../../Layouts/HomeLayout/LayoutColumn'
import AuthWrapper from '../../Wrappers/AuthWrapper'


export default function drafted_posts() {

    const router = useRouter()

    const { draftedPosts, redirectToNewPostEditor } = useInitialBlogWriting()

    const [posts, setPosts] = useState([])
    const [draftedLoading, setDraftedLoading] = useState(true)

    useEffect(() => {
        (
            async () => {
                const draftedPost = await draftedPosts()
                setPosts(draftedPost)
                setDraftedLoading(false)
            }
        )()
    }, [])


    return (
        <HomeLayout>

            {/* <Script src="lang/moment/bn-bd" /> */}

            <LayoutColumn

                // leftColumnWidth={32}
                leftSide={<><BlogPanel /> </>}
                rightSide={<></>}

            >
                <AuthWrapper loading={true} component={<AuthWrapperLoginFrom redirectUrl={router.asPath} />}>

                    <Box mb={8}>

                        <Box py={2}>
                            <Title order={3}>খসড়া (ড্রাফট) পোস্ট এর তালিকা</Title>
                        </Box>

                        <Divider mb={4} />

                        <Box mb={5}>

                            <Box w='full' py={{ base: 2, md: 2 }} px={{ base: 2, md: 3 }} bg='blackAlpha.50'>
                                <Box py={2}>
                                    <Title order={5}>যে খসড়া পোস্ট টি চলমান থাকবে <Text as={'span'} fontSize={'12px'}>(সিলেক্ট করুন)</Text></Title>
                                </Box>
                                <InputGroup>
                                    <Input
                                        border={'1px'}
                                        borderColor='blackAlpha.200'
                                        _focus={{ ring: '0', border: '1px', borderColor: 'blackAlpha.300' }}
                                        _hover={{ ring: '0', border: '1px', borderColor: 'blackAlpha.200' }}
                                        bg={'whiteAlpha.700'}
                                        size={'md'}
                                        placeholder='খসড়া পোস্ট অনুসন্ধান করুন'
                                        rightSide='dfd'
                                        type='email'
                                    />

                                    <InputRightElement>
                                        <Search />
                                    </InputRightElement>

                                </InputGroup>

                                <Box py={3} w='full'>
                                    {draftedLoading ? <ComponentLoader py='3' />
                                        :
                                        <Box maxH={'350px'} w='full' overflowY={'auto'}>

                                            {posts.length ? posts.map((post, index) => <Flex
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

                                                    <Box>
                                                        <Link href={`/editor/${post.id}?editorStatus=update`}>
                                                            <Button size={{ base: 'sm', md: 'md' }}>সম্পাদনা করুন</Button>
                                                        </Link>
                                                    </Box>
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
                        </Box>

                        <Box>
                            <Button onClick={async () => await redirectToNewPostEditor()} colorScheme='yellow'>নতুন ব্লগ লিখতে এগিয়ে যান</Button>
                        </Box>

                    </Box>

                </AuthWrapper>

            </LayoutColumn>

        </HomeLayout>
    )
}
