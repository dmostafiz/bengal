import { Avatar, Box, Button, Center, Divider, Flex, Image, Show, Spacer, Text, useBreakpoint, VStack, Wrap } from '@chakra-ui/react'
import { HoverCard, Title } from '@mantine/core'
import { IconThumbUp } from '@tabler/icons'
import Link from 'next/link'
import React from 'react'
import { FileLike, Heart, ThumbUp } from 'tabler-icons-react'
import banglaNumber from '../../Helpers/banglaNumber'
import formatDate from '../../Helpers/formatDate'
import PostTrancate from './PostTrancate'
// import { ThumbUpOff } from 'tableicons-react'

export default function PostCard({ title, image, content, createdAt, states, author, slug }) {

    const imgBreakPoints = useBreakpoint({
        base: false,
        md: true
    })

    return (
        <Box w='full' rounded='sm' overflow={'hidden'}>

            <Box w='full' bg='.50'>
                <Link href={`/blog/${slug}`}>
                    <a href={`/blog/${slug}`}>
                        <Title order={4}><Text color='gray.900'>{title}</Text></Title>
                    </a>
                </Link>


                <Box fontSize={'15px'}>
                    <Flex alignItems={'center'} gap={2}>
                        {/* <Avatar shadow={'sm'} src={author.image} size={'md'} name='লিমন লস্কর' /> */}
                        <Box>
                            <Text fontSize={'13px'} color={'blackAlpha.600'}>
                                {/* <Avatar shadow={'sm'} src={author.image} size={'sm'} name='লিমন লস্কর' /> */}
                                লিখেছেন <HoverCard width={320} shadow="md" withArrow openDelay={0} closeDelay={400}>
                                    <HoverCard.Target>
                                        <Text as='span' color={'blackAlpha.800'}>
                                            {author.displayName}
                                        </Text>
                                    </HoverCard.Target>
                                    <HoverCard.Dropdown p={10}>

                                        <Box bg='blackAlpha.5'>
                                            <Flex direction={{ base: 'row', md: 'row' }} gap={3}>
                                                <Box>
                                                    <Avatar size='md' shadow src={author.avatar} name={author.displayName} />
                                                </Box>
                                                <Box>
                                                    <Title order={4}><Text noOfLines={1}>{author.displayName}</Text></Title>
                                                    <Text fontSize={'12px'}>@{author.userName}</Text>
                                                </Box>
                                            </Flex>

                                            <Box>
                                                <Box px={0} pt={3}>
                                                    <Text noOfLines={2} fontSize='13px'>{author.bio}</Text>
                                                </Box>

                                                <Divider my={1} />

                                                <Box bg={'blackAlpha.5'} fontSize={'13px'}>
                                                    <Text mb={2}><Text as='span' fontSize={'16px'} fontWeight='bold'>১৪</Text> জন অনুসরন করছে</Text>
                                                    <Wrap spacing={2} alignItems='flex-end'>
                                                        <Link href={'/blogger/limon_lashkar'}>
                                                            <Button size='xs' rounded={'none'} colorScheme={'yellow'}>সকল পোস্ট দেখুন</Button>
                                                        </Link>
                                                        <Button size='xs' rounded={'none'} colorScheme={'blackAlpha'}>অনুসরণ করুন</Button>
                                                    </Wrap>
                                                </Box>
                                            </Box>
                                            {/* <Divider my={1} /> */}
                                        </Box>

                                    </HoverCard.Dropdown>
                                </HoverCard>, <Text as='span' fontSize={'13px'}>
                                    {formatDate(createdAt)}
                                </Text>
                            </Text>
                        </Box>
                    </Flex>

                </Box>

            </Box>

            <Box my={3} />

            <Flex direction={{ base: 'column', md: 'column', lg: 'row' }} gap={image ? 3 : 0}>

                {image ? <Box w={{ base: 'full', md: 'full', lg: '150px' }} shadow='sm' rounded='lg' overflow={'hidden'} bgImage={image} bgPos='center' bgSize='cover'>
                    <Center bg='whiteAlpha.700' backdropFilter='blur(5px)' rounded='lg' overflow={'hidden'} h='full' w='full'>
                        {/* <Show below={'lg'}> */}
                        <Image maxW={{base: '70%', md:'full'}} objectFit={'cover'} shadow='sm' src={image} alt='image' />
                        {/* </Show> */}
                    </Center>
                </Box> : <></>}


                <VStack flex={1} w='full' textAlign={'justify'} px={image ? 0 : 2}>
                    {/* <Box>
                        <Text noOfLines={'4'} dangerouslySetInnerHTML={{__html: content}} /> <Link href={`/blog/${slug}`}>
                            <a href={`/blog/${slug}`}>বাকিটুকু পড়ুন</a>
                        </Link>
                    </Box> */}

                    <PostTrancate
                        content={content}
                        slug={<Link href={`/blog/${slug}`}>
                            <a href={`/blog/${slug}`}>বাকিটুকু পড়ুন</a>
                        </Link>}
                    />

                    {/* <Divider borderColor={'blackAlpha.200'} mt={1} /> */}
                    <Box />

                    <Box w='full' borderTop='1px' borderColor='blackAlpha.100' color='blackAlpha.600' py={1} fontSize='13px' fontWeight={'500'}>
                        <Flex gap={2} justify='space-between' alignItems={'center'}>
                            <Flex gap={2} justify='flex-start' alignItems={'center'}>
                                <Text><Text as={'span'} fontSize='17px' fontWeight={'normal'}>{banglaNumber(states.read)}</Text> জন পড়েছেন</Text>
                                <Divider orientation='vertical' borderColor={'blackAlpha.50'} h='10px' />
                                <Text><Text as={'span'} fontSize='17px' fontWeight={'normal'}>{banglaNumber(states.comment)}</Text> টি মন্তব্য</Text>
                            </Flex>

                            <Flex alignItems={'center'} gap={1}>
                                <ThumbUp size={16} />
                                <Text fontSize={'15px'}>
                                <Text as={'span'} fontSize='17px' fontWeight={'normal'}>{banglaNumber(states.like)}</Text> টি লাইক</Text>
                            </Flex>
                        </Flex>
                    </Box>

                </VStack>

            </Flex>


        </Box>
    )
}
