import { Avatar, Box, Button, Flex, Icon, Image, Input, Menu, MenuButton, MenuItem, MenuList, Show, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { BellRinging, ChevronDown, Heart, Lock, Login, Logout, Menu2, Pencil, Power, User, UserCircle } from 'tabler-icons-react'
import SectionContainer from '../../../Components/Common/SectionContainer'
import { FaBell, FaEnvelope, FaPencilAlt } from 'react-icons/fa'
import { Affix } from '@mantine/core'
import { AuthModalContext } from '../../../Contexts/AuthModalContext'
import { AuthContext } from '../../../Contexts/AuthContext'
import { useRouter } from 'next/router'
import DesktopSearchbar from '../../../Components/Header/DesktopSearchbar'
import SiteLogoDesktop from '../../../Components/Common/SiteLogoDesktop'
import { setRedirectUrl } from '../../../Helpers/cookieHelper'
import useUser from '../../../Hooks/useUser'
import Link from 'next/link'
import MobileSidebarDrawer from '../../Common/MobileSidebarDrawer'
import SiteLogoMobile from '../../../Components/Common/SiteLogoMobile'

export default function TopBar() {

    const router = useRouter()

    const { onOpen, seTitle } = useContext(AuthModalContext)

    const { authUser, isLoading, hasUser, isError, error, logoutUser } = useUser()

    const handleClickWriteBlog = () => {

        if (authUser) {
            router.push('/write')
        }

        else {
            setRedirectUrl('/write')
            seTitle('ব্লগ লিখতে লগইন করা আবশ্যক')
            onOpen()
        }
    }



    // console.log('Topbar Auth User ', authUser)

    return (

        <Box w='full' h='70px'>
            <Affix position={{ top: 0, right: 0, left: 0 }}>
                <SectionContainer as='header' px={0}>
                    <Box bg={'white'} px={3} borderBottom='2px' roundedBottom={{ base: 'none', md: 'none' }} borderColor={'gray.200'} shadow='sm'>
                        <Flex alignItems={'center'} justify={'space-between'} gap={5}>

                            <Show above='md' gap={3}>
                                <SiteLogoDesktop />
                            </Show>


                            <Show below='md' gap={3}>
                                <SiteLogoMobile />
                            </Show>

                            <Show above='xl'>
                                <Box flex={1}>

                                    <DesktopSearchbar />

                                </Box>

                            </Show>

                            <Flex alignItems={'center'} justify={'space-between'} gap={{ base: 3, md: 5 }}>

                                <Flex alignItems={'center'} gap={{ base: '0.5px', md: 2 }}>
                                    <Menu>
                                        <MenuButton size={{ base: 'md', md: 'md' }} as={Button} bg={{ base: 'blackAlpha.50', md: 'transparent' }} _hover={{ bg: { md: 'transparent' } }} _active={{ bg: { md: 'blackAlpha.100' } }} roundedLeft={{ base: 'lg', md: 'full' }} roundedRight={{ base: 'none', md: 'full' }} >
                                            <Flex alignItems={'center'} gap={1}>
                                                <FaBell size={20} /> <Show above='lg'><Text>নোটিফিকেশন</Text></Show>
                                            </Flex>
                                        </MenuButton>
                                        <MenuList rounded='none'>
                                            <MenuItem>Download</MenuItem>
                                            <MenuItem>Create a Copy</MenuItem>
                                            <MenuItem>Mark as Draft</MenuItem>
                                            <MenuItem>Delete</MenuItem>
                                            <MenuItem>Attend a Workshop</MenuItem>
                                        </MenuList>
                                    </Menu>

                                    <Button size={{ base: 'md', md: 'md' }} onClick={handleClickWriteBlog} rounded={{ base: 'none', md: 'full' }} bg={{ base: 'blackAlpha.50', md: 'yellow.400' }} color={'blackAlpha.900'} colorScheme={{ base: 'blackAlpha', md: 'yellow' }}>
                                        <Flex alignItems={'center'} gap={1}>
                                            <Pencil size={20} /> <Show above='md'><Text>নগরশৈলীতে লিখুন</Text></Show>
                                        </Flex>
                                    </Button>


                                    {authUser ? <Menu>
                                        <MenuButton as={Button} size={{ base: 'md', md: 'md' }} px={20} bg={{ base: 'blackAlpha.50', md: 'transparent' }} _hover={{ bg: { md: 'transparent' } }} _active={{ bg: { md: 'blackAlpha.50' } }} roundedLeft={{ base: 'none', md: 'full' }} roundedRight={{ base: 'lg', md: 'full' }} colorScheme={'gray'} rightIcon={<ChevronDown size={16} />} gap={0}>
                                            <Avatar size={'xs'} name={authUser.displayName} src={authUser.avatar} />
                                        </MenuButton>
                                        <MenuList rounded='none' zIndex={9999}>
                                            <MenuItem icon={<User />}>প্রোফাইল</MenuItem>
                                            <MenuItem icon={<Pencil />}>আমার লিখাসমূহ</MenuItem>
                                            <MenuItem icon={<Heart />}>আমার পছন্দ তালিকা</MenuItem>
                                            <MenuItem onClick={logoutUser} icon={<Power />}>লগ-আউট করুন</MenuItem>
                                        </MenuList>
                                    </Menu> 
                                    : !isLoading && <Menu>
                                        <MenuButton as={Button} size={{ base: 'md', md: 'md' }} px={20} bg={{ base: 'blackAlpha.50', md: 'transparent' }} _hover={{ bg: { md: 'transparent' } }} _active={{ bg: { md: 'blackAlpha.50' } }} roundedLeft={{ base: 'none', md: 'full' }} roundedRight={{ base: 'lg', md: 'full' }} colorScheme={'gray'}>
                                            <Flex alignItems={'center'} gap={'1px'}>
                                                <Icon as={UserCircle} fontSize={20} color='gray.700' />
                                                <ChevronDown size={16} color='gray' />
                                            </Flex>
                                        </MenuButton>
                                        <MenuList rounded='none' zIndex={9999}>
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
                    </Box>
                </SectionContainer>
            </Affix>
        </Box>

    )
}
