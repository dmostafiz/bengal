import { Avatar, Box, Button, Center, Divider, Flex, Heading, Icon, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Show, Spacer, Stack, Text, useBreakpoint, VStack, Wrap } from '@chakra-ui/react'
import { HoverCard, Title, Tooltip } from '@mantine/core'
import { IconThumbUp } from '@tabler/icons'
import Link from 'next/link'
import React from 'react'
import { ChevronDown, FileLike, Heart, ThumbUp } from 'tabler-icons-react'
import banglaNumber from '../../Helpers/banglaNumber'
import formatDate from '../../Helpers/formatDate'
import PostTrancate from './PostTrancate'
import { BsArrowRightShort, BsHandThumbsUp } from 'react-icons/bs'
import { FcComments, FcReading } from 'react-icons/fc'
import { AiFillLike } from 'react-icons/ai'
import { FaLongArrowAltRight } from 'react-icons/fa'
import AuthorHoverCard from './AuthorHoverCard'
// import { ThumbUpOff } from 'tableicons-react'

export default function PostCard({ title, image, content, createdAt, states, author, slug, categories, authorCard = true }) {

    const imgBreakPoints = useBreakpoint({
        base: false,
        md: true
    })

    return (
        <Box border='1px' borderColor={'blackAlpha.200'} shadow='md' py={2} px={3} w='full' rounded='lg' overflow={'hidden'} mb={3}>


            {/* <Box my={3} /> */}
            <Box mb={3} pb={2} borderBottom='1px' borderColor={'blackAlpha.200'}>

                <Flex justify={'space-between'} alignItems='center' borderColor='blackAlpha.200'>
                    <Box>
                        <Flex alignItems={'center'} gap={1}>
                            <Avatar opacity={.7} size={'xs'} name={author.displayName} src={author.avatar} />

                            <AuthorHoverCard author={author} />
                        </Flex>
                    </Box>

                    <Menu>
                        <MenuButton as={IconButton} icon={<ChevronDown />} color='blackAlpha.500' size='xs' variant='unstyled'>

                        </MenuButton>
                        <MenuList>
                            <MenuItem>রিপোর্ট করুণ</MenuItem>
                            {/* <MenuItem>Create a Copy</MenuItem> */}
                        </MenuList>
                    </Menu>
                </Flex>
            </Box>

            <Flex direction={{ base: 'column', md: 'column', lg: 'row' }} gap={image ? { base: 2, md: 3 } : 0}>


                <Flex direction={{ base: 'column', md: 'column', lg: 'column' }} gap={{ base: 2, lg: 0 }} w={{ base: 'full', md: '240px', lg: '240px' }}>


                    {image ?
                        <Box opacity={'.80'} w={{ base: 'full', lg: 'full' }} h={{ base: '220px', lg: '150px' }} shadow='md' rounded='md'
                            overflow={'hidden'}
                            // bgImage={image}
                            objectFit='cover'
                            bgPos='center' bgSize='cover'>
                            <Link href={`/blog/${slug}`}>
                                <a href={`/blog/${slug}`}>
                                    <Center h='full' w='full' >
                                        {/* <Show below={'lg'}> */}
                                        <Image title={title} w='full' minH={'full'} objectFit={'cover'} src={image} alt='image' />
                                        {/* </Show> */}
                                    </Center>
                                </a>
                            </Link>
                        </Box>
                        : <></>}

                    <Box flex='1' textAlign={'left'} w='full' bg='.50' p={{ base: '0px', lg: 1 }} mb='2' >

                        <Link href={`/blog/${slug}`}>
                            <a href={`/blog/${slug}`}>
                                <Title order={3}><Text noOfLines={{ base: image ? 1 : 2, lg: image ? 2 : 5 }} lineHeight='1.3' color='gray.700'>{title}</Text></Title>
                            </a>
                        </Link>

                        <Text fontSize={'14px'} letterSpacing='-0.8px' color={'blackAlpha.600'} >
                            {formatDate(createdAt)}
                        </Text>


                        {categories?.length > 0 && <Box pt={2}>
                            <Wrap>

                                {categories.map((cat, index) => <Button
                                    key={index}
                                    size='xs'
                                    variant={'solid'}
                                >

                                    {cat.name}

                                </Button>)}

                            </Wrap>
                        </Box>}

                    </Box>

                </Flex>


                <Box flex='1'>

                    <Box w='full' pb={1} mt={1}>
                        <PostTrancate
                            char={60}
                            content={content}
                        />
                    </Box>


                    <Box w='full' borderTop='1px' borderBottom='0px' borderColor='blackAlpha.200' color='blackAlpha.600' py={1} fontSize='15px' fontWeight={'500'}>
                        <Flex gap={2} justify='space-between' alignItems={'center'}>

                            <Flex gap={4} flex='1' justify='flex-start' alignItems={'center'}>

                                <Tooltip withArrow color={'purple'} label={`${banglaNumber(states.read)} জন ব্লগটি পড়েছেন`}>
                                    <Flex alignItems={'center'} gap={'2px'} color={'gray.500'}>
                                        <FcReading color='' size='18px' />
                                        <Text as={'span'} fontWeight={'black'} fontSize='14px'>
                                            {banglaNumber(states.read)}
                                        </Text>
                                        <Text fontSize={'15px'} fontWeight='normal'> জন</Text>
                                    </Flex>
                                </Tooltip>


                                <Tooltip withArrow label={`${banglaNumber(states.like)} জন লাইক দিয়েছেন`} color={'orange'}>
                                    <Flex whiteSpace='nowrap' alignItems={'center'} gap={1}>
                                        <Icon as={AiFillLike} color='orange.300' fontSize='18px' />
                                        <Text>
                                            <Text as={'span'} fontSize='16px' fontWeight={'normal'}>{banglaNumber(states.like)}</Text> লাইক
                                        </Text>
                                    </Flex>
                                </Tooltip>


                                <Flex whiteSpace='nowrap' alignItems={'center'} gap={'2px'} color={'gray.500'}>
                                    <FcComments color='' size='18px' />
                                    {states.comment ? <Tooltip label={`${banglaNumber(states.comment)} টি মন্তব্য পাওয়া গেছে`}>
                                        <Flex gap={'5px'}>
                                            <Text as={'span'} fontWeight={'black'} fontSize='15px'>
                                                {banglaNumber(states.comment)}
                                            </Text>
                                            <Text fontSize={'15px'} fontWeight='normal'> মন্তব্য</Text>
                                        </Flex>
                                    </Tooltip> : <Text fontSize={'15px'} fontWeight='normal'> মন্তব্য নেই</Text>}

                                </Flex>

                            </Flex>



                            <Link href={`/blog/${slug}`}>
                                <Flex whiteSpace='nowrap' alignItems={'center'} gap={'2px'}>
                                    <Text cursor={'pointer'} color='blue.700' as={'span'} fontSize={'14px'} href={`/blog/${slug}`}>
                                        বিস্তারিত
                                    </Text>
                                    <Icon as={BsArrowRightShort} color='blue.700' fontSize='18px' />
                                </Flex>
                            </Link>

                        </Flex>
                    </Box>


                </Box>


            </Flex>

        </Box>
    )
}
