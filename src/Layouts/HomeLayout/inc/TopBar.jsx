import { Avatar, Box, Button, Flex, Image, Input, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { BellRinging, ChevronDown, Logout, Pencil, User } from 'tabler-icons-react'
import SectionContainer from '../../../Components/Common/SectionContainer'
import { FaBell, FaEnvelope } from 'react-icons/fa'
import { Affix } from '@mantine/core'
import { AuthModalContext } from '../../../Contexts/AuthModalContext'
import { AuthContext } from '../../../Contexts/AuthContext'
import { useRouter } from 'next/router'
import DesktopSearchbar from '../../../Components/Header/DesktopSearchbar'

export default function TopBar() {

    const router = useRouter()

    const { isOpen, onOpen } = useContext(AuthModalContext)

    const { isAuth, authUser } = useContext(AuthContext)

    const handleClickWriteBlog = () => {

        if (isAuth) {
            router.push('/write')
        }

        else {
            onOpen()
        }
    }

    return (

        <Box w='full' h='70px'>
            <Affix position={{ top: 0, right: 0, left: isOpen ? -12 : 0 }}>
                <SectionContainer as='header' px={0}>
                    <Box bg={'white'} borderBottom='2px' roundedBottom={{ base: 'none', md: 'none' }} borderColor={'gray.200'} shadow='sm'>
                        <Flex alignItems={'center'} justify={'space-between'} gap={5}>

                            <Flex alignItems={'center'} justify={'space-between'} gap={3}>
                                <Box h={'70px'}>
                                    <Image h={'full'} w={'full'} src='/logo.png' />
                                </Box>
                            </Flex>

                            <Box flex={1}>

                                <DesktopSearchbar />

                            </Box>

                            <Flex alignItems={'center'} justify={'space-between'} gap={3}>

                                <Menu>
                                    <MenuButton as={Button} rounded='full' background='transparent'>
                                        <Flex alignItems={'center'} gap={1}>
                                            <FaBell size={20} /> <Text>নোটিফিকেশন</Text>
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

                                <Button onClick={handleClickWriteBlog} rounded={'full'} colorScheme='yellow'>নগরশৈলীতে লিখুন</Button>

                                {/* <Box>

                    </Box> */}

                                <Menu>
                                    <MenuButton as={Button} _hover={{ background: 'transparent' }} _active={{ background: 'transparent' }} background='transparent' rightIcon={<ChevronDown />}>
                                        <Avatar size={'sm'} name='Mostafiz Rahaman' src='' />
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

                        </Flex>
                    </Box>
                </SectionContainer>
            </Affix>
        </Box>

    )
}
