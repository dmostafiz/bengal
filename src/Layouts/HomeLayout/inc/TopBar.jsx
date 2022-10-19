import { Avatar, Box, Button, Flex, Image, Input, Menu, MenuButton, MenuItem, MenuList, Show, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { BellRinging, ChevronDown, Logout, Menu2, Pencil, User } from 'tabler-icons-react'
import SectionContainer from '../../../Components/Common/SectionContainer'
import { FaBell, FaEnvelope, FaPencilAlt } from 'react-icons/fa'
import { Affix } from '@mantine/core'
import { AuthModalContext } from '../../../Contexts/AuthModalContext'
import { AuthContext } from '../../../Contexts/AuthContext'
import { useRouter } from 'next/router'
import DesktopSearchbar from '../../../Components/Header/DesktopSearchbar'
import SiteLogoDesktop from '../../../Components/Common/SiteLogoDesktop'
import { setRedirectUrl } from '../../../Helpers/cookieHelper'

export default function TopBar() {

    const router = useRouter()

    const { isOpen, onOpen } = useContext(AuthModalContext)

    const { isAuth, authUser } = useContext(AuthContext)

    const handleClickWriteBlog = () => {

        if (isAuth) {
            router.push('/write')
        }

        else {
            setRedirectUrl('/write')
            onOpen()
        }
    }

    return (

        <Box w='full' h='70px'>
            <Affix position={{ top: 0, right: 0, left: 0 }}>
                <SectionContainer as='header' px={0}>
                    <Box bg={'white'} px={3} borderBottom='2px' roundedBottom={{ base: 'none', md: 'none' }} borderColor={'gray.200'} shadow='sm'>
                        <Flex alignItems={'center'} justify={'space-between'} gap={5}>

                            <Flex alignItems={'center'} justify={'space-between'} gap={3}>
                                <SiteLogoDesktop />
                            </Flex>

                            <Show above='md'>
                                <Box flex={1}>

                                    <DesktopSearchbar />

                                </Box>

                            </Show>

                            <Flex alignItems={'center'} justify={'space-between'} gap={{ base: 2, md: 5 }}>

                                <Flex alignItems={'center'} gap={{ base: '1px', md: 2 }}>
                                    <Menu>
                                        <MenuButton size={{ base: 'md', md: 'md' }} as={Button} bg={{ base: 'blackAlpha.100', md: 'transparent' }} _hover={{ bg: { md: 'transparent' } }} _active={{ bg: { md: 'blackAlpha.100' } }} roundedLeft={{ base: 'lg', md: 'full' }} roundedRight={{ base: 'none', md: 'full' }} >
                                            <Flex alignItems={'center'} gap={1}>
                                                <FaBell size={20} /> <Show above='md'><Text>নোটিফিকেশন</Text></Show>
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

                                    <Button size={{ base: 'md', md: 'md' }} onClick={handleClickWriteBlog} rounded={{ base: 'none', md: 'full' }} bg={{ base: 'blackAlpha.100', md: 'yellow.400' }} colorScheme='yellow'>
                                        <Flex alignItems={'center'} gap={1}>
                                            <Pencil size={20} /> <Show above='md'><Text>নগরশৈলীতে লিখুন</Text></Show>
                                        </Flex>
                                    </Button>


                                    <Menu>
                                        <MenuButton as={Button} size={{ base: 'md', md: 'md' }} bg={{ base: 'blackAlpha.100', md: 'transparent' }} _hover={{ bg: { md: 'transparent' } }} _active={{ bg: { md: 'blackAlpha.100' } }} roundedLeft={{ base: 'none', md: 'full' }} roundedRight={{ base: 'lg', md: 'full' }} colorScheme={'gray'} rightIcon={<ChevronDown size={16} />} gap={0}>
                                            <Avatar size={'xs'} name='Mostafiz Rahaman' src='' />
                                        </MenuButton>
                                        <MenuList rounded='none' zIndex={9999}>
                                            <MenuItem icon={<User />}>প্রোফাইল</MenuItem>
                                            <MenuItem icon={<Pencil />}>আমার লিখাসমূহ</MenuItem>
                                            <MenuItem>Mark as Draft</MenuItem>
                                            <MenuItem>Delete</MenuItem>
                                            <MenuItem icon={<Logout />}>লগ-আউট করুন</MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Flex>

                                <Show below='sm'>
                                    <Button onClick={handleClickWriteBlog} _hover={{ bg: 'transparent' }} _active={{ bg: 'transparent' }} rounded='lg' bg={'transparent'} variant='outline'  colorScheme='gray'>
                                        <Menu2 size={24} />
                                    </Button>
                                </Show>

                            </Flex>

                        </Flex>
                    </Box>
                </SectionContainer>
            </Affix>
        </Box>

    )
}
