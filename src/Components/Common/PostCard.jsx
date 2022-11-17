import { Avatar, Badge, Box, Button, Center, Flex, Icon, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Show, Stack, Text, useBreakpoint, Wrap } from '@chakra-ui/react'
import { Title, Tooltip } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import banglaNumber from '../../Helpers/banglaNumber'
import formatDate from '../../Helpers/formatDate'
import PostTrancate from './PostTrancate'
import { BsArrowRightShort, BsSave2 } from 'react-icons/bs'
import { VscReport } from 'react-icons/vsc'
import { FcReading } from 'react-icons/fc'
import { HiChevronDown } from 'react-icons/hi'
import AuthorHoverCard from './AuthorHoverCard'
import { BiCommentDetail, BiLike } from 'react-icons/bi'
import useOnlineUser from '../../Hooks/useOnlineUser'
import { AlignJustified, Pencil } from 'tabler-icons-react'
import usePostAction from '../../Hooks/usePostAction'
import useUser from '../../Hooks/useUser'
// import { ThumbUpOff } from 'tableicons-react'

export default function PostCard({ id, title, image, content, createdAt, postType, parent, postPart, childs, states, author, slug, categories, authorCard = true }) {

    const { savePost, isPostSaved } = usePostAction()

    const { authUser } = useUser()

    return (
        <Flex direction={'column'} justify='space-between' flex={1} border={{ base: '0px', md: '0px', lg: '0px', xl: '1px' }} borderColor={{ base: 'blackAlpha.100', sm: 'blackAlpha.100', md: 'blackAlpha.100', lg: 'blackAlpha.100', xl: 'blackAlpha.100' }} shadow={{ xl: 'sm' }} py={{ base: 0, md: 1, lg: 1, xl: 1 }} px={{ base: 0, md: 1, lg: 1, xl: 3 }} w='full' rounded='xl'  mb={3}>

            {/*  Card Header  */}
            <Box borderBottom='1px' borderColor='blackAlpha.200' mb={2} pb={2}>

                <Flex justify={'space-between'} alignItems='center' borderColor='blackAlpha.200'>

                    <Flex gap={5} alignItems='center'>

                        <Box pt={{ lg: 2 }}>
                            <Link href={`/blog/${slug}`}>
                                <a href={`/blog/${slug}`}>
                                    <Tooltip withArrow label={title}>
                                        <Title order={3}><Text noOfLines={1} lineHeight={{ base: 1.2, lg: 1.3 }} color='gray.700'>{title}</Text></Title>
                                    </Tooltip>
                                </a>
                            </Link>
                        </Box>
                    </Flex>

                    <Flex gap={3} alignItems='center'>
                        {postType == 'multiStep' && <Menu>
                            <MenuButton as={Button} leftIcon={<AlignJustified size={'18'} />} rounded='full' colorScheme='red' size='xs' variant='outline'>
                                পর্ব - {banglaNumber(postPart)}
                            </MenuButton>
                            <MenuList fontSize={'14px'} shadow='lg' w={'50px'}>
                                {parent?.childs?.length > 0 && parent?.childs?.map((stepPost, index) => {
                                    if (stepPost.id != id) {
                                        return <Link key={index} href={`/blog/${stepPost.id}`}>
                                            <MenuItem disabled={stepPost.id == id}>পর্ব - {banglaNumber(stepPost.part)}</MenuItem>
                                        </Link>
                                    }
                                })}

                                {/* <MenuItem>Create a Copy</MenuItem> */}
                            </MenuList>
                        </Menu>
                        }
                        <Menu>
                            <MenuButton as={IconButton} icon={<HiChevronDown size={'18'} />} color='blackAlpha.700' size='xs' variant='unstyled' rounded='sm' />
                            <MenuList fontSize={'14px'} shadow='lg'>

                                {(!isPostSaved(id) && author.id != authUser?.id) && <MenuItem onClick={() => savePost(id)} icon={<BsSave2 size={14} />}>সংরক্ষণে রাখুন</MenuItem>}

                                {author.id == authUser?.id && <Link href={`/editor/${id}?editorStatus=update`}>
                                    <MenuItem icon={<Pencil size={14} />}>এডিট করুন</MenuItem></Link>}

                                {author.id != authUser?.id && <MenuItem icon={<VscReport size={14} />}>রিপোর্ট করুণ</MenuItem>}

                                {/* <MenuItem>Create a Copy</MenuItem> */}
                            </MenuList>
                        </Menu>
                    </Flex>

                </Flex>

            </Box>

            <Flex gap={{ base: 0, xl: 5 }} justifyItems='center' py={{ xl: 2 }} w='full' direction={{ base: 'column', md: 'column', lg: 'column', xl: 'row' }} >

                <Box w={{ base: 'full', md: 'full', lg: 'full', xl: '190px' }} >

                    {image && <>
                        <Show above='lg'>
                            <Flex
                                direction={'column'}
                                mb={3}
                                bgImage={image}
                                w={{ base: 'full', lg: 'full' }}
                                h={{ base: '250px', sm: '350px', md: '350px', xl: '140px' }}
                                rounded='xl'
                                bgPos='center'
                                bgSize='cover'
                                justify={'end'}
                            >
                                <Box px={2} py={'1px'} h={'45px'} bg='whiteAlpha.700' roundedBottom={'lg'} backdropFilter='auto' backdropBlur='5px'>
                                    <Wrap mt={2} spacingY={0} spacingX={2} alignItems='center' mb={2}>
                                        <Flex gap={2} alignItems='start'>
                                            {/* <Avatar size='xs' src={author?.avatar} /> */}
                                            <Stack direction={'column'} spacing={-1}>
                                                <AuthorHoverCard color='blackAlpha.900' author={author} />
                                                <Text fontSize={{ base: '15px', xl: '13px' }} letterSpacing='-0.8px' color={'blackAlpha.600'} >
                                                    {formatDate(createdAt)}
                                                </Text>
                                            </Stack>
                                        </Flex>
                                    </Wrap>
                                </Box>
                            </Flex>
                        </Show>
                        <Show below='sm'>
                            <Wrap mt={2} spacingY={-1} spacingX={2} alignItems='center' mb={2}>
                                <Flex gap={1} alignItems='center'>
                                    <Text color='gray.700' fontSize={'15px'}>লিখেছেন</Text>
                                    <AuthorHoverCard color='gray.500' author={author} />
                                </Flex>
                                <Text
                                    fontSize={{ base: '15px', xl: '13px' }}
                                    letterSpacing='-0.8px'
                                    color={'blackAlpha.600'} >
                                    {formatDate(createdAt)}
                                </Text>
                            </Wrap>
                        </Show>
                    </>
                    }

                    {!image && <Wrap mt={2} spacingY={0} spacingX={2} alignItems='center' mb={2}>
                        <Flex gap={1} alignItems='center'>
                            {/* <Text color='gray.700' fontSize={'15px'}>লিখেছেন</Text> */}
                            <AuthorHoverCard color='gray.500' author={author} />
                        </Flex>

                        <Text fontSize={{ base: '15px', xl: '13px' }} letterSpacing='-0.8px' color={'blackAlpha.500'} >
                            {formatDate(createdAt)}
                        </Text>
                    </Wrap>}

                </Box>

                <Box flex='1' color={{ base: 'blackAlpha.600', md: 'gray.600' }} lineHeight={{ base: '22px', md: '23px' }} fontSize={{ base: '17px', md: '18px' }} w='full' pb={{ base: 2, lg: 3 }}>
                    <PostTrancate
                        image={image}
                        char={65}
                        content={content}
                    />
                </Box>

            </Flex>


            {/* Card Footer  */}
            <Box w='full' pb={{ base: 2, xl: 1 }} borderTop={'1px'} borderBottom={{ base: '1px', xl: '0px' }} borderColor='blackAlpha.200' color='blackAlpha.600' pt={2} fontSize='15px' fontWeight={'500'}>
                <Flex gap={10} alignItems={'center'} justify='space-between'>

                    {categories?.length > 0 && <Wrap spacing={2}>
                        {categories.map((cat, index) => {
                            return <Link key={index} href={`/category/${cat.id}`}>
                                <Badge
                                    size='xs'
                                    cursor={'pointer'}
                                    variant={'subtle'}
                                    colorScheme='facebook'
                                    rounded='full'
                                    px={2}
                                    py='1.8px'
                                    shadow={'sm'}
                                // fontWeight={'light'}
                                >
                                    {cat.name}
                                </Badge>
                            </Link>
                        })
                        }

                    </Wrap>}

                    <Flex gap={4} alignItems={'center'}>

                        <Tooltip withArrow color={'black'} label={`${banglaNumber(states.read)} জন ব্লগটি পড়েছেন`}>
                            <Flex alignItems={'center'} gap={'2px'} color={'gray.500'}>
                                <FcReading color='' size='16px' />
                                <Text color='facebook.500' as={'span'} fontWeight={'black'} fontSize='14px'>
                                    {banglaNumber(states.read)}</Text>
                            </Flex>
                        </Tooltip>


                        <Tooltip withArrow label={`${banglaNumber(states.like)} জন লাইক দিয়েছেন`} color={'black'}>
                            <Flex whiteSpace='nowrap' alignItems={'center'} gap={1}>
                                <Icon as={BiLike} color='facebook.300' fontSize='16px' />
                                <Text as={'span'} color='facebook.500' fontSize='14px' fontWeight={'black'}>{banglaNumber(states.like)}
                                </Text>
                            </Flex>
                        </Tooltip>


                        <Tooltip label={`${banglaNumber(states.comment)} টি মন্তব্য`}>
                            <Flex whiteSpace='nowrap' alignItems={'center'} gap={'5px'} color={'gray.500'}>
                                <Icon withArrow as={BiCommentDetail} color='facebook.300' fontSize='15px' />
                                <Flex gap={'5px'}>
                                    <Text as={'span'} color='facebook.500' fontWeight={'black'} fontSize='14px'>
                                        {banglaNumber(states.comment)}</Text>
                                </Flex>
                            </Flex>
                        </Tooltip>


                        <Link href={`/blog/${slug}`}>
                            <Flex whiteSpace='nowrap' alignItems={'center'} gap={'2px'} fontWeight='normal'>
                                <Text cursor={'pointer'} color='gray.400' as={'span'} fontSize={'14px'} href={`/blog/${slug}`}>
                                    বিস্তারিত
                                </Text>
                                <Icon as={BsArrowRightShort} color='gray.400' fontSize='18px' />
                            </Flex>
                        </Link>
                    </Flex>

                </Flex>
            </Box>
        </Flex>
    )
}
