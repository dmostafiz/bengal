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
        <Flex direction={{ base: 'column', md: 'column', lg: 'column', xl: 'row' }} gap={{ base: 1, sm: 1, md: 1, lg: 1, xl: 4 }}>

            <Box w={{ base: 'full', md: 'full', lg: 'full', xl: '240px' }} mt={3}>

                <Box py={2}>
                    <Link href={`/blog/${slug}`}>
                        <a href={`/blog/${slug}`}>
                            <Title order={3}><Text noOfLines={{ base: 1, lg: 2 }} lineHeight='1.3' color='gray.700'>{title}</Text></Title>
                        </a>
                    </Link>
                </Box>

                {image ?
                    <Box mb={2} mt={1} opacity={'.70'} w={{ base: 'full', lg: 'full' }} h={{ base: '250px', sm: '350px', md: '350px', xl: '150px' }} shadow='lg' rounded='md'
                        overflow={'hidden'}
                        // bgImage={image}
                        objectFit='cover'
                        bgPos='center' bgSize='cover'>
                        <Link href={`/blog/${slug}`}>
                            <a href={`/blog/${slug}`}>
                                <Center h='full' w='full'>
                                    {/* <Show below={'lg'}> */}
                                    <Image title={title} w='full' minH={'full'} objectFit={'cover'} src={image} alt='image' />
                                    {/* </Show> */}
                                </Center>
                            </a>
                        </Link>
                    </Box>
                    : <></>}


                <Box py={1} w='full'>
                    <Text fontSize={'15px'} letterSpacing='-0.8px' color={'blackAlpha.600'} >
                        {formatDate(createdAt)}
                    </Text>
                </Box>


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

            <Box flex={1} border={{ base: '0px', md: '0px', lg: '0px', xl: '1px' }} borderColor={{ base: 'blackAlpha.100', sm: 'blackAlpha.100', md: 'blackAlpha.100', lg: 'blackAlpha.100', xl: 'blackAlpha.100' }} shadow={{xl:'md'}} py={2} px={{ base: 0, md: 1, lg: 1, xl: 3 }} w='full' rounded='md' overflow={'hidden'} mb={3}>

                {/* <Box my={3} /> */}
                <Box mb={2} borderColor={'blackAlpha.100'}>

                    <Flex justify={'space-between'} alignItems='center' borderColor='blackAlpha.200'>

                        <Flex alignItems={'center'} gap={1}>
                            <Avatar opacity={.7} size={'xs'} name={author.displayName} src={author.avatar} />
                            <AuthorHoverCard author={author} />
                        </Flex>

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

                <Box>

                    <Box w='full' pb={{base: 1, lg: 3}}>
                        <PostTrancate
                            char={70}
                            content={content}
                        />
                    </Box>


                    <Box w='full' borderTop='0px' borderBottom='0px' borderColor='blackAlpha.100' color='blackAlpha.600' pt={2} fontSize='15px' fontWeight={'500'}>
                        <Flex gap={2} justify='space-between' alignItems={'center'}>

                            <Flex gap={2} flex='1' justify='flex-start' alignItems={'center'}>

                                <Tooltip withArrow color={'purple'} label={`${banglaNumber(states.read)} জন ব্লগটি পড়েছেন`}>
                                    <Flex alignItems={'center'} gap={'2px'} color={'gray.500'}>
                                        <FcReading color='' size='18px' />
                                        <Text as={'span'} fontWeight={'black'} fontSize='14px'>
                                            {banglaNumber(states.read)} জন</Text>
                                    </Flex>
                                </Tooltip>


                                <Tooltip withArrow label={`${banglaNumber(states.like)} জন লাইক দিয়েছেন`} color={'orange'}>
                                    <Flex whiteSpace='nowrap' alignItems={'center'} gap={1}>
                                        <Icon as={AiFillLike} color='orange.300' fontSize='18px' />
                                        <Text as={'span'} fontSize='14px' fontWeight={'black'}>{banglaNumber(states.like)} লাইক
                                        </Text>
                                    </Flex>
                                </Tooltip>


                                <Flex whiteSpace='nowrap' alignItems={'center'} gap={'5px'} color={'gray.500'}>
                                    <FcComments color='' size='16px' />
                                    {states.comment ? <Tooltip label={`${banglaNumber(states.comment)} টি মন্তব্য পাওয়া গেছে`}>
                                        <Flex gap={'5px'}>
                                            <Text as={'span'} fontWeight={'black'} fontSize='14px'>
                                                {banglaNumber(states.comment)} মন্তব্য</Text>
                                        </Flex>
                                    </Tooltip> : <Text fontSize={'14px'} fontWeight='black'> মন্তব্য নেই</Text>}

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
            </Box>
        </Flex>
    )
}
