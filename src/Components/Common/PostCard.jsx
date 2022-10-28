import { Avatar, Box, Button, Center, Divider, Flex, Image, Show, Spacer, Text, useBreakpoint, Wrap } from '@chakra-ui/react'
import { HoverCard, Title } from '@mantine/core'
import { IconThumbUp } from '@tabler/icons'
import Link from 'next/link'
import React from 'react'
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
        <Box border='0px' borderColor={'blackAlpha.50'} rounded='sm' shadow='sm' overflow={'hidden'}>

            <Box w='full' bg='.50'>
                <Link href={`/blog/${slug}`}>
                    <a href={`/blog/${slug}`}>
                        <Title order={3}><Text color='gray.900'>{title}</Text></Title>
                    </a>
                </Link>


                <Box fontSize={'15px'}>
                    <Flex alignItems={'center'} gap={2}>
                        {/* <Avatar shadow={'sm'} src={author.image} size={'md'} name='লিমন লস্কর' /> */}
                        <Box>
                            <Text>
                                {/* <Avatar shadow={'sm'} src={author.image} size={'sm'} name='লিমন লস্কর' /> */}
                                লিখেছেন <HoverCard width={320} shadow="md" withArrow openDelay={0} closeDelay={400}>
                                    <HoverCard.Target>
                                        <Text as='span' fontWeight={'semibold'}>
                                            <a >{author.displayName}</a></Text>
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

            <Divider borderColor={'blackAlpha.200'} mt={2} />

            <Flex direction={{ base: 'column', md: 'column', lg: 'row' }} gap={image ? 3 : 0}>

                {image ? <Box w={{ base: 'full', md: 'full', lg: '150px' }}  rounded='md' overflow={'hidden'} py={0} bgImage={image} bgPos='center' bgSize='cover'>
                    <Center bg='whiteAlpha.500' backdropFilter='blur(7px)' rounded='md' overflow={'hidden'} h='full' w='full'>
                        {/* <Show below={'lg'}> */}
                        <Image maxW='full'h='full' objectFit={'cover'} shadow='sm' src={image} alt='image' />
                        {/* </Show> */}
                    </Center>
                </Box> : <></>}


                <Box flex={1} w='full' textAlign={'justify'}>
                    {/* <Box>
                        <Text noOfLines={'4'} dangerouslySetInnerHTML={{__html: content}} /> <Link href={`/blog/${slug}`}>
                            <a href={`/blog/${slug}`}>বাকিটুকু পড়ুন</a>
                        </Link>
                    </Box> */}

                    <PostTrancate
                        content={content}
                        slug={<>... <Link href={`/blog/${slug}`}>
                            <a href={`/blog/${slug}`}>বাকিটুকু পড়ুন</a>
                        </Link></>}
                    />

                    <Divider borderColor={'blackAlpha.100'} mt={1} />

                    <Box w='full' bg='blackAlpha' py={1} fontSize='12px' fontWeight={'normal'}>
                        <Flex gap={2} justify='space-between' alignItems={'center'}>
                            <Flex gap={2} justify='flex-start' alignItems={'center'}>
                                <Text>{banglaNumber(states.read)} বার পড়া হয়েছে</Text>
                                <Divider orientation='vertical' borderColor={'blackAlpha.50'} h='10px' />
                                <Text>{banglaNumber(states.comment)} টি মন্তব্য</Text>
                            </Flex>

                            <Flex alignItems={'center'} gap={1}>
                                <Text fontSize={'15px'}>{banglaNumber(states.like)}</Text><IconThumbUp size={16} />
                            </Flex>
                        </Flex>
                    </Box>
                </Box>

            </Flex>


        </Box>
    )
}
