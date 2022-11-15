import { Avatar, AvatarBadge, Box, Button, Center, Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Show } from '@chakra-ui/react'
import React from 'react'
import { ChevronDown, Heart, Lock, LockOpen, Login, Pencil, Power, User, UserCircle } from 'tabler-icons-react'
import SectionContainer from '../../../Components/Common/SectionContainer'
import { Affix } from '@mantine/core'
import DesktopSearchbar from '../../../Components/Header/DesktopSearchbar'
import SiteLogoDesktop from '../../../Components/Common/SiteLogoDesktop'
import useUser from '../../../Hooks/useUser'
import Link from 'next/link'
import MobileSidebarDrawer from '../../Common/MobileSidebarDrawer'
import useOnlineUser from '../../../Hooks/useOnlineUser'
import NotificationPanel from '../../Common/NotificationPanel'
import WritePost from '../../../Components/Header/WritePost'

export default function TopBar() {

    const { authUser, isLoading, hasUser, isError, error, logoutUser } = useUser()

    const { isUserOnline } = useOnlineUser()

    return (

        <Box w='full' h={{ base: '60px', md: '70px', lg: '80px' }}>
            <Affix position={{ top: 0, right: 0, left: 0 }}>
                <SectionContainer as='header' maxW='full' px={0}>
                    <Box h={{ base: '60px', md: '70px', lg: '80px' }} bg={'white'} px={3} borderBottom='2px' roundedBottom={{ base: 'none', md: 'none' }} borderColor={'gray.200'} shadow='sm'>
                        <Center w={'full'} h='full'>
                            <SectionContainer as='header' px={0}>
                                <Flex w='full' alignItems={'center'} justify={'space-between'} gap={{ base: 1, md: 10 }}>

                                    <Box>
                                        <SiteLogoDesktop />
                                    </Box>


                                    <Show above='lg'>

                                        <DesktopSearchbar />

                                    </Show>

                                    <Flex alignItems={'center'} justify={'space-between'} gap={{ base: 0, md: 5 }}>

                                        <Flex alignItems={'center'} gap={{ base: 0, md: 2 }}>

                                            <NotificationPanel />

                                            <WritePost />



                                            {authUser ? <Menu>
                                                <MenuButton as={Button} size={{ base: 'xs', md: 'md' }} px={20} bg={{ base: 'transparent', md: 'transparent' }} _hover={{ bg: { md: 'transparent' } }} _active={{ bg: { md: 'blackAlpha.50' } }} roundedLeft={{ base: 'none', md: 'full' }} roundedRight={{ base: 'lg', md: 'full' }} colorScheme={'gray'} rightIcon={<ChevronDown size={16} />} gap={0}>
                                                    <Avatar size={'xs'} src={authUser.avatar} >
                                                        {isUserOnline(authUser.id) && <AvatarBadge boxSize='1.25em' bg='green.500' />}
                                                    </Avatar>
                                                </MenuButton>
                                                <MenuList shadow={'md'} rounded='none' zIndex={9999} pos={'relative'} top={{ base: '2px', md: '9px' }} width={{ base: '100vw', md: '270px' }}>
                                                    <Link href='/user/profile'>
                                                        <MenuItem icon={<User />}>প্রোফাইল</MenuItem>
                                                    </Link>
                                                    <Link href='/user/post_list'>
                                                        <MenuItem icon={<Pencil />}>আমার ব্লগিং</MenuItem>
                                                    </Link>

                                                    <Link href='/user/saved_posts'>
                                                        <MenuItem icon={<Heart />}>সংরক্ষিত পোস্ট</MenuItem>
                                                    </Link>

                                                    <Link href='/user/change_password'>
                                                        <MenuItem icon={<LockOpen />}>পাসওয়ার্ড পরিবর্তন</MenuItem>
                                                    </Link>
                                                    <MenuItem onClick={logoutUser} icon={<Power />}>লগ-আউট করুন</MenuItem>
                                                </MenuList>
                                            </Menu>
                                                : !isLoading && <Menu>
                                                    <MenuButton as={Button} size={{ base: 'xs', md: 'md' }} px={20} bg={{ base: 'transparent', md: 'transparent' }} _hover={{ bg: { md: 'transparent' } }} _active={{ bg: { md: 'blackAlpha.50' } }} roundedLeft={{ base: 'none', md: 'full' }} roundedRight={{ base: 'lg', md: 'full' }} colorScheme={'gray'}>
                                                        <Flex alignItems={'center'} gap={'0px'}>
                                                            <Icon as={UserCircle} fontSize={24} color='gray.700' />
                                                            <ChevronDown size={16} color='gray' />
                                                        </Flex>
                                                    </MenuButton>
                                                    <MenuList shadow={'md'} rounded='none' zIndex={9999} pos={'relative'} top={{ base: '2px', md: '9px' }} width={{ base: '100vw', md: '270px' }}>
                                                        <Link href={'/auth/login'}>
                                                            <MenuItem icon={<Lock />}>লগইন করুন</MenuItem>
                                                        </Link>
                                                        <Link href={'/auth/create_acc'}>
                                                            <MenuItem icon={<Login />}>নিবন্ধন করুন</MenuItem>
                                                        </Link>
                                                    </MenuList>
                                                </Menu>}
                                        </Flex>

                                        <Show below='md'>
                                            <MobileSidebarDrawer />
                                        </Show>

                                    </Flex>

                                </Flex>
                            </SectionContainer>
                        </Center>

                    </Box>
                </SectionContainer>
            </Affix>
        </Box>

    )
}
