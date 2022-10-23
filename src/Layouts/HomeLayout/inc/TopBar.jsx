import { Avatar, Box, Button, Center, Flex, Hide, Icon, Image, Input, Menu, MenuButton, MenuItem, MenuList, Show, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { BellOff, BellRinging, ChevronDown, Heart, Lock, Login, Logout, Menu2, Pencil, Power, User, UserCircle } from 'tabler-icons-react'
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
import { BsPencilSquare } from 'react-icons/bs'
import useInitialBlogWriting from '../../../Hooks/useInitialBlogWriting'

export default function TopBar() {

    const router = useRouter()

    const { onOpen, seTitle } = useContext(AuthModalContext)

    const { authUser, isLoading, hasUser, isError, error, logoutUser } = useUser()

    const { draftedPosts, redirectToNewPostEditor, getRedirectingUrl } = useInitialBlogWriting()

    const handleClickWriteBlog = async () => {

        if (authUser) {

            const checkDraftedPosts = await draftedPosts()

            // console.log( 'checking draftedPosts().length ', checkDraftedPosts.length)

            if (checkDraftedPosts.length > 0) {
                
                router.push('/write/drafted_posts')

            } else {
                await redirectToNewPostEditor()
            }
        }

        else {
            setRedirectUrl('/write/new')
            
            seTitle('ব্লগ লিখতে লগইন করা আবশ্যক')
            onOpen()
        }
    }



    // console.log('Topbar Auth User ', authUser)

    return (

        <Box w='full' h={{ base: '60px', md: '70px', lg: '80px' }}>
            <Affix position={{ top: 0, right: 0, left: 0 }}>
                <SectionContainer as='header' maxW='full' px={0}>
                    <Box h={{ base: '60px', md: '70px', lg: '80px' }} bg={'white'} px={3} borderBottom='2px' roundedBottom={{ base: 'none', md: 'none' }} borderColor={'gray.200'} shadow='sm'>
                        <Center w={'full'} h='full'>
                            <SectionContainer as='header' px={0}>
                                <Flex w='full' alignItems={'center'} justify={'space-between'} gap={{ base: 3, md: 10 }}>

                                    <Box>
                                        <SiteLogoDesktop />
                                    </Box>


                                    <Show above='lg'>

                                        <DesktopSearchbar />

                                    </Show>

                                    <Flex alignItems={'center'} justify={'space-between'} gap={{ base: 3, md: 5 }}>

                                        <Flex alignItems={'center'} gap={{ base: 0, md: 2 }}>
                                            <Menu>
                                                <MenuButton size={{ base: 'sm', md: 'md' }} as={Button} bg={{ base: 'transparent', md: 'transparent' }} _hover={{ bg: { md: 'transparent' } }} _active={{ bg: { md: 'blackAlpha.100' } }} roundedLeft={{ base: 'lg', md: 'full' }} roundedRight={{ base: 'none', md: 'full' }} >
                                                    <Flex alignItems={'center'} gap={1}>
                                                        <FaBell size={20} /> <Show above='lg'><Text>নোটিফিকেশন</Text></Show>
                                                    </Flex>
                                                </MenuButton>
                                                <MenuList shadow={'md'} rounded='none' pos={'relative'}  top={{base: '6px',md:'9px'}} right={0}>
                                                    <Box width={{base: '100vw', md: '350px'}}>
                                                        <Center py={5}>
                                                            <Icon as={BellOff} color={'blackAlpha.500'} fontSize={'26px'} />  <Text color={'blackAlpha.500'}>কোন নোটিফিকেশন পাওয়া যায়নি</Text>
                                                        </Center>
                                                    </Box>
                                                </MenuList>
                                            </Menu>

                                            <Button isDisabled={router.asPath.startsWith('/write')} size={{ base: 'sm', md: 'md' }} onClick={handleClickWriteBlog} rounded={{ base: 'none', md: 'full' }} bg={{ base: 'transparent', md: 'yellow.400' }} color={'blackAlpha.900'} colorScheme={{ base: 'blackAlpha', md: 'yellow' }}>
                                                <Flex alignItems={'center'} gap={1}>
                                                    <BsPencilSquare size={20} /> <Show above='md'><Text>বেঙ্গলরিডে লিখুন</Text></Show>
                                                </Flex>
                                            </Button>


                                            {authUser ? <Menu>
                                                <MenuButton as={Button} size={{ base: 'sm', md: 'md' }} px={20} bg={{ base: 'transparent', md: 'transparent' }} _hover={{ bg: { md: 'transparent' } }} _active={{ bg: { md: 'blackAlpha.50' } }} roundedLeft={{ base: 'none', md: 'full' }} roundedRight={{ base: 'lg', md: 'full' }} colorScheme={'gray'} rightIcon={<ChevronDown size={16} />} gap={0}>
                                                    <Avatar size={'xs'} src={authUser.avatar} />
                                                </MenuButton>
                                                <MenuList shadow={'md'} rounded='none' zIndex={9999} pos={'relative'} top={{base: '6px',md:'9px'}}  width={{base: '100vw', md: '270px'}}>
                                                    <MenuItem icon={<User />}>প্রোফাইল</MenuItem>
                                                    <MenuItem icon={<Pencil />}>আমার লিখাসমূহ</MenuItem>
                                                    <MenuItem icon={<Heart />}>আমার পছন্দ তালিকা</MenuItem>
                                                    <MenuItem onClick={logoutUser} icon={<Power />}>লগ-আউট করুন</MenuItem>
                                                </MenuList>
                                            </Menu>
                                                : !isLoading && <Menu>
                                                    <MenuButton as={Button} size={{ base: 'md', md: 'md' }} px={20} bg={{ base: 'transparent', md: 'transparent' }} _hover={{ bg: { md: 'transparent' } }} _active={{ bg: { md: 'blackAlpha.50' } }} roundedLeft={{ base: 'none', md: 'full' }} roundedRight={{ base: 'lg', md: 'full' }} colorScheme={'gray'}>
                                                        <Flex alignItems={'center'} gap={'0px'}>
                                                            <Icon as={UserCircle} fontSize={24} color='gray.700' />
                                                            <ChevronDown size={16} color='gray' />
                                                        </Flex>
                                                    </MenuButton>
                                                    <MenuList shadow={'md'} rounded='none' zIndex={9999}>
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
