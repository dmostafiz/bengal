import { Box, Button, Center, Divider, Flex, Image, Input, InputGroup, InputRightElement, Text, VStack } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Search } from 'tabler-icons-react'
import AuthWrapperLoginFrom from '../../Components/Auth/AuthWrapperLoginFrom'
import BlogPanel from '../../Components/Common/BlogPanel'
import useInitialBlogWriting from '../../Hooks/useInitialBlogWriting'
import HomeLayout from '../../Layouts/HomeLayout'
import LayoutColumn from '../../Layouts/HomeLayout/LayoutColumn'
import AuthWrapper from '../../Wrappers/AuthWrapper'

const draftPosts = [
    {
        title: "ফলের নাম না বলায় পুরো বাজারের ফল ট্রাক ভরে মায়ের জন্য নিয়ে এলেন ডিপজল",
        image: 'https://s3.amazonaws.com/somewherein/pictures/balchirabongal/balchirabongal-1664883109-9202d32_xlarge.jpg'
    },

    {
        title: "বান্দুরা রানী পবিত্র জপমালা গীর্জা",
        image: 'https://s3.amazonaws.com/somewherein/pictures/ayena/ayena-1664876247-6f7b737_xlarge.jpg'
    },
    {
        title: "রাম ও কৃষ্ণ - মানুষের কাছে পাঠানো নবী ছিলেন?",
        image: 'https://s3.amazonaws.com/somewherein/pictures/sherzatapon/sherzatapon-1665287090-be03f99_xlarge.jpg'
    },
    {
        title: "জনপ্রতিনিধিদের জবাবদিহিতাহীন এই সংস্কৃতি আরও কত বছর চলবে?",
        image: 'https://s3.amazonaws.com/somewherein/pictures/SabbirShakil666/SabbirShakil666-1664873600-089caf6_xlarge.jpg'
    },
];




export default function drafted_posts() {

    const router = useRouter()

    const { redirectToNewPostEditor } = useInitialBlogWriting()
    

    return (
        <HomeLayout>

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

                                <Box py={3}>
                                    <Box maxH={'350px'} overflowY={'auto'}>

                                        {draftPosts.length ? draftPosts.map((post, index) => <Flex
                                            key={index}
                                            p={2}
                                            mb={1}
                                            alignItems={'center'}
                                            gap={2}
                                            bg='white'
                                        >
                                            <Box w='100px'>
                                                <Image src={post.image} />
                                            </Box>
                                            <Box flex={1}>
                                                <Title order={6}><Text noOfLines={1}>{post.title}</Text></Title>
                                                <Text noOfLines={2} fontSize={{ base: '12px', md: '14px' }} >আরবি জমজমা এবং ফারসি জামেদ মিলে তৈরি হয়েছে বাংলা ভাষার শব্দ জমজমাট।</Text>
                                                <Text color='blackAlpha.500' fontSize={{ base: '10px', md: '11px' }} noOfLines={1}>সর্বশেষ আপডেট ~ ১৫ই জানুয়ারী, ২০২২</Text>
                                            </Box>

                                            <Box>
                                                <Button>লেখা চালিয়ে যান</Button>
                                            </Box>

                                        </Flex>
                                        ) : <Center py={5}>
                                            <VStack>
                                                <Text>কোন খসড়া পোস্ট পাওয়া যায়নি</Text>
                                            </VStack>
                                        </Center>}
                                    </Box>


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
